import { getGameBySlug } from "@/lib/gameQueries";
import GameEmulator from "@/app/components/GameEmulator";

export async function generateMetadata({ params }) {
    // Await params before using its properties
    const { slug } = await params; // Await params
    const game = await getGameBySlug(slug);
    
    const title = game?.title + " - Games Platform NextGen" || "Retro Games NextGen";
    const description = game?.description || "Los mejor juegos Retro aqui";

    return {
        title,
        description
    }
}

export default async function Page({ params }) {
    // Await params before using its properties
    const { slug } = await params; // Await params
    const game = await getGameBySlug(slug);

    return (
        <div>
            <nav className="rounded-md w-full mb-4">
                <ol className="list-reset flex">
                    <li>
                        <a href="/">Inicio</a>
                    </li>
                    <li>
                        <span className="text-gray-500 mx-2">/</span>
                    </li>
                    <li>
                        <a href={`/category/${game?.categories[0]?.slug}`}>{game?.categories[0]?.title}</a>
                    </li>
                    <li>
                        <span className="text-gray-500 mx-2">/ {game?.title}</span>
                    </li>
                </ol>

                <GameEmulator game={game} />
            </nav>
        </div>
    );
}