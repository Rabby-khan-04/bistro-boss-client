import SectionTitle from "../shared/SectionTitle";
import MenuItem from "../shared/MenuItem";
import { useNavigate } from "react-router-dom";
import useMenu from "@/hooks/useMenu";
import Spinner from "../shared/Spinner";

const PopularMenu = () => {
  const navigate = useNavigate();
  const [menu, menuIsLoading] = useMenu("popular");

  if (menuIsLoading) return <Spinner />;

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
