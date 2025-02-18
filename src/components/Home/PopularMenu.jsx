import { useEffect, useState } from "react";
import SectionTitle from "../shared/SectionTitle";
import axios from "axios";
import MenuItem from "../shared/MenuItem";
import { useNavigate } from "react-router-dom";

const PopularMenu = () => {
  const navigate = useNavigate();
  const [popularMenu, setPopularMenu] = useState([]);
  useEffect(() => {
    axios.get("/menu.json").then((res) => {
      const popularMenu = res.data.filter(
        (menuItem) => menuItem.category === "popular"
      );

      setPopularMenu(popularMenu);
    });
  }, []);

  return (
    <section className="py-32">
      <div className="container">
        <div>
          <SectionTitle heading="FROM OUR MENU" subHeading="Check it out" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {popularMenu.map((menu) => (
            <MenuItem menu={menu} key={menu._id} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="black__btn" onClick={() => navigate("/menu")}>
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularMenu;
