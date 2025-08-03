import Blogs from "./components/Blogs/Blogs";
import Header from "./components/Header/Header";
import HomeBlogs from "./components/HomeBlogs/HomeBlogs";
import HomeTemplates from "./components/HomeTemplates/HomeTemplates";
import Services from "./components/Services/Services";
import Templates from "./components/Templates/Templates";
import WhyUs from "./components/WhyUs/WhyUs";

export default function Home() {
  return (
    <>
      <Header />
      <Services route={"/"} />
      <HomeTemplates />
      {/* <WhyUs /> */}
      <HomeBlogs />
    </>
  );
}
