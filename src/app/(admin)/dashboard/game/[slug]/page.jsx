import Header from "@/app/components/Admin/Header";
import { getGameById, getGamesCategories } from "@/lib/adminQueries";
import GameForm from "@/app/(admin)/dashboard/game/(form)/form";

export default async function Page({ params }) {
    // Await params before using its properties
    const { slug } = await params; // Await params
    const gameId = slug;
    const [gameData, categories] = await Promise.all([
        getGameById(parseInt(gameId)), 
        getGamesCategories()
    ]);

    return(
        <>
            <Header/>
            <div className="container mx-auto mb-8 px-4 min-h-[50rem] pb-8 relative mt-10">
            <a href="/dashboard" className="text-sm">&#8592; Volver</a>
            <div className="flex justify-between gap-4 mb-4">
                <h1 className="font-display"> Editar Juego </h1>
                <a href={`/game/${gameData.slug}`}
                className="text-sm border border-accent py-2 px-3 rounded-xl">
                    Ver juego &rarr;
                </a>
            </div> 
            <GameForm categories={categories}  game={gameData}/>
        </div>
        </>
    )
}