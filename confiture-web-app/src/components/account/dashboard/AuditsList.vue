<script lang="ts" setup>
import { AuditStatus } from "../../../types";
import { pluralize } from "../../../utils";
import NoAudit from "./NoAudit.vue";
import AuditRow from "./AuditRow.vue";
import { AccountAudit } from "../../../types/account";

// FIXME: "audits" type
defineProps<{
  audits: AccountAudit[];
  status: AuditStatus.IN_PROGRESS | AuditStatus.COMPLETED;
  noAuditLabel: string;
}>();
</script>

<template>
  <div>
    <h2 class="fr-text--lg fr-text--regular fr-mb-2w sub-heading">
      {{
        status === AuditStatus.IN_PROGRESS
          ? `En cours (${audits.length})`
          : `${pluralize("Terminé", "Terminés", audits.length)} (${
              audits.length
            })`
      }}
    </h2>

    <template v-if="audits.length">
      <div class="fr-mb-1w headers">
        <p aria-hidden="true" class="fr-text--sm fr-text--bold fr-mb-0">
          Nom de l’audit
        </p>
        <p aria-hidden="true" class="fr-text--sm fr-text--bold fr-mb-0">
          Statut
        </p>
        <p aria-hidden="true" class="fr-text--sm fr-text--bold fr-mb-0">
          Créé le
        </p>
        <p aria-hidden="true" class="fr-text--sm fr-text--bold fr-mb-0">
          Type d’audit
        </p>
        <p aria-hidden="true" class="fr-text--sm fr-text--bold fr-mb-0">
          Taux de conformité
        </p>
      </div>

      <div class="audits-list">
        <!--
          TODO: fix this zIndex thing (dropdown, toast, modal)
          do something like a zIndex map? https://getbootstrap.com/docs/5.0/layout/z-index/
        -->
        <AuditRow
          v-for="(audit, i) in audits"
          :key="audit.editUniqueId"
          :audit="audit"
          :z-index="
            status === AuditStatus.IN_PROGRESS
              ? (audits.length - i) * 15
              : (audits.length - i) * 2
          "
        />
      </div>
    </template>

    <NoAudit v-else :label="noAuditLabel" />
  </div>
</template>

<style scoped>
.sub-heading {
  color: var(--text-mention-grey);
}

.headers {
  display: grid;
  grid-template-columns: 2fr 0.75fr 0.75fr 1.25fr 1.25fr 1.5fr 1fr;
  grid-gap: 1rem;
}

.audits-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
</style>
