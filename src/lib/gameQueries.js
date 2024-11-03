import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllGames() {
    return await prisma.game.findMany();
}

export async function getGamesByCategory(categorySlug, page = 1) {
    const ITEMS_PER_PAGE = 10 ;
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const [games, totalCount] = await Promise.all([
        prisma.game.findMany({
            where: {
                categories: {
                    some: {
                        slug: categorySlug
                    }
                }
            },
            skip,
            take: ITEMS_PER_PAGE
        }),
        prisma.game.count({
            where: {
                categories: {
                    some: {
                        slug: categorySlug
                    }
                }
            }
        })
    ])
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return ({ games, totalPages, currentPage: page })
}


export async function getGameBySlug(slug) {
    return await prisma.game.findUnique({
        where: {
            slug: slug
        },
        include: {
            categories: true
        }
    });
}


export async function getGamesBySelectedCategory(categoryId) {
    return await prisma.category.findUnique({
        where: {
            id: categoryId
        },
        select: {
            title: true,
            slug: true,
            games: {
                where: {
                    published: true
                },
                take: 8
            }
        }
    })
}

export async function getGameCategories() {
    return await prisma.category.findMany({});
}

export async function getCategoriesMenu() {
    return await prisma.category.findMany({
        include: {
            games: true
        }
    });
}

export async function getSearchResults(params) {
    return await prisma.game.findMany({
        where: {
            title: {
                contains: params
            }
        },
        take: 100
    });
}
