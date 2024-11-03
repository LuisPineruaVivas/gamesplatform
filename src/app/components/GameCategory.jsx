import { ChevronRightIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

export default function GameCategory({ category }) {
    return (
        <section className="mb-4">
            <div className="flex justify-between gap-4">
                <h2 className="font-display mb-4 items-center">
                    {category?.title}
                </h2>
                <a href={`/category/${category?.slug}`}
                className="text-sm font-medium hover:underline underline-offset-4">
                    Ver Todas <ChevronRightIcon className="h-4 w-4 inline-block text-accent" />
                </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category?.games.map((game) => (
                    <a href={`/game/${game.slug}`} key={game.id} className="group">
                        <div className="overflow-hidden rounded-lg border border-accent-secondary mb-2">
                            <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_SOURCE}/thumbnail/${game.image}`}
                            alt={game.title}
                            width={339}
                            height={197}
                            quality={80} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <p className="text-sm text-accent{">{category.title}</p>
                        <h1 className="font-medium">{game.title}</h1>
                    </a>
                ))}
            </div>
        </section>
    )
}