import { createRouter, createWebHistory, RouteLocation } from "vue-router";

import { useAuditStore, useReportStore } from "./store";

// import PersonalDataPage from "./pages/misc/PersonalDataPage.vue";
const ContextPage = import("./pages/consult/ContextPage.vue");
const ReportPage = import("./pages/consult/ReportPage.vue");
const EditAuditStepOnePage = import("./pages/edit/EditAuditStepOnePage.vue");
const EditAuditStepThreePage = import(
  "./pages/edit/EditAuditStepThreePage.vue"
);
const EditAuditStepFourPage = import("./pages/edit/EditAuditStepFourPage.vue");
const NewAuditStepOnePage = import("./pages/edit/NewAuditStepOnePage.vue");
const FeedbackPage = import("./pages/FeedbackPage.vue");
const AccessibilityPlanPage = import("./pages/help/AccessibilityPlanPage.vue");
const AccessibilityStatementPage = import(
  "./pages/help/AccessibilityStatementPage.vue"
);
const HelpPage = import("./pages/help/HelpPage.vue");
const LegalRequirementsPage = import("./pages/help/LegalRequirementsPage.vue");
const RGAAPage = import("./pages/help/RGAAPage.vue");
const HomePage = import("./pages/HomePage.vue");
const AccessibilityPage = import("./pages/misc/AccessibilityPage.vue");
const LegalPage = import("./pages/misc/LegalPage.vue");
const SiteMapPage = import("./pages/misc/SiteMapPage.vue");
const ContactPage = import("./pages/misc/ContactPage.vue");
const AccessibilityTrainingPage = import(
  "./pages/resources/AccessibilityTrainingPage.vue"
);
const A11yIntroTrainingPage = import(
  "./pages/resources/A11yIntroTrainingPage.vue"
);
const PublicDigitalTrainingPage = import(
  "./pages/resources/PublicDigitalTrainingPage.vue"
);
const GlossaryPage = import("./pages/resources/GlossaryPage.vue");
const ResourcesPage = import("./pages/resources/ResourcesPage.vue");
const MakeA11yAuditPage = import("./pages/resources/MakeA11yAuditPage.vue");
const ToolsPage = import("./pages/resources/ToolsPage.vue");
const ErrorPage = import("./pages/error/ErrorPage.vue");
const EditAuditDeclarationPage = import(
  "./pages/edit/EditAuditDeclarationPage.vue"
);

declare module "vue-router" {
  interface RouteMeta {
    // add a `meta.name` property to have the route's name appear in "go back to [name]" prompts
    name: string;
    breadcrumbLinks?:
      | Array<{ label: string; name: string }>
      | (() => Array<{ label: string; name: string }>);
    hideHomeLink?: boolean;
  }
}

export const history = createWebHistory();

/**
 * Fetch the audit name from store to display in breadcrumb.
 */
function getProcedureName() {
  const auditStore = useAuditStore();
  return auditStore.data?.procedureName ?? "Mon audit";
}

/**
 * Change the first link depending on the context (audit creation or report).
 */
function getFirstBreadcrumbLink() {
  const reportStore = useReportStore();

  if (reportStore.data) {
    return {
      label: "Rapport d’audit",
      name: "report",
      params: {
        uniqueId: reportStore.data.consultUniqueId,
      },
    };
  }

  return { label: "Accueil", name: "home" };
}

/**
 * When entering an "edit page", store the current page url to use in the header menu.
 */
function saveCurrentEditionStep(to: RouteLocation) {
  const auditStore = useAuditStore();
  auditStore.lastVisitedStepLocation = to.fullPath;
  return true;
}

