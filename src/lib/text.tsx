import type { ReactNode } from "react";

export function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function highlightMatches(text: string | null | undefined, query: string) {
  const value = text ?? "";
  const trimmed = query.trim();

  if (!trimmed) {
    return value;
  }

  const pattern = new RegExp(`(${escapeRegex(trimmed)})`, "gi");
  const parts = value.split(pattern);

  return parts.map<ReactNode>((part, index) => {
    if (part.toLowerCase() === trimmed.toLowerCase()) {
      return (
        <mark
          key={`${part}-${index}`}
          className="rounded bg-gold/90 px-1 py-0.5 text-night"
        >
          {part}
        </mark>
      );
    }

    return part;
  });
}

export function getSearchExcerpt(
  file: {
    title: string;
    arabic_text: string | null;
    french_translation: string | null;
  },
  query: string,
) {
  const trimmed = query.trim().toLowerCase();
  const sources = [file.title, file.arabic_text ?? "", file.french_translation ?? ""];

  if (!trimmed) {
    return file.french_translation || file.arabic_text || file.title;
  }

  const match = sources.find((source) => source.toLowerCase().includes(trimmed));

  if (!match) {
    return file.french_translation || file.arabic_text || file.title;
  }

  const index = match.toLowerCase().indexOf(trimmed);
  const start = Math.max(0, index - 80);
  const end = Math.min(match.length, index + trimmed.length + 120);
  const prefix = start > 0 ? "... " : "";
  const suffix = end < match.length ? " ..." : "";

  return `${prefix}${match.slice(start, end)}${suffix}`;
}
