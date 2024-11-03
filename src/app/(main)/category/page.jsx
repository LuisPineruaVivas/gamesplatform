import { getGameCategories } from "@/lib/gameQueries";

export default async function Page() {
    const categories = await getGameCategories();

    return (
        <div>
            <h1 className="font-display text-3xl mb-4">Categorias</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5  xl:grid-cols-6 gap-4 mb-6">
                {categories.map((category) => (
                    <a href={`/category/${category.slug}`} key={category.id} className="group">
                        <div className="overflow-hidden rounded-lg border border-accent-secondary">
                            <img src={`/category/${category.image}`} alt={category.title} width={200} height={293} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>
                        <h1>{category.title}</h1>
                        <p>{category.description}</p>
                    </a>
                ))}
            </div>

        </div>
    );
}