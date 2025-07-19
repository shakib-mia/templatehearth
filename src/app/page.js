import Header from "./components/Header/Header";
import HomeTemplates from "./components/HomeTemplates/HomeTemplates";
import Layout from "./components/Layout/Layout";
import Services from "./components/Services/Services";
import Templates from "./components/Templates/Templates";
import WhyUs from "./components/WhyUs/WhyUs";

export default function Home() {
  return (
    <>
      <Header />
      <Services />
      <HomeTemplates />
      <WhyUs />
    </>
  );
}
