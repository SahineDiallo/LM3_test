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

## Étapes pour exécuter le projet

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo
```

### 2. Accéder au dossier backend

```bash
cd backend
```

### 3. Créer un environnement virtuel

Sur macOS/Linux :

```bash
python -m venv venv
source venv/bin/activate
```

Sur Windows :

```bash
python -m venv venv
venv\Scripts\activate
```

### 4. Installer les dépendances

```bash
pip install -r requirements.txt
```

### 5. Configurer la base de données PostgreSQL

Créer une base de données PostgreSQL :

Ouvrez `psql` ou un client PostgreSQL de votre choix, puis exécutez :

```sql
CREATE DATABASE transaction_db;
```

Configurer les variables d'environnement :

Copiez le fichier `.env.example` vers un nouveau fichier `.env` :

```bash
cp .env.example .env
```

Modifiez le fichier `.env` pour y ajouter vos informations de connexion à la base de données :

```env
DB_NAME=transaction_db
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=votre_secret_key
```

### 6. Appliquer les migrations

```bash
python manage.py migrate
```

### 7. Charger les données initiales (catégories et devises)

Charger les catégories :

```bash
python manage.py loaddata categories.json
```

Charger les devises :

```bash
python manage.py loaddata currencies.json
```

### 8. Créer un superutilisateur (admin)

```bash
python manage.py createsuperuser
```

Suivez les invites pour créer un compte administrateur.

### 9. Démarrer le serveur de développement

```bash
python manage.py runserver
```

Le backend sera accessible à l'adresse : [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

---

### 10. Accéder au dossier frontend

```bash
cd ../frontend
```

### 11. Installer les dépendances

```bash
npm install
```

### 12. Configurer les variables d'environnement

Copiez le fichier `.env.example` vers un nouveau fichier `.env` :

```bash
cp .env.example .env
```

Modifiez le fichier `.env` pour y ajouter l'URL de l'API backend :

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### 13. Démarrer l'application React

```bash
npm run dev
