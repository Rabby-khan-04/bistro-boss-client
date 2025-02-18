import AboutSection from "@/components/Home/AboutSection";
import Banner from "@/components/Home/Banner";
import Category from "@/components/Home/Category";
import ContactSection from "@/components/Home/ContactSection";
import FeaturedProduct from "@/components/Home/FeaturedProduct";
import PopularMenu from "@/components/Home/PopularMenu";
import Recommendation from "@/components/Home/Recommendation";
import Testimonials from "@/components/Home/Testimonials";

const Home = () => {
  return (
    <main>
      <Banner />
      <Category />
      <AboutSection />
      <PopularMenu />
      <ContactSection />
      <Recommendation />
      <FeaturedProduct />
      <Testimonials />
    </main>
  );
};

export default Home;
