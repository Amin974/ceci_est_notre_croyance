"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { getSupabaseBrowserClient, hasSupabaseConfig } from "@/lib/supabase-browser";
import { ThemeToggle } from "@/components/theme-toggle";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isConfigured = hasSupabaseConfig();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError("Identifiants invalides ou compte non autorisé.");
        return;
      }

      window.location.href = "/app";
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Connexion impossible pour le moment.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-5 py-12">
      <ThemeToggle className="absolute right-5 top-5" />
      <section className="w-full max-w-md rounded-lg border border-gold/25 bg-panel/95 p-8 shadow-premium">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded border border-gold/40 bg-gold/10 text-gold">
            <ShieldCheck size={22} aria-hidden="true" />
          </div>
          <div>
            <p className="font-title text-lg tracking-wide text-cream">
              Ceci est notre croyance
            </p>
            <p className="text-sm text-muted">Administration des traductions</p>
          </div>
        </div>

        <h1 className="font-title text-3xl text-cream">Connexion</h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Accès privé réservé au compte superadmin créé manuellement.
        </p>

        {!isConfigured ? (
          <div className="mt-6 rounded border border-gold/30 bg-gold/10 p-4 text-sm leading-6 text-cream">
            Supabase n'est pas encore configuré. Renseignez les variables de
            `.env.local` avant de vous connecter.
          </div>
        ) : null}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm text-cream">
            Email
            <span className="mt-2 flex items-center gap-2 rounded border border-line/10 bg-surface px-3 py-3 text-cream gold-focus">
              <Mail size={18} className="text-gold" aria-hidden="true" />
              <input
                className="w-full bg-transparent outline-none placeholder:text-muted"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.com"
                autoComplete="email"
                required
              />
            </span>
          </label>

          <label className="block text-sm text-cream">
            Mot de passe
            <span className="mt-2 flex items-center gap-2 rounded border border-line/10 bg-surface px-3 py-3 text-cream gold-focus">
              <LockKeyhole size={18} className="text-gold" aria-hidden="true" />
              <input
                className="w-full bg-transparent outline-none placeholder:text-muted"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
                autoComplete="current-password"
                required
              />
            </span>
          </label>

          {error ? <p className="text-sm text-red-300">{error}</p> : null}

          <button
            className="w-full rounded bg-gold px-5 py-3 font-semibold text-ink transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={loading || !isConfigured}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </section>
    </main>
  );
}
