import MainLayout from "./(main)/layout";
import Home from "./(main)/page";

export default function Page() {
  return (
    <MainLayout children={<Home/>}/>
  );
}
