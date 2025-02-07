<script setup lang="ts">
import { chunk, groupBy, mapValues, sortBy, uniqWith } from "lodash-es";
import { marked } from "marked";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import rgaa from "../../criteres.json";
import { useReportStore } from "../../store";
import {
  AuditReport,
  CriterionResultUserImpact,
  CriteriumResultStatus
} from "../../types";
import {
  formatStatus,
  formatUserImpact,
  slugify,
  pluralize
} from "../../utils";
import CriteriumTestsAccordion from "../audit/CriteriumTestsAccordion.vue";
import LazyAccordion from "../audit/LazyAccordion.vue";
import MarkdownRenderer from "../ui/MarkdownRenderer.vue";

const report = useReportStore();
const router = useRouter();

/*
[{
  pageUrl: "https://example.com",
  pageName: "Accueil"
  topics: [{
    topic: 2,
    name: "Cadres",
    errors: [{ ... }]
  }]
}]
*/

const errors = computed(() => {
  const resultsGroupedByPage = {
    // include pages with no errors
    ...report.data?.context.samples.reduce<Record<string, []>>((acc, val) => {
      acc[val.id] = [];
      return acc;
    }, {}),

    ...groupBy(
      report.data?.results
        .filter((r) => {
          return (
            r.status === CriteriumResultStatus.NOT_COMPLIANT &&
            !r.transverse &&
            userImpactFilters.value.includes(r.userImpact)
          );
        })
        .filter((r) => {
          return quickWinFilter.value ? r.quickWin : r;
        }),
      "pageId"
    )
  } as Record<number, AuditReport["results"]>;

  // TODO: make more legible
  const data = Object.values(
    mapValues(resultsGroupedByPage, (results, pageId) => {
      return {
        pageId: Number(pageId),
        pageName: getPage(Number(pageId)).name,
        pageUrl: getPage(Number(pageId)).url,
        topics: sortBy(
          Object.values(
            mapValues(groupBy(results, "topic"), (results, topicNumber) => {
              return {
                topic: Number(topicNumber),
                name: getTopicName(Number(topicNumber)),
                errors: sortBy(
                  results.filter((r) => !r.transverse),
                  "criterium"
                )
              };
            })
          ),
          "topic"
        )
      };
    })
  );

  return data;
});

/**
 [{
    topic: 2,
    name: "Cadres",
    errors: [{ ... }]
  }]
 */
const transverseErrors = computed(() => {
  return Object.values(
    mapValues(
      groupBy(
        uniqWith(
          report.data?.results.filter((r) => {
            return (
              r.transverse &&
              r.status === CriteriumResultStatus.NOT_COMPLIANT &&
              userImpactFilters.value.includes(r.userImpact)
            );
          }),
          (a, b) => a.criterium === b.criterium && a.topic === b.topic
        ),
        "topic"
      ),
      (results, topicNumber) => {
        return {
          topic: topicNumber,
          name: getTopicName(Number(topicNumber)),
          errors: results
        };
      }
    )
  );
});

const defaultUserImpactFillters = [
  CriterionResultUserImpact.MINOR,
  CriterionResultUserImpact.MAJOR,
  CriterionResultUserImpact.BLOCKING,
  null
];

const userImpactFilters = ref<Array<CriterionResultUserImpact | null>>(
  defaultUserImpactFillters
);

const disabledResetFilters = computed(
  () =>
    userImpactFilters.value.length === defaultUserImpactFillters.length &&
    !quickWinFilter.value
);

const minorUserImpactErrorCount = computed(
  () =>
    report.data?.results.filter(
      (r) =>
        r.status === CriteriumResultStatus.NOT_COMPLIANT &&
        r.userImpact === CriterionResultUserImpact.MINOR
    ).length
);

const majorUserImpactErrorCount = computed(
  () =>
    report.data?.results.filter(
      (r) =>
        r.status === CriteriumResultStatus.NOT_COMPLIANT &&
        r.userImpact === CriterionResultUserImpact.MAJOR
    ).length
);

const blockingUserImpactErrorCount = computed(
  () =>
    report.data?.results.filter(
      (r) =>
        r.status === CriteriumResultStatus.NOT_COMPLIANT &&
        r.userImpact === CriterionResultUserImpact.BLOCKING
    ).length
);

const unknownUserImpactErrorCount = computed(
  () =>
    report.data?.results.filter(
      (r) =>
        r.status === CriteriumResultStatus.NOT_COMPLIANT &&
        r.userImpact === null
    ).length
);

