import Image from "next/image";
import { getSearchResults } from "@/lib/gameQueries";

export default async function Page(req) {
    const searchQuery = await req.searchParams.q;

    let games = [];
    if (searchQuery) {
        games = await getSearchResults(searchQuery);
    }

    return (
        <div>
            <h1 className="font-display text-2xl md:text-3xl mb-4">{searchQuery ? `Resultados para: ${searchQuery}` : `No ingresaste una busqueda`}</h1>
            <div className="text-accent mb-4">
                {`${games?.length} resultados`}
            </div>

            <ul>
                {games.map((game) => (
                    <li key={game.id} className="mb-2">
                        <a href={`/games/${game.slug}`} className="flex bg-main hover:bg-accent-secondary p-4 rounded-lg gap-4">
                            <Image src={`/game/${game.image}`} alt={game.title} className="w-2/6 lg:1/6 roundend-md" width={300} height={300} quality={50} />
                            <div className="flex flex-col gap-4">
                                <h2 className="text-xl">
                                    {game.title}
                                </h2>
                                <p>{game.description}</p>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>


            {/*<pre>{JSON.stringify(games, null, 4)}</pre>*/}
        </div>
    );
}