const router = createRouter({
  routes: [
    // Base pages
    {
      path: "/",
      name: "home",
      component: HomePage,
      meta: {
        name: "Accueil",
      },
    },
    {
      path: "/plan-du-site",
      name: "site-map",
      component: SiteMapPage,
      meta: {
        name: "Plan du site",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          { label: "Plan du site", name: "site-map" },
        ],
      },
    },
    {
      path: "/accessibilite",
      name: "accessibility",
      component: AccessibilityPage,
      meta: {
        name: "Accessibilité",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          { label: "Accessibilité", name: "accessibility" },
        ],
      },
    },
    {
      path: "/mentions-legales",
      name: "legal",
      component: LegalPage,
      meta: {
        name: "Mentions légales",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          { label: "Mentions légales", name: "legal" },
        ],
      },
    },
    // Contact page
    {
      path: "/contact-contributions",
      name: "contact",
      component: ContactPage,
      meta: {
        name: "Contact",
        breadcrumbLinks: [
          { label: "Accueil", name: "home" },
          { label: "Contactez-nous ou contribuez", name: "contact" },
        ],
      },
    },
    // TODO: nothing to put on that page for now
    // {
    //   path: "/donnees-personnelles",
    //   name: "personal-data",
    //   component: PersonalDataPage,
    //   meta: {
    //     name: "Données personnelles",
    //     breadcrumbLinks: () => [
    //       getFirstBreadcrumbLink(),
    //       { label: "Données personnelles", name: "personal-data" },
    //     ],
    //   },
    // },
    // Audit pages
    {
      path: "/audits/nouveau",
      name: "new-audit-step-one",
      component: NewAuditStepOnePage,
      meta: {
        name: "Nouvel audit",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          { label: "Nouvel audit", name: "new-audit-step-one" },
        ],
      },
    },
    {
      path: "/audits/:uniqueId/informations-generales",
      name: "edit-audit-step-one",
      component: EditAuditStepOnePage,
      beforeEnter: saveCurrentEditionStep,
      meta: {
        name: "Mon audit",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          {
            label: getProcedureName(),
            name: "edit-audit-step-one",
          },
        ],
      },
    },
    {
      path: "/audits/:uniqueId/generation",
      name: "edit-audit-step-three",
      component: EditAuditStepThreePage,
      beforeEnter: saveCurrentEditionStep,
      meta: {
        name: "Mon audit",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          {
            label: getProcedureName(),
            name: "edit-audit-step-three",
          },
        ],
      },
    },
    {
      path: "/audits/:uniqueId/partage",
      name: "edit-audit-step-four",
      component: EditAuditStepFourPage,
      beforeEnter: saveCurrentEditionStep,
      meta: {
        name: "Mon audit",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          {
            label: getProcedureName(),
            name: "edit-audit-step-four",
          },
        ],
      },
    },
    {
      path: "/audits/:uniqueId/declaration",
      name: "edit-audit-declaration",
      component: EditAuditDeclarationPage,
      beforeEnter: saveCurrentEditionStep,
      meta: {
        name: "Mon audit",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          {
            label: getProcedureName(),
            name: "edit-audit-declaration",
          },
        ],
      },
    },
    // Report pages
    {
      path: "/rapports/:uniqueId/contexte",
      name: "context",
      component: ContextPage,
      meta: {
        name: "Contexte",
        hideHomeLink: true,
        breadcrumbLinks: () => [
          { label: "Rapport d’audit", name: "report" },
          { label: "Contexte", name: "context" },
        ],
      },
    },
    {
      path: "/rapports/:uniqueId/:tab?",
      name: "report",
      component: ReportPage,
      meta: {
        name: "Rapport d’audit",
        hideHomeLink: true,
      },
    },
    // Resources pages
    {
      path: "/ressources",
      name: "resources",
      component: ResourcesPage,
      meta: {
        name: "Ressources",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          { label: "Ressources", name: "resources" },
        ],
      },
    },
    {
      path: "/ressources/formations-accessibilite",
      name: "accessibility-training",
      component: AccessibilityTrainingPage,
      meta: {
        name: "Formations accessibilité",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          { label: "Ressources", name: "resources" },
          { label: "Formations accessibilité", name: "accessibility-training" },
        ],
      },
    },
    {
      path: "/ressources/formations-accessibilite/introduction-accessibilite-numerique",
      name: "a11y-intro-training",
      component: A11yIntroTrainingPage,
      meta: {
        name: "Introduction à l’accessibilité numérique",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          { label: "Ressources", name: "resources" },
          { label: "Formations accessibilité", name: "accessibility-training" },
          {
            label: "Introduction à l’accessibilité numérique",
            name: "a11y-intro-training",
          },
        ],
      },
    },
    {
      path: "/ressources/formations-accessibilite/numerique-public",
      name: "public-digital",
      component: PublicDigitalTrainingPage,
      meta: {
        name: "Bien faire du numérique public",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          { label: "Ressources", name: "resources" },
          { label: "Formations accessibilité", name: "accessibility-training" },
          {
            label: "Bien faire du numérique public",
            name: "public-digital",
          },
        ],
      },
    },
    {
      path: "/ressources/outils",
      name: "tools",
      component: ToolsPage,
      meta: {
        name: "Outils",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          { label: "Ressources", name: "resources" },
          { label: "Outils", name: "tools" },
        ],
      },
    },
    {
      path: "/ressources/glossaire",
      name: "glossary",
      component: GlossaryPage,
      meta: {
        name: "Glossaire",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          { label: "Ressources", name: "resources" },
          { label: "Glossaire", name: "glossary" },
        ],
      },
    },
    {
      path: "/ressources/realiser-audit-accessibilite",
      name: "make-a11y-audit",
      component: MakeA11yAuditPage,
      meta: {
        name: "Réaliser un audit accessibilité",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          { label: "Ressources", name: "resources" },
          {
            label: "Réaliser soi-même un audit accessibilité",
            name: "make-a11y-audit",
          },
        ],
      },
    },
    // Help pages
    {
      path: "/aide",
      name: "help",
      component: HelpPage,
      meta: {
        name: "Formations accessibilité",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          { label: "Aide", name: "help" },
        ],
      },
    },
    {
      path: "/aide/obligations-legales",
      name: "legal-requirements",
      component: LegalRequirementsPage,
      meta: {
        name: "Obligations légales et sanctions",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          { label: "Aide", name: "help" },
          {
            label: "Obligations légales et sanctions",
            name: "legal-requirements",
          },
        ],
      },
    },
    {
      path: "/aide/rgaa",
      name: "rgaa",
      component: RGAAPage,
      meta: {
        name: "RGAA",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          { label: "Aide", name: "help" },
          { label: "RGAA", name: "rgaa" },
        ],
      },
    },
    {
      path: "/aide/declaration-accessibilite",
      name: "accessibility-statement",
      component: AccessibilityStatementPage,
      meta: {
        name: "Déclaration d’accessibilité",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          { label: "Aide", name: "help" },
          {
            label: "Déclaration d’accessibilité",
            name: "accessibility-statement",
          },
        ],
      },
    },
    {
      path: "/aide/schema-pluriannuel",
      name: "accessibility-plan",
      component: AccessibilityPlanPage,
      meta: {
        name: "Schéma pluriannuel",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          { label: "Aide", name: "help" },
          { label: "Schéma pluriannuel", name: "accessibility-plan" },
        ],
      },
    },
    // Feedback page
    {
      path: "/donner-mon-avis",
      name: "feedback",
      component: FeedbackPage,
      meta: {
        name: "Donner mon avis",
        breadcrumbLinks: () => [
          getFirstBreadcrumbLink(),
          { label: "Donner mon avis", name: "feedback" },
        ],
      },
    },
    // Error pages
    {
      path: "/:pathMatch(.*)*",
      name: "Error",
      component: ErrorPage,
    },
  ],
  history,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash };
    }
    return { top: 0 };
  },
});

router.beforeEach((to, from) => {
  if (from.query.dev && !to.query.dev) {
    return {
      ...to,
      query: {
        ...to.query,
        dev: from.query.dev,
      },
    };
  }
});

export default router;
