![Logo StuDiscover](img/logoLong.png)

# Projet Web du Groupe 7<br>

Professeur : **Damien Brun**<br>
Étudiants : **Adrien Capdeville**, **Léo Gaborit**, **Samuel Allizard**, **Oscar Neveux**, **Thibault Martin**<br>
Codes permanents : **CAPA02010500**, **GABL21040500**, **ALLS24060500**, **NEVO29060500**, **MART28070500**

### Ce projet est fait **PAR** des étudiants, **POUR** des étudiants.

## Description du projet

StuDiscover est une plateforme qui permet aux entreprises partenaires de se connecter avec des étudiants disposant d’un compte. Les entreprises peuvent publier des offres d’emploi, des contrats, des stages, ainsi que des promotions ou des produits/services réservés aux étudiants. Les partenaires vont des recruteurs à la recherche de talents (emploi, alternance, stage) aux commerces locaux ou grandes enseignes qui proposent des avantages sur plusieurs produits : réductions, offres spéciales, accès à des services (cinéma, librairie, supermarché, etc.).
La plateforme facilite la rencontre entre les besoins des entreprises et les attentes du quotidien étudiant, pour rendre la vie pro comme perso plus riche et avantageuse.

## Pages du site Web

- Accueil
- Qui sommes-nous ?
- Offres
- Nos partenaires
- Termes et conditions
- Nous contacter

## Technologies utilisées

Frontend : **HTML5**, **CSS3**, **JS**<br>
Backend : **NodeJS 25.2.1**<br>
Gestion de projet : **GitHub** et **Discord**

## Flow chart du projet

![Flow chart](img/flow.png)

## Configuration

1. Cloner le dépôt :

```bash
git clone https://github.com/StuDiscoverGroup7/uqac-projet-web-g7.git
cd uqac-projet-web-g7
```

2. Installer les dépendances :

```bash
npm install
```

3. Configurer les variables d'environnement :

```bash
cp .env.example .env
```

Puis éditer le fichier `.env` avec vos valeurs si nécessaire (pas nécessaire en développement local)

## Lancement

### 1. Démarrer la base de données PostgreSQL

```bash
docker-compose up -d
```

Cette commande lance PostgreSQL dans un conteneur Docker. La base de données sera accessible sur `localhost:5433`
Pour arrêter la base de données :

```bash
docker-compose down
```

### 2. Lancer le serveur Node.js

```bash
npm run dev
```

Le serveur sera accessible sur `http://localhost:3000`
