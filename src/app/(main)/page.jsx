import { getGameCategories, getGamesBySelectedCategory } from "@/lib/gameQueries";
import CategorySlider from "../components/Sliders/CategorySlider";
import HeroSlider from "../components/Sliders/HeroSlider";
import GameCategory from "../components/GameCategory";

export default async function Home() {
    //const allCategories = await getGameCategories();
    //const nintendo = await getGamesByCategory(5);

    const [allCategories, arcade] = await Promise.all([
        getGameCategories(),
        getGamesBySelectedCategory(1)
    ]);

    return (
        <>
        <HeroSlider/>
        <CategorySlider categories={allCategories}/>
        <GameCategory category={arcade}/>
        </>
    );
}