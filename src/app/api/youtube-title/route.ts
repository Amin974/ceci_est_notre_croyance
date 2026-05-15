import { NextResponse } from "next/server";

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get("url")?.trim();

  if (!rawUrl) {
    return NextResponse.json({ error: "Lien YouTube manquant." }, { status: 400 });
  }

  let youtubeUrl: URL;

  try {
    youtubeUrl = new URL(rawUrl);
  } catch {
    return NextResponse.json({ error: "Lien YouTube invalide." }, { status: 400 });
  }

  if (!YOUTUBE_HOSTS.has(youtubeUrl.hostname)) {
    return NextResponse.json(
      { error: "Le lien doit être un lien YouTube." },
      { status: 400 },
    );
  }

  const oembedUrl = new URL("https://www.youtube.com/oembed");
  oembedUrl.searchParams.set("url", youtubeUrl.toString());
  oembedUrl.searchParams.set("format", "json");

  const response = await fetch(oembedUrl, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Impossible de récupérer le titre de cette vidéo." },
      { status: response.status },
    );
  }

  const data = (await response.json()) as { title?: unknown };

  if (typeof data.title !== "string" || !data.title.trim()) {
    return NextResponse.json(
      { error: "Titre YouTube introuvable." },
      { status: 404 },
    );
  }

  return NextResponse.json({ title: data.title.trim() });
}
