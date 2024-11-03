'use client'
import { HomeIcon, CubeIcon } from "@heroicons/react/24/outline"
import { usePathname } from "next/navigation"

export default function SideNavBar( {categoryMenu} ) {
    const activeSegment = usePathname();

    const mainMenuItems = [
        {
            name: "Inicio",
            icon: HomeIcon, 
            slug: "/"
        },
        {
            name: "Nuevos",
            icon: CubeIcon, 
            slug: "/new-games"
        },
]

    
    return (
        <>
            <div className="text-accent text-xs mb-2">Menu</div>
            <ul className="bg-muted flex flex-col gap-2 mb-6">
                {mainMenuItems.map((item, i) => (
                    <li key={i}>
                        <a href={item.slug} className={`text-sm tracking-wide flex gap-2 items-center p-1 px-2 ${activeSegment === `${item.slug}` ? "active bg-primary rounded-md" : "inactive hover:bg-primary rounded-md"}`}>
                        <item.icon className="size-6 text-accent"/>
                        {item.name}
                    </a>
                    </li>
                ))}
            </ul>

            <div className="text-accent text-xs mb-2"> Categorias </div>
            <ul className="bg-muted flex flex-col gap-2 mb-6">
                {categoryMenu.map((item) => (
                    <li key={item.id}>
                        <a href={`/category/${item.slug}`} 
                        className={`text-sm tracking-wide flex gap-2 items-center p-1 px-2 ${activeSegment === `/category/${item.slug}` 
                        ? "active bg-primary rounded-md" 
                        : "inactive hover:bg-primary rounded-md"
                        }`}>
                            <div className={`categoryicon ${item.slug}`}></div>
                                {item.title} <span className="text-accent" >({item?.games?.length})</span>
                        </a>
                    </li>
                ))}
            </ul>
        </>
    )

}
