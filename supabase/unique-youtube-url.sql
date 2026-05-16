-- Bloque les doublons d'URL YouTube et de titre.
-- Si ce script echoue, corrigez d'abord les doublons existants retournes par les requetes ci-dessous.

select lower(btrim(youtube_url)) as youtube_url, count(*) as duplicate_count
from public.files
where youtube_url is not null
group by lower(btrim(youtube_url))
having count(*) > 1;

select lower(btrim(title)) as title, count(*) as duplicate_count
from public.files
group by lower(btrim(title))
having count(*) > 1;

create unique index if not exists files_youtube_url_unique_idx
on public.files (lower(btrim(youtube_url)))
where youtube_url is not null;

create unique index if not exists files_title_unique_idx
on public.files (lower(btrim(title)));