const displayedErrorCount = computed(() => {
  return (
    errors.value.map((page) => page.topics.map((topic) => topic.errors)).flat(2)
      .length + transverseErrors.value.length
  );
});

// function expandAll() {
//   const collapses = Array.from(
//     document.querySelectorAll("[data-accordion] > [data-fr-js-collapse]")
//   );

//   const everyCollapseIsOpen = collapses.every((el) => {
//     return el.classList.contains("fr-collapse--expanded");
//   });

//   if (!everyCollapseIsOpen) {
//     collapses.forEach((el) => {
//       dsfr(el).collapse.disclose();
//     });
//   } else {
//     collapses.forEach((el) => {
//       dsfr(el).collapse.conceal();
//     });
//   }
// }

const quickWinFilter = ref(false);

function resetFilters() {
  userImpactFilters.value = defaultUserImpactFillters;
  quickWinFilter.value = false;
}

function getTopicName(topicNumber: number) {
  return rgaa.topics.find((t) => t.number === topicNumber)?.topic;
}

function getCriterium(topicNumber: number, criteriumNumber: number) {
  // FIXME: "any everywhere" : The criteria properties of each topic do not have the same signature. See: https://github.com/microsoft/TypeScript/issues/33591#issuecomment-786443978
  const criterium = (rgaa.topics as any)
    .find((t: any) => t.number === topicNumber)
    ?.criteria.find((c: any) => c.criterium.number === criteriumNumber)
    .criterium;

  return criterium;
}

function getCriteriumTitle(topicNumber: number, criteriumNumber: number) {
  return marked.parseInline(getCriterium(topicNumber, criteriumNumber).title);
}

/** Get a page by its id */
function getPage(pageId: number) {
  return report.data!.context.samples.find((p) => p.id === pageId)!;
}

function getPageSlug(pageId: number) {
  return slugify(getPage(pageId)?.name);
}

/**
 * Manually reproduce DSFR menu item anchor links
 * See following issue: https://github.com/DISIC/Ara/issues/130
 */
function updateActiveAnchorLink(id: string, event: MouseEvent) {
  event.preventDefault();

  const previousSelectedAnchor = document.querySelector(
    '.fr-sidemenu__link[aria-current="true"]'
  );
  if (previousSelectedAnchor) {
    previousSelectedAnchor.removeAttribute("aria-current");
    previousSelectedAnchor.parentElement?.classList.remove(
      "fr-sidemenu__item--active"
    );
  }
  const target = event.target as HTMLAnchorElement;
  if (target) {
    target.setAttribute("aria-current", "true");
    target.parentElement?.classList.add("fr-sidemenu__item--active");

    const anchor = document.querySelector(`#${id}`);
    if (anchor) {
      anchor.scrollIntoView();
      router.push({ hash: `#${id}` });
    }
  }
}
</script>

