import { Link } from "react-router-dom";
import SectionCover from "./SectionCover";
import MenuItem from "./MenuItem";
import PropTypes from "prop-types";

const MenuCategory = ({ menu, img = "", heading = "", subHeading = "" }) => {
  return (
    <>
      {heading && (
        <SectionCover img={img} heading={heading} subHeading={subHeading} />
      )}
      <section className="pt-28 pb-12">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {menu.map((menuItem) => (
              <MenuItem menu={menuItem} key={menuItem._id} />
            ))}
          </div>
          <div className="text-center">
            <Link to={`/shop/${heading}`} className="black__btn">
              ORDER YOUR FAVOURITE FOOD
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

MenuCategory.propTypes = {
  menu: PropTypes.array,
  img: PropTypes.string,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};

export default MenuCategory;
