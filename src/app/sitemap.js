import { getAllGames } from "@/lib/gameQueries";

export const revalidate = 3600;

export default async function sitemap() {
    const{ games, totalPages} = await getAllGames();

    const items = games.map((item) => ({
        url: `${process.env.NEXT_WEBSITE_URL}/game/${item.slug}`,
        lastModified: item.created_at,
        changefreq: "monthly",
        priority: 0.7
    }));

    return [
        {
            url: "https://mywebsite.com",
            lastModified: new Date(),
            changefreq: "daily",
            priority: 1
        },
        {
            url: "https://mywebsite.com/about",
            lastModified: new Date(),
            changefreq: "weekly",
            priority: 1
        },
        ...items
    ]
}