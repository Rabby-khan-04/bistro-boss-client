import SectionTitle from "../shared/SectionTitle";
import MenuItem from "../shared/MenuItem";
import { useNavigate } from "react-router-dom";
import useMenu from "@/hooks/useMenu";

const PopularMenu = () => {
  const navigate = useNavigate();
  const [menu, loading] = useMenu("popular");

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-7xl font-bold font-cinzel text-center">Loading</h2>
      </div>
    );

  return (
    <section className="py-32">
      <div className="container">
        <div>
          <SectionTitle heading="FROM OUR MENU" subHeading="Check it out" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {menu.map((menuItem) => (
            <MenuItem menu={menuItem} key={menu._id} />
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
