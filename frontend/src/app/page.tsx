import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  // Consumiendo datos desde Supabase en el servidor
  const { data: games, error } = await supabase.from("games").select("*");

  if (error) {
    return (
      <div className="p-8 text-red-500">
        Error al cargar los datos: {error.message}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-indigo-400">
            Leo's Games
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Explora nuestro catálogo exclusivo de videojuegos.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games?.map((game) => (
            <div
              key={game.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between"
            >
              <div>
                <img
                  src={game.image_url}
                  alt={game.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-950 text-indigo-300 rounded-full">
                    {game.genre}
                  </span>
                  <h2 className="text-xl font-bold mt-3 mb-2">{game.title}</h2>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    {game.description}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-emerald-400">
                  ${game.price.toFixed(2)}
                </span>
                {/* Ruta dinámica */}
                <Link
                  href={`/juegos/${game.slug}`}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
