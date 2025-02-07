import { createRouter, createWebHistory, RouteLocation } from "vue-router";

import AccountDashboardPage from "./pages/account/AccountDashboardPage.vue";
import AccountDeletionFeedback from "./pages/account/AccountDeletionFeedback.vue";
import AccountSettingsPage from "./pages/account/AccountSettingsPage.vue";
import LoginPage from "./pages/account/LoginPage.vue";
import MissingAuditPage from "./pages/account/MissingAuditPage.vue";
import NewAccountPage from "./pages/account/NewAccountPage.vue";
import NewAccountValidationPage from "./pages/account/NewAccountValidationPage.vue";
import ResetPasswordPage from "./pages/account/ResetPasswordPage.vue";
import UpdateEmailValidationPage from "./pages/account/UpdateEmailValidationPage.vue";
import AuditDeclarationPage from "./pages/audit/AuditDeclarationPage.vue";
import AuditGenerationPage from "./pages/audit/AuditGenerationPage.vue";
import AuditOverviewPage from "./pages/audit/AuditOverviewPage.vue";
import AuditSettingsPage from "./pages/audit/AuditSettingsPage.vue";
import CreateAuditPage from "./pages/audit/CreateAuditPage.vue";
import ChangelogPage from "./pages/ChangelogPage.vue";
import ErrorPage from "./pages/error/ErrorPage.vue";
import FeedbackPage from "./pages/FeedbackPage.vue";
import HomePage from "./pages/HomePage.vue";
import AccessibilityPage from "./pages/misc/AccessibilityPage.vue";
import ContactPage from "./pages/misc/ContactPage.vue";
import LegalPage from "./pages/misc/LegalPage.vue";
import PrivacyPage from "./pages/misc/PrivacyPage.vue";
import SiteMapPage from "./pages/misc/SiteMapPage.vue";
import ContextPage from "./pages/report/ContextPage.vue";
import ReportPage from "./pages/report/ReportPage.vue";
import A11yIntroTrainingPage from "./pages/resources/A11yIntroTrainingPage.vue";
import AccessibilityPlanPage from "./pages/resources/AccessibilityPlanPage.vue";
import AccessibilityStatementPage from "./pages/resources/AccessibilityStatementPage.vue";
import AccessibilityTrainingPage from "./pages/resources/AccessibilityTrainingPage.vue";
import GlossaryPage from "./pages/resources/GlossaryPage.vue";
import LegalRequirementsPage from "./pages/resources/LegalRequirementsPage.vue";
import MakeA11yAuditPage from "./pages/resources/MakeA11yAuditPage.vue";
import PublicDigitalTrainingPage from "./pages/resources/PublicDigitalTrainingPage.vue";
import ResourcesPage from "./pages/resources/ResourcesPage.vue";
import RGAAPage from "./pages/resources/RGAAPage.vue";
import ToolsPage from "./pages/resources/ToolsPage.vue";
import RoadmapPage from "./pages/RoadmapPage.vue";
import { useAccountStore, useAuditStore } from "./store";

declare module "vue-router" {
  interface RouteMeta {
    // add a `meta.name` property to have the route's name appear in "go back to [name]" prompts
    name: string;
    breadcrumbLinks?:
      | Array<{ label: string; name: string }>
      | (() => Array<{ label: string; name: string }>);
    hideHomeLink?: boolean;
    authRequired?: boolean;
  }
}

export const history = createWebHistory();

/**
 * Fetch the audit name from store to display in breadcrumb.
 */
function getProcedureName() {
  const auditStore = useAuditStore();
  return auditStore.currentAudit?.procedureName ?? "Mon audit";
}

/**
 * Get the home link as first one
 */
