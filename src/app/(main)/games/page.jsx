import { getAllGames} from "@/lib/gameQueries";

export default async function Page({ params, searchParams }) {
    
    const { page } = await searchParams; // Await searchParams
    const currentPage = parseInt(page) || 1; // Default to page 1 if not provided

    // Await params before using its properties
    const { slug } = await params; // Await params
    const { games, totalPages} = await getAllGames();
    return (
        <div>
            <h1 className="font-display text-3xl mb-4 capitalize">{slug}</h1>
            <nav className="rounded-md w-full mb-4">
                <ol className="lis-reset flex">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <span className="text-gray-500 mx-2">/</span>
                    </li>
                    <li className="text-gray-500 capitalize">{slug}</li>
                </ol>
            </nav>

            <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {games.length === 0 ? (
                    <p>No hay juegos para mostrar</p>
                ) : (
                    games.map((game) => (
                        <a href={`/game/${game.slug}`} key={game.id} className="group">
                            <div className="overflow-hidden rounded-lg border border-accent-secondary mb-2">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_SOURCE}/thumbnail/${game.image}`}
                                    width={300}
                                    height={300}
                                    alt={game.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <h1 className="font-medium">{game.title}</h1>
                        </a>
                ))
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <nav className="inline-flex rounded-md shadow">
                        {currentPage > 1 && (
                            <a
                                href={`/category/${params.slug}?page=${currentPage - 1}`}
                                className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                Anterior
                            </a>
                        )}
                        {[...Array(totalPages).keys()].map((pageNum) => (
                            <a href={`/category/${params.slug}?page=${pageNum + 1}`} key={pageNum+1} className={`px-3 py-2 border border-gray-300 bg-white text-sm font-medium ${currentPage === pageNum + 1 ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:bg-gray-50'} `}>
                                {pageNum + 1}      
                            </a>
                        ))}
                        {currentPage < totalPages && (
                            <a
                                href={`/category/${params.slug}?page=${currentPage + 1}`}
                                className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                Siguiente
                            </a>
                        )}     
                    </nav>
                </div>
            )
        }
        </div>
    );
}