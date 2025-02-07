# Notes de versions

Tous les changements notables de Ara sont documentés ici avec leur date, leur catégorie (nouvelle fonctionnalité, correction de bug ou autre changement) et leur pull request (PR) associée.

## 14/12/2023

### Nouvelles fonctionnalités 🚀

- Ajout d’une page synthèse pour faciliter l’accès aux documents liés à l’audit ([#579](https://github.com/DISIC/Ara/pull/579))

### Autres changements ⚙️

- Déplacement des notes dans l’en-tête de la page de génération de l’audit ([#579](https://github.com/DISIC/Ara/pull/579))

## 11/12/2023

### Corrections 🐛

- Corrige un bug qui empêchait l’ouverture des modales ([#583](https://github.com/DISIC/Ara/pull/583))
- Corrige le message d’erreur lors de la duplication d’un audit depuis la page de l’audit ([#584](https://github.com/DISIC/Ara/pull/584))
- Corrige l’affichage des interrupteurs suite à la mise à jour du DSFR ([#586](https://github.com/DISIC/Ara/pull/586))

## 08/12/2023

### Nouvelles fonctionnalités 🚀

- Les onglets de page sur la page d'audit sont maintenant collés au haut de l'écran ([#541](https://github.com/DISIC/Ara/pull/541))

### Autres changements ⚙️

- Ajuste le layout de la barre d'actions sur la page d'audit ([#541](https://github.com/DISIC/Ara/pull/541))

## 06/12/2023

### Corrections 🐛

- Mise à jour du DSFR qui corrige notamment l’utiliisation des flèches directionnelles dans les champs de texte situés dans les onglets ([#576](https://github.com/DISIC/Ara/pull/576))

### Autres changements ⚙️

- Déplace le champ du nom de la structure qui audite le site dans la page de déclaration ([#574](https://github.com/DISIC/Ara/pull/574))

## 01/12/2023

### Autres changements ⚙️

- Ajout de plus de contexte le message indiquant qu’aucun audit n’est présent sur le tableau de bord ([#577](https://github.com/DISIC/Ara/pull/577))

## 30/11/2023

### Nouvelles fonctionnalités 🚀

- Comptes utilisateurs 👤 ([#396](https://github.com/DISIC/Ara/pull/396))
  - Création de compte sur l'application
  - Ajout d'une page permettant de retrouver tous ses audits
  - Gestion de son compte (email, mot-de-passe, suppression de compte, informations de profil)
  - Possibilité de pré-remplir les futurs audits avec les informations du profil

## 23/11/2023

### Corrections 🐛

- Corrige le problème de scroll qui cachait le titre de la thématique lors de l’utilisation des ancres de la barre latérale ([#562](https://github.com/DISIC/Ara/pull/562))

## 16/11/2023

### Corrections 🐛

- Corrige le problème de scroll dans la barre des filtres qui rendaient la dernière thématique inatteignable ([#554](https://github.com/DISIC/Ara/pull/554))

## 02/11/2023

### Nouvelles fonctionnalités 🚀

- Ajout de filtres sur la conformité lors du remplissage de l’audit ([#479](https://github.com/DISIC/Ara/pull/479))

## 25/10/2023

### Autres changements ⚙️

- Ajoute les instructions pour faire des liens et ignorer le formattage en Markdown ([#519](https://github.com/DISIC/Ara/pull/519))

## 29/09/2023

### Corrections 🐛

- Si l’URL du site n’est pas renseignée, utilise l’URL de la première page auditée ([#487](https://github.com/DISIC/Ara/pull/487))
- Corrige le problème de disparition d’onglet lorsqu’on utilise les ancres depuis l’onglet "Notes" lors de la génération ([#483](https://github.com/DISIC/Ara/pull/483))

## 08/09/2023

### Corrections 🐛

- Corrige les problèmes d’accessibilité suite au contre-audit ([#478](https://github.com/DISIC/Ara/pull/478))

### Autres changements ⚙️

- Affiche un message clair et explicite sur le rapport quand aucune erreur n'a été relevée sur une page ([#465](https://github.com/DISIC/Ara/pull/465))

## 06/09/2023

### Corrections 🐛

- Corrige la mise à jour des dates de publication et d’édition d’un audit pour que la date de publication ne puisse plus être postérieure à la date d’édition ([#461](https://github.com/DISIC/Ara/pull/461))
- Corrige le libellé du bouton de soumission sur la page d’édition des paramètres d’un audit ([#458](https://github.com/DISIC/Ara/pull/458))

### Autres changements ⚙️

- Réorganise les pages d'aides et de ressources ([#466](https://github.com/DISIC/Ara/pull/466))

## 30/06/2023

### Corrections 🐛

- Cache le bloc de déclaration d’accessibilité sur la synthèse dans le cas d’un audit rapide ou complémentaire ([#459](https://github.com/DISIC/Ara/pull/459))
- Applique correctement la mise à jour du nom de la structure ([#454](https://github.com/DISIC/Ara/pull/454))

## 27/06/2023

### Nouvelles fonctionnalités 🚀

- Ajout d’un paramètre "Facile à corriger" sur les non-conformités ([#436](https://github.com/DISIC/Ara/pull/436))

## 22/06/2023

### Autres changements ⚙️

- Ajoute une page "Feuille de route" ([#426](https://github.com/DISIC/Ara/pull/426))
- Ajoute une page "Notes de versions" ([#426](https://github.com/DISIC/Ara/pull/426))

## 16/06/2023

### Nouvelles fonctionnalités 🚀

- Ajoute un indicateur de progression de l'audit ([#423](https://github.com/DISIC/Ara/pull/423))
- AJoute un indicateur de d'enregistrement ([#423](https://github.com/DISIC/Ara/pull/423))

## 14/06/2023

### Nouvelles fonctionnalités 🚀

- Ajoute l’URL de la page auditée dans son onglet ([#428](https://github.com/DISIC/Ara/pull/428))

## 07/06/2023

### Corrections 🐛

- Affiche correctement l’email de contact dans la déclaration d’accessibilité ([#425](https://github.com/DISIC/Ara/pull/425))

## 02/06/2023

### Nouvelles fonctionnalités 🚀

- Ajoute la possibilité de télécharger le statut des critères de l'audit sous forme de fichier .CSV ([#410](https://github.com/DISIC/Ara/pull/410))

## 01/06/2023

### Corrections 🐛

- Corrige l'ordre des erreurs dans le détail des résultats sur le rapport
- Corrige le placement de la mention "Validation possible à la fin de l'audit"
- Corrige l'affichage des non-conformités transverses dans le rapport

## 31/05/2023

### Nouvelles fonctionnalités 🚀

- Ajout d’une section de notes libres ([#405](https://github.com/DISIC/Ara/pull/405))

## 26/05/2023

### Autres changements ⚙️

- Rend la duplication d'un audit toujours faisable même si celui-ci n'est pas terminé ([#408](https://github.com/DISIC/Ara/pull/408))

## 24/05/2023

### Nouvelles fonctionnalités 🚀

- Ajout d’une option pour afficher ou non l’email de l’auditeur dans le rapport ([#393](https://github.com/DISIC/Ara/pull/393))

## 18/05/2023

### Corrections 🐛

- Corrige la navigation depuis la page de génération d'audit ([#400](https://github.com/DISIC/Ara/pull/400))

## 16/05/2023

### Nouvelles fonctionnalités 🚀

- Ajout d’un bouton pour dupliquer un audit terminé ([#377](https://github.com/DISIC/Ara/pull/377))

## 12/05/2023

### Corrections 🐛

- Vérifie le poids des images d'exemple avant de les envoyer au serveur ([#394](https://github.com/DISIC/Ara/pull/394))

## 11/05/2023

### Corrections 🐛

- Corrige l'application de l'état transverse d'un critère via le switch "Sur toutes les pages" qui était parfois ignoré.

## 10/05/2023

### Corrections 🐛

- Corrige une erreur qui survenait lorsqu'un champ de formulaire de type URL contenait un espace ([#386](https://github.com/DISIC/Ara/pull/386))
- Corrige l'ordre des erreurs dans l'onglet "Détail des résultats" du rapport d'audit ([#389](https://github.com/DISIC/Ara/pull/389))

### Autres changements ⚙️

- Les accordéons "Description de la ou des erreurs" et "Recommandation de correction" sont remplacés par un unique accordéon "Description et recommandation" ([#390](https://github.com/DISIC/Ara/pull/390))

## 05/05/2023

### Corrections 🐛

- Corrige les onglets cassés lors de l'utilisation d'ancres ([#372](https://github.com/DISIC/Ara/pull/372))
- Corrige le filtre "Masquer les critères évalués" qui ne fonctionnait pas sur les audits rapides et complémentaires ([#373](https://github.com/DISIC/Ara/pull/373))

## 04/05/2023

### Autres changements ⚙️

- Ajout d’une notification pour signaler qu’un email avec les liens importants a été envoyé lors de la création d’un audit ([#368](https://github.com/DISIC/Ara/pull/368))

## 03/05/2023

### Nouvelles fonctionnalités 🚀

- Remplacement des filtres de thématique par des ancres lors de la réalisation d’un audit ([#362](https://github.com/DISIC/Ara/pull/362))

## 28/04/2023

### Autres changements ⚙️

- Modifications mineures de la page d’accueil ([#361](https://github.com/DISIC/Ara/pull/361))

## 19/04/2023

### Nouvelles fonctionnalités 🚀

- Ajout d'une aide à la saisie en Markdown accessible en cliquant sur le bouton "Markdown pris en compte" en dessous des champs texte concernés ([#350](https://github.com/DISIC/Ara/pull/350))

## 05/04/2023

### Nouvelles fonctionnalités 🚀

- Lors de la création d'un audit, envoie d'un email contenant les liens vers l'audit et le rapport ([#314](https://github.com/DISIC/Ara/pull/314))

### Autres changements ⚙️

- Mise à jour du titre de la page de génération d’audit ([#345](https://github.com/DISIC/Ara/pull/345))
- Ajout du métier "Auditeur / Auditrice accessibilité" dans le formulaire de retour ([#346](https://github.com/DISIC/Ara/pull/346))

## 30/03/2023

### Nouvelles fonctionnalités 🚀

- Ajout d’un bouton pour afficher ou cacher la barre latérale des filtres ([#322](https://github.com/DISIC/Ara/pull/322))

## 24/03/2023

### Nouvelles fonctionnalités 🚀

- Ajout d’un filtre pour cacher les tests et références des critères ([#329](https://github.com/DISIC/Ara/pull/329))

### Autres changements ⚙️

- Petits ajustements d’affichage du contenu de la page Contexte d’un audit ([#331](https://github.com/DISIC/Ara/pull/331))
- Mise à jour du wording pour la saisie d’un moyen de contact dans la déclaration ([#330](https://github.com/DISIC/Ara/pull/330))

## 23/03/2023

### Nouvelles fonctionnalités 🚀

- Ajout d’un interrupteur pour marquer le résultat d’un critère comme transverse sur toutes les pages ([#317](https://github.com/DISIC/Ara/pull/317))

### Autres changements ⚙️

- Mise à jour du DSFR en version `1.9.0` ([#326](https://github.com/DISIC/Ara/pull/326))
- Mise à jour de l’adresse email de contact : ara@design.numerique.gouv.fr ([#328](https://github.com/DISIC/Ara/pull/328))

## 08/03/2023

### Nouvelles fonctionnalités 🚀

- Ajout d’un lien de retour en haut de page pendant l’audit ([#316](https://github.com/DISIC/Ara/pull/316))

### Corrections 🐛

- Améliore la gestion du focus à la fermeture des modales ([#297](https://github.com/DISIC/Ara/pull/297))

### Autres changements ⚙️

- Un seul des 2 moyens de contact est obligatoire : email ou URL vers un formulaire ([#313](https://github.com/DISIC/Ara/pull/313))

## 17/02/2023

### Corrections 🐛

- Améliore la lisibilité du texte lorsque l'espacement des caractères est agrandi ([#305](https://github.com/DISIC/Ara/pull/305))
- Corrige l’affichage des longues URL dans le rapport ([#306](https://github.com/DISIC/Ara/pull/306))

## 15/02/2023

### Corrections 🐛

- Les retours à la lignes dans les commentaires et descriptions d'erreur sont rendu comme tel dans le rapport ([#301](https://github.com/DISIC/Ara/pull/301))
- Le lien vers l'audit en cours est enlevé du menu de navigation lorsque l'audit est supprimé ([#299](https://github.com/DISIC/Ara/pull/299/files))

## 08/02/2023

### Corrections 🐛

- Ajoute une alternative aux graphiques du rapport sous forme de tableau ([#287](https://github.com/DISIC/Ara/pull/287))
- Clarifie le statut de l’audit côté rapport ([#284](https://github.com/DISIC/Ara/pull/284))

## 03/02/2023

### Autres changements ⚙️

- Ajout d’une page _Données personnelles_ ([#291](https://github.com/DISIC/Ara/pull/291))
- Suppression de la mention "optionnel" sur la description et la recommandation de correction des critères non conformes ([#292](https://github.com/DISIC/Ara/pull/292))

## 02/02/2023

### Corrections 🐛

- Harmonise la navigation entre l’audit et le rapport ([#283](https://github.com/DISIC/Ara/pull/283))

## 01/02/2023

### Nouvelles fonctionnalités 🚀

- Ajout d’un statut d’enregistrement en haut de la page de remplissage de l’audit ([#281](https://github.com/DISIC/Ara/pull/281))

## 25/01/2023

### Nouvelles fonctionnalités 🚀

- Ajout de la possibilité d'ajouter des images d'exemples aux critères non-conformes ([#237](https://github.com/DISIC/Ara/pull/237/))

### Autres changements ⚙️

- Mise à jour des données des donuts dans l'en-tête de l’audit ([#276](https://github.com/DISIC/Ara/pull/276))

## 20/01/2023

### Nouvelles fonctionnalités 🚀

- Ajout des paramètres d'affichage pour changer manuellement de thème de couleur ([#279](https://github.com/DISIC/Ara/pull/279))

### Corrections 🐛

- Pertinence des titres ([#273](https://github.com/DISIC/Ara/pull/273))

## 13/01/2023

### Nouvelles fonctionnalités 🚀

- Ouverture des liens du rapport dans un nouvelle fenêtre ([#275](https://github.com/DISIC/Ara/pull/275))
- Mise à jour des outils d’assistance proposés par défaut ([#274](https://github.com/DISIC/Ara/pull/274))

### Corrections 🐛

- Ajout de la vocalisation du nombre de résultats dans le rapport ([#254](https://github.com/DISIC/Ara/pull/254)) et des suppressions de pages ([#258](https://github.com/DISIC/Ara/pull/258))
- Ajout d'une mention textuelle pour les liens externes ([#272](https://github.com/DISIC/Ara/pull/272))

## 11/01/2023

### Nouvelles fonctionnalités 🚀

- Nouvelle interface pour les technologies, outils d’assistance et environnements lors du remplissage de la déclaration d’accessibilité ([#233](https://github.com/DISIC/Ara/pull/233)).

### Corrections 🐛

- Corrections de rôles `main` et `search` ([#255](https://github.com/DISIC/Ara/pull/255))
- Ajout du numéro de la thématique et du critère dans les labels des boutons radio de conformité ([#253](https://github.com/DISIC/Ara/pull/253))
- Gère l’annonce des liens externes ([#272](https://github.com/DISIC/Ara/pull/272))

### Autres changements ⚙️

- Dans le rapport, déplace l'URL de la page sous son nom ([#257](https://github.com/DISIC/Ara/pull/257))

## 15/12/2022

### Corrections 🐛

- Mise à jour du wording et du lien pour copier la déclaration d’accessibilité ([#247](https://github.com/DISIC/Ara/pull/247))
- Supprime le lien vers le rapport dans le dropdown du header de la génération d’audit (déjà présent à côté) ([#245](https://github.com/DISIC/Ara/pull/245)).

## 14/12/2022

### Nouvelles fonctionnalités 🚀

- Ajoute un message d'information sur le rapport des audits en cours ([#236](https://github.com/DISIC/Ara/pull/236))

### Autres changements ⚙️

- Ajout d'un moniteur d'erreur afin de plus facilement detecter et corriger les problèmes techniques rencontrés par les utilisateurs ([#234](https://github.com/DISIC/Ara/pull/234))

## 13/12/2022

### Nouvelles fonctionnalités 🚀

- Ajout d'une description à chaque type d’audit lors de la création d’un audit ([#229](https://github.com/DISIC/Ara/pull/229))
- Ajout de l'URL de la page près de son nom dans le rapport d’erreurs ([#231](https://github.com/DISIC/Ara/pull/231))

### Autres changements ⚙️

- Mise à jour de la mise en avant pour notifier le caractère obligatoire de la déclaration d’accessibilité ([#228](https://github.com/DISIC/Ara/pull/228))

## 12/12/2022

### Nouvelles fonctionnalités 🚀

- Formate les éléments suivant dans le rapport avec Markdown ([#227](https://github.com/DISIC/Ara/pull/227)) :
  - Description d'une erreur de conformité
  - Recommandation sur un critère
  - Non-conformités
  - Contenu dérogé
  - Contenus non soumis à l’obligation d’accessibilité
- Ajout d'une explication sur le calcul du taux de conformité sur le rapport ([#232](https://github.com/DISIC/Ara/pull/232))
- Cache les sections "Contenus non accessibles" vides dans le rapport
- Ajoute un message d'information sur la page de rapport d'un audit en cours ([#236](https://github.com/DISIC/Ara/pull/236)).

### Corrections 🐛

- Fixe les liens des pages auditées dans la page de contexte ([#235](https://github.com/DISIC/Ara/pull/235)).

## 30/11/2022

### Nouvelles fonctionnalités 🚀

- Ajout d’une mise en avant pour notifier le caractère obligatoire de la déclaration d’accessibilité ([#206](https://github.com/DISIC/Ara/pull/206))

### Autres changements ⚙️

- Ajout du changelog ([#207](https://github.com/DISIC/Ara/pull/207))

## 16/11/2022

Lancement de la version bêta d'Ara. 🎉
