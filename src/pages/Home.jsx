import AboutSection from "@/components/Home/AboutSection";
import Banner from "@/components/Home/Banner";
import Category from "@/components/Home/Category";
import PopularMenu from "@/components/Home/PopularMenu";

const Home = () => {
  return (
    <main>
      <Banner />
      <Category />
      <AboutSection />
      <PopularMenu />
    </main>
  );
};

export default Home;
