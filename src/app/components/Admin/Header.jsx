import { signOut } from "@/app/auth";
import Image from "next/image";

export default function Header() {
    return (
        <header className="px-4 flex h-14 shrink-0 items-center gap-4 justify-between">
            <a href="/" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="The Games Platform" width={116.56} height={33.8} loading="eager" />
            </a>

            <nav className="flex gap-4 md:gap-6">

                <form action={async (formData) => {
                    "use server";
                    await signOut();
                }}>
                    <button type="submit">Cerrar Sesion</button>

                </form>


                <a href="/">
                    Ir a la Pagina Principal &#8599;
                </a>
            </nav>

        </header>
    );
}