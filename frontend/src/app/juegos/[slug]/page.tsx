import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function GameDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Consulta filtrada por slug en Supabase
  const { data: game, error } = await supabase
    .from("games")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !game) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-indigo-400 hover:underline mb-6 inline-block"
        >
          &larr; Volver al catálogo
        </Link>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={game.image_url}
            alt={game.title}
            className="w-full h-80 object-cover"
          />
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold px-3 py-1 bg-indigo-950 text-indigo-300 rounded-full">
                {game.genre}
              </span>
              <span className="text-2xl font-black text-emerald-400">
                ${game.price.toFixed(2)}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold mb-4">{game.title}</h1>
            <p className="text-slate-300 leading-relaxed text-lg">
              {game.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