<template>
  <template v-if="report.data">
    <div class="main">
      <div class="sidebar">
        <nav class="fr-sidemenu fr-mb-3w" aria-label="Liste des pages">
          <div class="fr-sidemenu__inner">
            <button
              class="fr-sidemenu__btn"
              hidden
              aria-controls="fr-sidemenu-wrapper"
              aria-expanded="false"
            >
              Pages
            </button>
            <div id="fr-sidemenu-wrapper" class="fr-collapse">
              <div class="fr-sidemenu__title fr-mb-2w">Pages</div>
              <ul class="fr-sidemenu__list">
                <li
                  v-if="transverseErrors.length"
                  :class="[
                    'fr-sidemenu__item',
                    {
                      'fr-sidemenu__item--active': Boolean(
                        transverseErrors.length
                      )
                    }
                  ]"
                >
                  <!-- FIXME: seems there is an issue with anchor links inside tabs -->
                  <a
                    class="fr-sidemenu__link"
                    href="#all-pages"
                    target="_self"
                    :aria-current="Boolean(transverseErrors.length)"
                    @click="updateActiveAnchorLink('all-pages', $event)"
                    >Toutes les pages</a
                  >
                </li>
                <li
                  :class="[
                    'fr-sidemenu__item',
                    {
                      'fr-sidemenu__item--active': !Boolean(
                        transverseErrors.length
                      )
                    }
                  ]"
                >
                  <a
                    class="fr-sidemenu__link"
                    :href="`#${getPageSlug(report.data.context.samples[0].id)}`"
                    target="_self"
                    :aria-current="
                      !transverseErrors.length ? 'true' : undefined
                    "
                    @click="
                      updateActiveAnchorLink(
                        getPageSlug(report.data!.context.samples[0].id),
                        $event
                      )
                    "
                    >{{ report.data.context.samples[0].name }}</a
                  >
                </li>
                <li
                  v-for="page in report.data.context.samples.slice(1)"
                  :key="page.name"
                  class="fr-sidemenu__item"
                >
                  <a
                    class="fr-sidemenu__link"
                    :href="`#${getPageSlug(page.id)}`"
                    target="_self"
                    @click="
                      updateActiveAnchorLink(getPageSlug(page.id), $event)
                    "
                    >{{ page.name }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div class="fr-text--bold fr-text--xl fr-mb-2w filter-title">
          Filtres
        </div>
        <button
          class="fr-btn fr-btn--tertiary-no-outline fr-icon-refresh-line fr-btn--icon-right fr-mb-3w"
          :disabled="disabledResetFilters"
          @click="resetFilters"
        >
          Réinitialiser les filtres
        </button>
        <!-- <div class="fr-form-group">
          <fieldset class="fr-fieldset">
            <legend
              id="checkboxes-hint-element-legend"
              class="fr-fieldset__legend fr-text--regular fr-text--bold"
            >
              Critères
            </legend>
            <div class="fr-fieldset__content">
              <div class="fr-checkbox-group">
                <input id="user-impact-filter-minor" type="checkbox" />
                <label class="fr-label" for="user-impact-filter-minor"
                  >Conformes (10)
                </label>
              </div>
              <div class="fr-checkbox-group">
                <input id="user-impact-filter-major" type="checkbox" />
                <label class="fr-label" for="user-impact-filter-major"
                  >Non conforme (34)
                </label>
              </div>
              <div class="fr-checkbox-group">
                <input id="user-impact-filter-blocking" type="checkbox" />
                <label class="fr-label" for="user-impact-filter-blocking"
                  >Non applicable (56)
                </label>
              </div>
            </div>
          </fieldset>
        </div> -->
        <div class="fr-form-group">
          <fieldset class="fr-fieldset">
            <legend
              id="checkboxes-hint-element-legend"
              class="fr-fieldset__legend fr-text--regular fr-text--bold"
            >
              Impact de l’erreur
            </legend>
            <div class="fr-fieldset__content">
              <div class="fr-checkbox-group">
                <input
                  id="user-impact-filter-minor"
                  v-model="userImpactFilters"
                  :value="CriterionResultUserImpact.MINOR"
                  type="checkbox"
                />
                <label class="fr-label" for="user-impact-filter-minor">
                  Mineur ({{ minorUserImpactErrorCount }})
                  <span class="fr-hint-text">
                    Gêne dans l’utilisation du site
                  </span>
                </label>
              </div>
              <div class="fr-checkbox-group">
                <input
                  id="user-impact-filter-major"
                  v-model="userImpactFilters"
                  :value="CriterionResultUserImpact.MAJOR"
                  type="checkbox"
                />
                <label class="fr-label" for="user-impact-filter-major">
                  Majeur ({{ majorUserImpactErrorCount }})
                  <span class="fr-hint-text">
                    Complexifie grandement l’utilisation du site
                  </span>
                </label>
              </div>
              <div class="fr-checkbox-group">
                <input
                  id="user-impact-filter-blocking"
                  v-model="userImpactFilters"
                  :value="CriterionResultUserImpact.BLOCKING"
                  type="checkbox"
                />
                <label class="fr-label" for="user-impact-filter-blocking">
                  Bloquant ({{ blockingUserImpactErrorCount }})
                  <span class="fr-hint-text">
                    Empêche totalement l’utilisation du site
                  </span>
                </label>
              </div>
              <div class="fr-checkbox-group">
                <input
                  id="user-impact-filter-unknown"
                  v-model="userImpactFilters"
                  :value="null"
                  type="checkbox"
                />
                <label class="fr-label" for="user-impact-filter-unknown">
                  Impact non renseigné ({{ unknownUserImpactErrorCount }})
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="fr-form-group">
          <fieldset class="fr-fieldset">
            <legend class="fr-fieldset__legend fr-text--regular fr-text--bold">
              Correction de l’erreur
            </legend>
            <div class="fr-fieldset__content">
              <div class="fr-checkbox-group">
                <input
                  id="quick-win-filter"
                  v-model="quickWinFilter"
                  type="checkbox"
                />
                <label class="fr-label" for="quick-win-filter">
                  Facile à corriger
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div>
        <div class="fr-mb-6w header">
          <div role="alert" aria-live="polite">
            <p class="fr-mb-0 fr-text--xl fr-text--bold">
              {{ displayedErrorCount }}
              {{ pluralize("résultat", "résultats", displayedErrorCount) }}
            </p>
          </div>
          <!-- FIXME: make this work -->
          <!-- <button class="fr-btn fr-btn--tertiary-no-outline" @click="expandAll">
            Tout déplier
          </button> -->
        </div>

        <section v-if="!userImpactFilters.length">
          <h2 class="fr-h6 fr-mb-1w">
            Aucun résultat ne correspond à votre recherche
          </h2>
          <p>Veuillez sélectionner au moins un filtre "impact de l'erreur".</p>
        </section>

        <section v-if="transverseErrors.length" class="fr-mb-8w">
          <h2 id="all-pages" class="fr-h3 fr-mb-2w page-title">
            Toutes les pages
          </h2>

          <div
            v-for="(topic, i) in transverseErrors"
            :key="topic.topic"
            :class="{ 'fr-mt-9v': i !== 0 }"
          >
            <p class="fr-tag fr-tag--sm fr-mb-3w">
              {{ topic.name }}
            </p>
            <template v-for="(error, j) in topic.errors" :key="j">
              <p
                :class="[
                  'fr-text--lg fr-text--bold criterium-title',
                  { 'fr-mt-9v': j !== 0 }
                ]"
              >
                {{ error.topic }}.{{ error.criterium }}&nbsp;
                <span
                  v-html="getCriteriumTitle(error.topic, error.criterium)"
                />
              </p>

              <ul class="fr-badges-group fr-mb-2w">
                <li>
                  <p
                    class="fr-badge fr-badge--sm fr-badge--error fr-badge--no-icon"
                  >
                    {{ formatStatus(error.status) }}
                  </p>
                </li>
                <li v-if="error.userImpact">
                  <p
                    class="fr-badge fr-badge--sm"
                    :class="{
                      'fr-badge--yellow-moutarde':
                        error.userImpact === CriterionResultUserImpact.MAJOR,
                      'fr-badge--error fr-badge--no-icon':
                        error.userImpact === CriterionResultUserImpact.BLOCKING
                    }"
                  >
                    Impact {{ formatUserImpact(error.userImpact) }}
                  </p>
                </li>
                <li v-if="error.quickWin">
                  <p class="fr-badge fr-badge--sm">Facile à corriger</p>
                </li>
              </ul>

              <!-- Error -->
              <LazyAccordion
                v-if="error.errorDescription || error.exampleImages.length > 0"
                title="Description de la ou des erreurs"
                data-accordion
              >
                <MarkdownRenderer
                  v-if="error.errorDescription"
                  class="fr-mb-3w"
                  :markdown="error.errorDescription"
                />
                <p class="fr-text--xs fr-mb-1w error-accordion-subtitle">
                  Exemple(s) d’erreur(s)
                </p>
                <div class="fr-container--fluid">
                  <div
                    v-for="(line, k) in chunk(error.exampleImages, 2)"
                    :key="k"
                    class="fr-grid-row fr-grid-row--gutters"
                  >
                    <a
                      v-for="example in line"
                      :key="example.url"
                      class="fr-col-md-6 fr-col-12 image-link"
                      :href="example.url"
                      target="_blank"
                    >
                      <span class="sr-only">
                        Ouvrir l’image dans une nouvelle fenêtre
                      </span>
                      <img style="width: 100%" :src="example.url" alt="" />
                    </a>
                  </div>
                </div>
              </LazyAccordion>

              <!-- Recommendation -->
              <LazyAccordion
                v-if="error.recommandation"
                title="Recommandation de correction"
                data-accordion
              >
                <MarkdownRenderer
                  class="fr-mb-0"
                  :markdown="error.recommandation"
                />
              </LazyAccordion>

              <!-- Tests -->
              <CriteriumTestsAccordion
                :topic-number="error.topic"
                :criterium="getCriterium(error.topic, error.criterium)"
              />
            </template>
          </div>
        </section>
        <section v-for="page in errors" :key="page.pageId" class="fr-mb-8w">
          <h2
            :id="`${getPageSlug(page.pageId)}`"
            class="fr-h3 fr-mb-2w page-title"
          >
            {{ page.pageName }}
          </h2>
          <a
            :href="page.pageUrl"
            class="fr-link page-url"
            target="_blank"
            rel="noopener"
          >
            {{ page.pageUrl }} <span class="sr-only">(nouvelle fenêtre)</span>
          </a>

          <p v-if="page.topics.length === 0" class="fr-mt-4w">
            Aucune erreur d'accessibilité relevée sur cette page.
          </p>

          <div
            v-for="(topic, i) in page.topics"
            :key="topic.topic"
            :class="i === 0 ? 'fr-mt-4w' : 'fr-mt-9v'"
          >
            <p class="fr-tag fr-tag--sm fr-mb-3w">
              {{ topic.name }}
            </p>
            <template v-for="(error, j) in topic.errors" :key="j">
              <p
                :class="[
                  'fr-text--lg fr-text--bold criterium-title',
                  { 'fr-mt-9v': j !== 0 }
                ]"
              >
                {{ error.topic }}.{{ error.criterium }}&nbsp;
                <span
                  v-html="getCriteriumTitle(error.topic, error.criterium)"
                />
              </p>

              <ul class="fr-badges-group fr-mb-2w">
                <li>
                  <p
                    class="fr-badge fr-badge--sm fr-badge--error fr-badge--no-icon"
                  >
                    {{ formatStatus(error.status) }}
                  </p>
                </li>
                <li v-if="error.userImpact">
                  <p
                    class="fr-badge fr-badge--sm"
                    :class="{
                      'fr-badge--yellow-moutarde':
                        error.userImpact === CriterionResultUserImpact.MAJOR,
                      'fr-badge--error fr-badge--no-icon':
                        error.userImpact === CriterionResultUserImpact.BLOCKING
                    }"
                  >
                    Impact {{ formatUserImpact(error.userImpact) }}
                  </p>
                </li>
                <li v-if="error.quickWin">
                  <p class="fr-badge fr-badge--sm">Facile à corriger</p>
                </li>
              </ul>

              <!-- Error -->
              <LazyAccordion
                v-if="error.errorDescription || error.exampleImages.length > 0"
                title="Description de la ou des erreurs"
                data-accordion
              >
                <MarkdownRenderer
                  v-if="error.errorDescription"
                  class="fr-mb-3w"
                  :markdown="error.errorDescription"
                />
                <p class="fr-text--xs fr-mb-1w error-accordion-subtitle">
                  Exemple(s) d’erreur(s)
                </p>
                <div class="fr-container--fluid">
                  <div
                    v-for="(line, k) in chunk(error.exampleImages, 2)"
                    :key="k"
                    class="fr-grid-row fr-grid-row--gutters"
                  >
                    <a
                      v-for="example in line"
                      :key="example.url"
                      class="fr-col-md-6 fr-col-12 image-link"
                      :href="example.url"
                      target="_blank"
                    >
                      <span class="sr-only">
                        Ouvrir l’image dans une nouvelle fenêtre
                      </span>
                      <img style="width: 100%" :src="example.url" alt="" />
                    </a>
                  </div>
                </div>
              </LazyAccordion>

              <!-- Recommendation -->
              <LazyAccordion
                v-if="error.recommandation"
                title="Recommandation de correction"
                data-accordion
              >
                <MarkdownRenderer
                  class="fr-mb-0"
                  :markdown="error.recommandation"
                />
              </LazyAccordion>

              <!-- Tests -->
              <CriteriumTestsAccordion
                :topic-number="error.topic"
                :criterium="getCriterium(error.topic, error.criterium)"
              />
            </template>
          </div>
        </section>
      </div>
    </div>
  </template>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.filter-title {
  color: var(--text-title-grey);
}

.main {
  display: grid;
  grid-template-columns: 20rem 1fr;
  gap: 2rem;
}

.sidebar {
  box-shadow: inset -1px 0 0 0 var(--border-default-grey);
}

.page-title {
  color: var(--text-active-blue-france);
}

.page-url {
  word-break: break-all;
}

.criterium-title {
  color: var(--text-title-grey);
}

/* .error-accordion-subtitle {
  color: var(--text-mention-grey);
} */

.fr-sidemenu__inner {
  box-shadow: none !important;
}

.image-link {
  background: none;
}
.image-link::after {
  content: none;
}

@media (max-width: 768px) {
  .main {
    grid-template-columns: 1fr;
  }

  .sidebar {
    box-shadow: none;
  }
}
</style>
