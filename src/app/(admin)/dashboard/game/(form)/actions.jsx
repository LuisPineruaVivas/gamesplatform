'use server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createGame(prevState, formData) {
    try {
        //grab id to update
        const id = formData.get("gameId");
        const title = formData.get("title");
        const slug = formData.get("slug");
        const description = formData.get("description");
        const categoryId = formData.get("category");
        const published = formData.get("published") === "true";
        const thumbnailFile = formData.get("thumbnailFile");
        const gameFile = formData.get("gameFile");

        const gameData = {
            title,
            slug,
            description,
            categories: {
                connect: { id: parseInt(categoryId, 10) }
            },
            published,
        }

        if (thumbnailFile && thumbnailFile instanceof File && thumbnailFile.name && thumbnailFile.size > 0){
            console.log("setting image to: ", thumbnailFile.name);
            gameData.image = thumbnailFile.name
        }

        if (gameFile && gameFile instanceof File && gameFile.name && gameFile.size > 0){
            console.log("setting file to: ", gameFile.name);
            gameData.game_url = gameFile.name
        }

        if (id) {
            await prisma.game.update({
                where: { id: parseInt(id, 10) },
                data: gameData
            });
            await uploadThumbnail(thumbnailFile);
            await uploadGame(gameFile);

            revalidatePath("/");
            return {
                status: "success",
                message: "Juego Actualizado exitosamente.",
                color: "green"
            }
        } else {
            //check if slug already exists
            const exixtingGame = await prisma.game.findUnique({
                where: {
                    slug: slug,
                    NOT: id ? { id: parseInt(id, 10) } : undefined
                }
            })

            if (exixtingGame) {
                revalidatePath("/")
                return {
                    status: "error",
                    message: "Path existente. Por favor, elija un path diferente.",
                    color: "red"
                }
            }

            // Add new game
            await prisma.game.create({ data: gameData });
            await uploadThumbnail(thumbnailFile);
            await uploadGame(gameFile);

            revalidatePath("/");
            return {
                status: "success",
                message: "Juego Agregado exitosamente.",
                color: "green"
            }

        }
    } catch (error) {
        revalidatePath("/");
        return {
            status: "error",
            message: error.message,
            color: "red"
        }
    }
}

async function uploadGame(gameFile) {
    if (gameFile && gameFile instanceof File && gameFile.name && gameFile.size > 0) {
        try{
            const buffer = Buffer.from(await gameFile.arrayBuffer());
            await uploadFiletoS3(buffer, `rom/${gameFile.name}`)
        } catch (error) {
            console.log('Error uploading game: ', error);
        }
    }
}

async function uploadThumbnail(thumbnailFile) {
    if (thumbnailFile && thumbnailFile instanceof File && thumbnailFile.name && thumbnailFile.size > 0) {
        try{
            const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
            await uploadFiletoS3(buffer, `thumbnail/${thumbnailFile.name}`)
        } catch (error) {
            console.log('Error uploading thumbnail: ', error);
        }
    }
}


const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_AWS_S3_KEY_ID,
        secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY
    }
});

async function uploadFiletoS3(file, filename) {
    const params = {
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
        Key: `${filename}`,
        Body: file
    }
    const command = new PutObjectCommand(params);
    try{
        const response = await s3Client.send(command);
        console.log('File uploaded successfully: ', response);
        return filename
    } catch (error) {
        throw error;

    }
}

export async function deleteFormAction(formData) {
    if(!formData){
        throw new Error("No se recibio ninguna data");
    }
    const id = formData.get("gameId");
    if(!id){
        throw new Error("No se recibio el id del juego");
    }
    await prisma.game.delete({ 
        where: { id: parseInt(id, 10) } 
    });
    revalidatePath("/");
    redirect("/dashboard")
}
