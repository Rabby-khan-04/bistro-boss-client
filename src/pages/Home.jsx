import AboutSection from "@/components/Home/AboutSection";
import Banner from "@/components/Home/Banner";
import Category from "@/components/Home/Category";
import ContactSection from "@/components/Home/ContactSection";
import PopularMenu from "@/components/Home/PopularMenu";
import Recommendation from "@/components/Home/Recommendation";

const Home = () => {
  return (
    <main>
      <Banner />
      <Category />
      <AboutSection />
      <PopularMenu />
      <ContactSection />
      <Recommendation />
    </main>
  );
};

export default Home;
