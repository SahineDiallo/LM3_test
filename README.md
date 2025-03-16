# Projet Full-Stack : Gestion des Utilisateurs et des Transactions

Ce projet est une application full-stack permettant de gérer des utilisateurs et leurs transactions financières. Il comprend un backend développé avec Django (Python) et un frontend développé avec React.

## Technologies utilisées

### Backend (Django)
- **Framework** : Django
- **Base de données** : PostgreSQL
- **Authentification** : JWT (JSON Web Tokens)
- **Gestion des permissions** : Les administrateurs peuvent voir toutes les transactions, tandis que les utilisateurs normaux ne peuvent voir que leurs propres transactions.
- **Tests** : Tests unitaires avec Django `unittest`.

### Frontend (React)
- **Gestion d'état** : Zustand
- **Validation des formulaires** : Zod
- **Tests** : Jest, React Testing Library, Cypress (à implémenter).

---

## Installation et configuration

### Prérequis

- **Python** (version 3.9 ou supérieure)
- **Node.js** (version 16 ou supérieure)
- **PostgreSQL** (version 13 ou supérieure)
- **Git** (pour cloner le dépôt)

---

## Backend (Django)

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo/backend
