# Tableau de Bord Administratif

## Objectif
Ce projet est un tableau de bord administratif moderne qui permet aux utilisateurs de visualiser et gérer différentes données d'entreprise comme les statistiques de vente, les performances, les activités et les projets.

## Fonctionnalités Implémentées

### Navigation et Interface
- Interface sombre moderne avec des composants réactifs
- Navigation par onglets entre différentes sections (Aperçu, Performance, Activité, Projets)
- Barre latérale pour la navigation principale
- En-tête avec barre de recherche et notifications

### Tableau de Bord - Aperçu
- Affichage des statistiques clés (chiffre d'affaires, nouveaux clients, etc.)
- Graphiques interactifs pour visualiser les données (barres, lignes, camembert)
- Liste des tâches récentes
- Calendrier des échéances

### Tableau de Bord - Performance
- Filtrage des données par période (semaine, mois, trimestre, année)
- Graphiques de performance pour les ventes, chiffre d'affaires, clients et taux de conversion
- Tableau récapitulatif des performances

### Tableau de Bord - Activité
- Journal d'activité avec filtrage par type (emails, tâches, réunions, etc.)
- Barre de recherche pour filtrer les activités
- Affichage des utilisateurs associés à chaque activité

### Tableau de Bord - Projets
- Liste des projets avec statut, progression et échéance
- Filtrage des projets par statut
- Tri des projets par différents critères
- Recherche de projets
- Création de nouveaux projets
- Affichage détaillé des projets (tâches, équipe, progression)

### Fonctionnalités des Boutons
- Boutons d'actualisation des données
- Boutons de filtrage et de tri
- Boutons de navigation entre les onglets
- Boutons pour créer de nouveaux éléments
- Boutons pour afficher les détails

## Structure du Projet

### Composants Principaux
- `Dashboard`: Composant principal qui gère les onglets et les données
- `DashboardOverview`: Affiche l'aperçu général
- `DashboardPerformance`: Affiche les données de performance
- `DashboardActivity`: Affiche le journal d'activité
- `DashboardProjects`: Gère l'affichage et la création de projets

### Services
- `DashboardService`: Gère les opérations liées aux données du tableau de bord

### Données
- Utilisation de données mockées pour simuler des API
- Structure de données organisée par catégories (stats, projets, activités, etc.)

## Technologies Utilisées
- React pour l'interface utilisateur
- Framer Motion pour les animations
- Recharts pour les graphiques
- Tailwind CSS pour le style
