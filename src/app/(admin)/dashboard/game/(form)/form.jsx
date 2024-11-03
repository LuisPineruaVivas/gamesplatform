'use client'
import { useFormStatus } from "react-dom";
import { useActionState } from 'react';

import { createGame, deleteFormAction } from "@/app/(admin)/dashboard/game/(form)/actions";
import { PhotoIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";


const initialState = { message : null }

function SubmitButton(){
    const { pending } = useFormStatus();
    return(
        <button type="submit" aria-disabled={pending}
        className="w-full text-white bg-black font-medium rounded-lg text-lg px-5 py-2.5 text-center">
            {pending ? "Guardando..." : "Guardar"}
        </button>
    ) 
}

export default function GameForm({categories, game}) {
    const [state, formAction] = useActionState(createGame, initialState);

    return (
        <div>
            {state.message && (
                <p className={`text-sm mb-4`} style={{'color': state.color}} >{state.message}</p>
            )} 

            <form className="flex flex-col lg:flex-row gap-8" action={formAction}>
                <input type="text" id="gameId" name="gameId" className="hidden" defaultValue={game?.id} />

                <div className="lg:w-80">
                    {game?.image ? (
                        <img src={`${process.env.NEXT_PUBLIC_IMAGE_SOURCE}/thumbnail/${game?.image}`} alt={game?.title} className="mb-4 rounded-md" />
                    ) : null}


                    <div className="mb-4">
                        <p className="block mb-2 text-xs text-accent uppercase">
                            Subir Miniatura
                        </p>
                        <label htmlFor="thumbnailFile" className="flex flex-col items-center justify-center w-full h-40 border border-accent border-dashed rounded-md cursor-pointer bg-black hover:bg-accent-secondary">
                            <div className="flex flex-col items-center justify-center text-center p-2">
                                <PhotoIcon width={40} height={40} className="mb-4"/>
                                <p className="mb text-sm">
                                    <b>Presiona para subir</b> 
                                </p>
                                <p className="text-xs">PNG, JPG, JPEG, WEBP (258x150)</p>
                            </div>
                            <input type="file" id="thumbnailFile" name="thumbnailFile"
                                accept="image/png, image/jpeg, image/jpg, image.webp" className="hidden"/>
                        </label>
                    </div>

                    <div className="mb-4">
                        <p className="block mb-2 text-xs text-accent uppercase">
                            Subir Juego
                        </p>
                        Archivo: {game?.game_url}
                        <label htmlFor="gameFile" className="flex flex-col items-center justify-center w-full h-40 border border-accent border-dashed rounded-md cursor-pointer bg-black hover:bg-accent-secondary">
                            <div className="flex flex-col items-center justify-center text-center p-2">
                                <ArchiveBoxIcon width={40} height={40} className="mb-4"/>
                                <p className="mb text-sm">
                                    <b>Presiona para subir</b> 
                                </p>
                                <p className="text-xs">ZIP (Limite 20mb)</p>
                            </div>
                            <input type="file" id="gameFile" name="gameFile"
                                accept=".zip" className="hidden"/>
                        </label>
                    </div>

                </div>

                <div className="w-full">
                    <div>
                        <label htmlFor="id" className="block mb-2 text-xs text-accent uppercase">ID</label>
                            <input type="text" 
                                id="id"
                                name="id"
                                readOnly
                                className="bg-black border border-accent sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2 mb-4"
                                placeholder="ID del juego"
                                defaultValue={game ? game.id : ""}
                            />

                    </div>

                    <div>
                        <label htmlFor="title" className="block mb-2 text-xs text-accent uppercase">Titulo</label>
                            <input type="text" 
                                id="title"
                                name="title"
                                required
                                className="bg-black border border-accent sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2 mb-4"
                                placeholder="Titulo del juego"
                                defaultValue={game ? game.title : ""}
                            />

                    </div>

                    <div>
                        <label htmlFor="slug" className="block mb-2 text-xs text-accent uppercase">Path</label>
                            <input type="text" 
                                id="slug"
                                name="slug"
                                required
                                className="bg-black border border-accent sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2 mb-4"
                                placeholder="Path del juego"
                                defaultValue={game ? game.slug : ""}
                            />
                            
                    </div>

                    <div>
                        <label htmlFor="description" className="block mb-2 text-xs text-accent uppercase">Descripcion</label>
                            <textarea type="text"
                                rows="3" 
                                cols="50"
                                id="description"
                                name="description"
                                required
                                className="bg-black border border-accent sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2 mb-4"
                                placeholder="Descripción del juego"
                                defaultValue={game ? game.description : ""}
                            /> 
                    </div>

                    <div>
                        <label htmlFor="category" className="block mb-2 text-xs text-accent uppercase">Categoria</label>
                            <select
                                id="category"
                                name="category"
                                required
                                className="bg-black border border-accent sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2 mb-4"
                                defaultValue={game ? game.categories[0]?.id : ""}
                            >
                                {
                                    categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.id === game?.categories[0]?.id ? game.categories[0].title : category.title}
                                        </option>
                                    ))
                                }
                            </select> 
                    </div>

                    <div className="mb-4">
                        <p className="block mb-2 text-xs text-accent uppercase">Publicado</p>

                        <div className="flex gap-4">
                            <div className="flex gap-2">
                                <input type="radio" id="published" name="published" value="true" />
                                <label htmlFor="published">Publicado</label>
                            </div>
                            <div className="flex gap-2">
                                <input type="radio" id="private" name="published" value="false" />
                                <label htmlFor="private">Privado</label>
                            </div>
                        </div>  
                        {game?.published? 'Este juego esta publicado' : 'Este juego no esta publicado'}   
                    </div>
                    
                    <SubmitButton />
                </div>
            </form>

            { game?.id && (
                <form className="mt-10" action={deleteFormAction}>
                    <input type="hidden" name="gameId" value={game?.id} />
                    <button type="submit" className="w-full text-white bg-red-500 font-medium rounded-lg text-lg px-5 py-2.5 text-center">Eliminar Juego</button>      
                </form>
            ) }

            
        </div>
    )
}