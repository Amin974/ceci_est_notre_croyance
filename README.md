# Ceci est notre croyance — Admin Traductions

Application web privée permettant de centraliser, organiser et rechercher des
traductions de vidéos d'un cheikh parlant en arabe.

## Stack

- Next.js App Router
- TypeScript
- TailwindCSS
- Supabase Auth + Database
- Vercel

## Fonctionnalités MVP

- Connexion privée par email / mot de passe via Supabase Auth.
- Aucun formulaire d'inscription publique.
- Sidebar avec dossiers, création de dossier et création de fichier.
- Création et modification de fichiers de traduction.
- Recherche dans les titres, textes arabes et traductions françaises.
- Surlignage du mot ou de l'expression recherchée.

## Installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

L'application sera disponible sur :

```text
http://localhost:3000
```

## Configuration Supabase

1. Créer un projet Supabase.
2. Copier les valeurs du projet dans `.env.local` :

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

3. Exécuter le fichier SQL suivant dans l'éditeur SQL Supabase :

```text
supabase/schema.sql
```

Ce schéma crée :

- `folders`
- `files`
- le trigger `updated_at`
- la fonction RPC `search_translation_files`
- les policies RLS pour les utilisateurs authentifiés

4. Créer manuellement le compte superadmin dans Supabase :

```text
Authentication > Users > Add user
```

## Scripts

```bash
npm run dev
npm run build
npm run typecheck
```

## Variables d'environnement Vercel

Ajouter dans les settings du projet Vercel :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Contraintes

- Pas d'inscription publique.
- Pas de multi-rôles.
- Pas de commentaires, notifications, paiement ou dashboard complexe.
- Le MVP reste centré sur login, dossiers, fichiers et recherche.
