import Header from "@/app/components/Admin/Header";
import { getGamesCategories } from "@/lib/adminQueries";
import GameForm from "../(form)/form";

export default async function Page() {
    const categories = await getGamesCategories();
    return (
        <>
        <Header/>
        
        <div className="container mx-auto mb-8 px-4 min-h-[50rem] pb-8 relative mt-10">
            <a href="/dashboard" className="text-sm">&#8592; Volver</a>
            <div className="flex justify-between gap-4 mb-4">
                <h1 className="font-display"> Agregar Nuevo Juego </h1>
            </div>
            <GameForm categories={categories}/>
        </div>
        
        </>
    )}