import PropTypes from "prop-types";
import SectionTitle from "../shared/SectionTitle";
import MenuCategory from "../shared/MenuCategory";

const OfferedCategory = ({ offered }) => {
  return (
    <section className="pt-32 pb-11">
      <div className="container">
        <SectionTitle subHeading={"Don't miss"} heading={"TODAY'S OFFER"} />
        <MenuCategory menu={offered} />
      </div>
    </section>
  );
};

OfferedCategory.propTypes = {
  offered: PropTypes.object,
};

export default OfferedCategory;
