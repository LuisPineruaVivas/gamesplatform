import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllGames() {
    return await prisma.game.findMany();
}

export async function getGamesCategories() {
    return await prisma.category.findMany();
}

export async function getGameById(gameId) {
    return await prisma.game.findUnique({
        where: {
            id: gameId 
        },
        include: {
            categories: true
        } 
    });
}
