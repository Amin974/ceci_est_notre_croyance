Ceci est notre croyance — Admin Traductions

Application web privée permettant de centraliser, organiser et rechercher des traductions de vidéos d’un cheikh parlant en arabe.

Le projet est destiné à un usage interne par des administrateurs qui traduisent des contenus vidéo en français.

⸻

Objectif du projet

L’objectif principal est de permettre de :

* centraliser les travaux de traduction,
* organiser les contenus dans des dossiers,
* retrouver rapidement des passages déjà traduits,
* effectuer des recherches dans les textes arabes et français,
* gagner du temps sur les travaux de traduction.

⸻

Fonctionnalités

Authentification

* connexion sécurisée via email / mot de passe,
* un seul compte superadmin,
* aucun système d’inscription publique.

⸻

Gestion des dossiers

Possibilité de :

* créer des dossiers,
* organiser les fichiers de traduction.

Exemples :

* Sermons
* Rappels
* Ramadan
* Tawhid

⸻

Gestion des fichiers

Chaque fichier contient :

* un titre,
* un lien YouTube,
* un texte arabe écrit manuellement,
* une traduction française.

⸻

Moteur de recherche

Recherche globale dans :

* les titres,
* les textes arabes,
* les traductions françaises.

Fonctionnalités :

* résultats rapides,
* extraits de texte,
* surlignage des mots recherchés,
* affichage du dossier associé.

⸻

Stack technique

Frontend

* Next.js
* TypeScript
* TailwindCSS

⸻

Backend / Database

* Supabase

⸻

Déploiement

* Vercel

⸻

Charte graphique

Le design est inspiré de la chaîne « Ceci est notre croyance ».

Style visuel

* sobre,
* premium,
* spirituel,
* minimaliste,
* élégant.

Palette principale

Couleur	Hex
Noir profond	#0B0B0B
Or élégant	#C8A75B
Or clair	#E2C98A
Blanc cassé	#F2F2F2
Gris subtil	#A1A1A1

⸻

Typographies

Titres

* Cinzel

Texte

* Inter

⸻

Installation

1. Cloner le projet

git clone <repo-url>
cd <project-name>

⸻

2. Installer les dépendances

npm install

⸻

Configuration Supabase

Créer un projet Supabase

Créer un projet sur :

Supabase￼

⸻

Variables d’environnement

Créer un fichier .env.local

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

⸻

Base de données

Table folders

create table folders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamp with time zone default now()
);

⸻

Table files

create table files (
  id uuid primary key default gen_random_uuid(),
  folder_id uuid references folders(id) on delete cascade,
  title text not null,
  youtube_url text,
  arabic_text text,
  french_translation text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

⸻

Sécurité Supabase

Activer RLS :

alter table folders enable row level security;
alter table files enable row level security;

Créer les policies :

create policy "Authenticated users can manage folders"
on folders
for all
to authenticated
using (true)
with check (true);
create policy "Authenticated users can manage files"
on files
for all
to authenticated
using (true)
with check (true);

⸻

Création du superadmin

Dans Supabase :

* Authentication
* Users
* Add User

Créer manuellement :

* email
* mot de passe

Aucune inscription publique ne doit être disponible.

⸻

Lancer le projet

npm run dev

Application disponible sur :

http://localhost:3000

⸻

Déploiement Vercel

Déployer le projet sur :

Vercel￼

⸻

Variables d’environnement Vercel

Ajouter :

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

dans :

* Project Settings
* Environment Variables

⸻

Structure du projet

src/
├── app/
├── components/
├── lib/
├── services/
├── styles/
└── types/

⸻

Contraintes importantes

* projet volontairement simple,
* pas de système multi-rôles,
* pas d’inscription publique,
* pas de fonctionnalités inutiles,
* priorité à la rapidité et à la lisibilité.

⸻

Vision du projet

Créer une bibliothèque moderne de traductions permettant à une équipe de :

* retrouver rapidement des contenus,
* centraliser les travaux,
* préserver les traductions réalisées,
* améliorer l’organisation du travail quotidien.