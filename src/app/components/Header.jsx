import Image from "next/image";
import Search from "./Search";
import MobileNav from "./MobileNav";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

export default function Header() {
    return (
        <header className="px-4 flex h-14 shrink-0 items-center gap-4">
            <a href="/" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="The Games Platform" width={116.56} height={33.8} loading="eager"/>
            </a>

            <Search/>
            <nav className="flex gap-4 md:gap-6">
                <a href="#"><Cog8ToothIcon className="w-6 h-6 text-white"/></a>
                <MobileNav/>
            </nav>

        </header>
    );
}