function getHomeBreadcrumbLink() {
  const accountStore = useAccountStore();

  return accountStore.account
    ? { label: "Mes audits", name: "account-dashboard" }
    : { label: "Accueil", name: "home" };
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
        name: "Accueil"
      }
    },
    {
      path: "/plan-du-site",
      name: "site-map",
      component: SiteMapPage,
      meta: {
        name: "Plan du site",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Plan du site", name: "site-map" }
        ]
      }
    },
    {
      path: "/accessibilite",
      name: "accessibility",
      component: AccessibilityPage,
      meta: {
        name: "Accessibilité",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Accessibilité", name: "accessibility" }
        ]
      }
    },
    {
      path: "/donnees-personnelles",
      name: "privacy",
      component: PrivacyPage,
      meta: {
        name: "Données personnelles",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Données personnelles", name: "privacy" }
        ]
      }
    },
    {
      path: "/mentions-legales",
      name: "legal",
      component: LegalPage,
      meta: {
        name: "Mentions légales",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Mentions légales", name: "legal" }
        ]
      }
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
          { label: "Contactez-nous ou contribuez", name: "contact" }
        ]
      }
    },
    // Account pages
    {
      path: "/compte/nouveau",
      name: "new-account",
      component: NewAccountPage,
      meta: {
        name: "Créer votre compte Ara",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Créer votre compte Ara", name: "new-account" }
        ]
      }
    },
    {
      path: "/compte/validation",
      name: "new-account-validation",
      component: NewAccountValidationPage,
      meta: {
        name: "Valider votre compte Ara",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          {
            label: "Valider votre compte Ara",
            name: "new-account-validation"
          }
        ]
      }
    },
    {
      path: "/compte/email-update-validation",
      name: "email-update-validation",
      component: UpdateEmailValidationPage,
      meta: {
        name: "Changement d'adresse e-mail",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          {
            label: "Changement d'adresse e-mail",
            name: "email-update-validation"
          }
        ]
      }
    },
    {
      path: "/compte/connexion",
      name: "login",
      component: LoginPage,
      meta: {
        name: "Connexion à Ara",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          {
            label: "Connexion à Ara",
            name: "login"
          }
        ]
      }
    },
    {
      path: "/compte/reinitialiser-mot-de-passe",
      name: "password-reset",
      component: ResetPasswordPage,
      meta: {
        name: "Réinitialiser votre mot de passe"
      }
    },
    {
      path: "/compte",
      name: "account-dashboard",
      component: AccountDashboardPage,
      meta: {
        name: "Mes audits",
        authRequired: true
      }
    },
    {
      path: "/compte/parametres",
      name: "account-settings",
      component: AccountSettingsPage,
      meta: {
        authRequired: true,
        name: "Mon compte",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Mon compte", name: "account-settings" }
        ]
      }
    },
    {
      path: "/compte/avis-suppression-compte",
      name: "account-deletion-feedback",
      component: AccountDeletionFeedback,
      meta: {
        name: "Suppression compte",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Suppression compte", name: "account-deletion-feedback" }
        ]
      },
      beforeEnter() {
        // Check that a feedback token is present in the store, otherwise redirect to homepage.
        const accountStore = useAccountStore();
        if (!accountStore.accountDeletionFeedbackToken) {
          return { name: "home" };
        }
      }
    },
    {
      path: "/audit-manquant",
      name: "missing-audit",
      component: MissingAuditPage,
      meta: {
        name: "Je ne retrouve pas mon audit",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Je ne retrouve pas mon audit", name: "missing-audit" }
        ]
      }
    },
    // Audit pages
    {
      path: "/audits/nouveau",
      name: "create-audit",
      component: CreateAuditPage,
      meta: {
        name: "Nouvel audit",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Nouvel audit", name: "create-audit" }
        ]
      }
    },
    {
      path: "/audits/:uniqueId/informations-generales",
      name: "audit-settings",
      component: AuditSettingsPage,
      beforeEnter: saveCurrentEditionStep,
      meta: {
        name: "Mon audit",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          {
            label: getProcedureName(),
            name: "audit-settings"
          }
        ]
      }
    },
    {
      path: "/audits/:uniqueId/generation",
      name: "audit-generation",
      component: AuditGenerationPage,
      beforeEnter: saveCurrentEditionStep,
      meta: {
        name: "Mon audit",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          {
            label: `Synthèse ${getProcedureName()}`,
            name: "audit-overview"
          },
          {
            label: getProcedureName(),
            name: "audit-generation"
          }
        ]
      }
    },
    {
      path: "/audits/:uniqueId/declaration",
      name: "audit-declaration",
      component: AuditDeclarationPage,
      beforeEnter: saveCurrentEditionStep,
      meta: {
        name: "Mon audit",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          {
            label: getProcedureName(),
            name: "audit-declaration"
          }
        ]
      }
    },
    // TODO: remove this redirect in few months?
    {
      path: "/audits/:uniqueId/partage",
      name: "edit-audit-step-four",
      redirect: () => {
        return { name: "audit-overview" };
      }
    },
    // Overview
    {
      path: "/audits/:uniqueId/synthese",
      name: "audit-overview",
      component: AuditOverviewPage,
      meta: {
        name: `Synthèse ${getProcedureName}`,
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: `Synthèse ${getProcedureName()}`, name: "audit-overview" }
        ]
      }
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
          { label: "Contexte", name: "context" }
        ]
      }
    },
    {
      path: "/rapports/:uniqueId/:tab?",
      name: "report",
      component: ReportPage,
      meta: {
        name: "Rapport d’audit",
        hideHomeLink: true
      }
    },
    // Roadmap
    {
      path: "/feuille-de-route",
      name: "roadmap",
      component: RoadmapPage,
      meta: {
        name: "Feuille de route",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Feuille de route", name: "roadmap" }
        ]
      }
    },
    // Changelog
    {
      path: "/notes-de-versions",
      name: "changelog",
      component: ChangelogPage,
      meta: {
        name: "Notes de versions",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Notes de versions", name: "changelog" }
        ]
      }
    },
    // Resources pages
    {
      path: "/ressources",
      name: "resources",
      component: ResourcesPage,
      meta: {
        name: "Ressources",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Ressources", name: "resources" }
        ]
      }
    },
    {
      path: "/ressources/formations-accessibilite",
      name: "accessibility-training",
      component: AccessibilityTrainingPage,
      meta: {
        name: "Formations accessibilité",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Ressources", name: "resources" },
          { label: "Formations accessibilité", name: "accessibility-training" }
        ]
      }
    },
    {
      path: "/ressources/formations-accessibilite/introduction-accessibilite-numerique",
      name: "a11y-intro-training",
      component: A11yIntroTrainingPage,
      meta: {
        name: "Introduction à l’accessibilité numérique",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Ressources", name: "resources" },
          { label: "Formations accessibilité", name: "accessibility-training" },
          {
            label: "Introduction à l’accessibilité numérique",
            name: "a11y-intro-training"
          }
        ]
      }
    },
    {
      path: "/ressources/formations-accessibilite/numerique-public",
      name: "public-digital",
      component: PublicDigitalTrainingPage,
      meta: {
        name: "Bien faire du numérique public",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Ressources", name: "resources" },
          { label: "Formations accessibilité", name: "accessibility-training" },
          {
            label: "Bien faire du numérique public",
            name: "public-digital"
          }
        ]
      }
    },
    {
      path: "/ressources/outils",
      name: "tools",
      component: ToolsPage,
      meta: {
        name: "Outils",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Ressources", name: "resources" },
          { label: "Outils", name: "tools" }
        ]
      }
    },
    {
      path: "/ressources/glossaire",
      name: "glossary",
      component: GlossaryPage,
      meta: {
        name: "Glossaire",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Ressources", name: "resources" },
          { label: "Glossaire", name: "glossary" }
        ]
      }
    },
    {
      path: "/ressources/realiser-audit-accessibilite",
      name: "make-a11y-audit",
      component: MakeA11yAuditPage,
      meta: {
        name: "Réaliser un audit accessibilité",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Ressources", name: "resources" },
          {
            label: "Réaliser soi-même un audit accessibilité",
            name: "make-a11y-audit"
          }
        ]
      }
    },

    {
      path: "/ressources/obligations-legales",
      name: "legal-requirements",
      component: LegalRequirementsPage,
      meta: {
        name: "Obligations légales et sanctions",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Ressources", name: "resources" },
          {
            label: "Obligations légales et sanctions",
            name: "legal-requirements"
          }
        ]
      }
    },
    {
      path: "/ressources/rgaa",
      name: "rgaa",
      component: RGAAPage,
      meta: {
        name: "RGAA",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Ressources", name: "resources" },
          { label: "RGAA", name: "rgaa" }
        ]
      }
    },
    {
      path: "/ressources/declaration-accessibilite",
      name: "accessibility-statement",
      component: AccessibilityStatementPage,
      meta: {
        name: "Déclaration d’accessibilité",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Ressources", name: "resources" },
          {
            label: "Déclaration d’accessibilité",
            name: "accessibility-statement"
          }
        ]
      }
    },
    {
      path: "/ressources/schema-pluriannuel",
      name: "accessibility-plan",
      component: AccessibilityPlanPage,
      meta: {
        name: "Schéma pluriannuel",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Ressources", name: "resources" },
          { label: "Schéma pluriannuel", name: "accessibility-plan" }
        ]
      }
    },
    // Feedback page
    {
      path: "/donner-mon-avis",
      name: "feedback",
      component: FeedbackPage,
      meta: {
        name: "Donner mon avis",
        breadcrumbLinks: () => [
          getHomeBreadcrumbLink(),
          { label: "Donner mon avis", name: "feedback" }
        ]
      }
    },
    // Error pages
    {
      path: "/:pathMatch(.*)*",
      name: "Error",
      component: ErrorPage
    }
  ],
  history,
  scrollBehavior(to) {
    if (!to.hash) {
      return { top: 0 };
    }
  }
});

router.beforeEach((to, from) => {
  if (from.query.dev && !to.query.dev) {
    return {
      ...to,
      query: {
        ...to.query,
        dev: from.query.dev
      }
    };
  }
});

router.beforeEach((to) => {
  const accountStore = useAccountStore();
  if (to.meta.authRequired && !accountStore.account) {
    return { name: "login" };
  }
});

// Reset focus on <body> + announce new page title
router.afterEach(async (to, from) => {
  if (from.path !== to.path) {
    const pageTitleAlert = document.querySelector("#page-title-alert");
    if (pageTitleAlert) {
      pageTitleAlert.innerHTML = `<p>${to.meta.name}</p>`;

      setTimeout(() => {
        pageTitleAlert.innerHTML = "";
      }, 2000);
    }

    document.body.setAttribute("tabindex", "-1");
    document.body.focus();
    document.body.removeAttribute("tabindex");
  }
});

export default router;
