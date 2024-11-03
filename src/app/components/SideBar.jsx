import { getCategoriesMenu } from "@/lib/gameQueries";
import SideNavBar from "./SideNavBar";

export default async function SideBar() {
    const categoryMenu = await getCategoriesMenu();

    return (
       <aside className="w-64 p-4 hidden lg:flex flex-col">
            <SideNavBar categoryMenu={categoryMenu} />
        </aside>
    );
}