const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs"); 

async function main() {
    const categories = [
        {
          id: 1,
          title: "Arcade",
          slug: "arcade",
          image: "arcade.jpg",
          core: "arcade",
        },
        {
          id: 2,
          title: "Atari",
          slug: "atari",
          image: "atari.jpg",
          core: "atari2600",
        },
        {
          id: 3,
          title: "SNES",
          slug: "nes",
          image: "super-nintendo.jpg",
          core: "snes",
        },
        {
          id: 4,
          title: "Nintendo 64",
          slug: "nintendo-64",
          image: "n64.jpg",
          core: "n64",
        },
        {
          id: 5,
          title: "PlayStation",
          slug: "playstation",
          image: "playstation.jpg",
          core: "psx",
        },
      ];
    
      const games = [
        {
          id: 1,
          title: "Cadillacs and Dinosaurs",
          slug: "cadillacs-and-dinosaurs",
          image: "cadillacs-and-dinosaurs.jpg",
          description: "This is the game description.",
          game_url: "dino.zip",
          published: true,
          categories: [1],
        },
        {
          id: 2,
          title: "Asterix and the Great Rescue",
          slug: "asterix-and-the-great-rescue",
          image: "asterix-and-the-great-rescue.jpg",
          description: "This is the game description.",
          game_url: "your-game-here.zip",
          description: "This is the game description.",
          game_url: "your-game-here.zip",
          published: true,
          categories: [1],
        },        
      ];

      for (const category of categories) {
        await prisma.category.upsert({
          where: {
            id: category.id,
          },
          update: {
            title: category.title,
            image: category.image,
            core: category.core,
            slug: category.slug,
          },
          create: {
            id: category.id,
            title: category.title,
            image: category.image,
            core: category.core,
            slug: category.slug,
          },
        });
      }
    
      for (const game of games) {
        await prisma.game.upsert({
          where: {
            id: game.id,
          },
          update: {
            title: game.title,
            slug: game.slug,
            image: game.image,
            description: game.description,
            game_url: game.game_url,
            published: game.published,
            categories: {
              set: game.categories.map((categoryId) => ({ id: categoryId })),
            },
          },
          create: {
            id: game.id,
            title: game.title,
            slug: game.slug,
            image: game.image,
            description: game.description,
            game_url: game.game_url,
            published: game.published,
            categories: {
              connect: game.categories.map((categoryId) => ({ id: categoryId })),
            },
          },
        });
      }

      const password = await bcrypt.hash("password", 12);
      const email = "admin15@admin.com"
      const user = await prisma.user.upsert({
        where: { email: email },
        update: {},
        create: {
          name: "Admin",
          email: email,
          password: password,
          role: "ADMIN",
        }
      })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })