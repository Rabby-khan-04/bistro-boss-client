import PropTypes from "prop-types";

const MenuItem = ({ menu }) => {
  const { name, recipe, image, price } = menu;
  return (
    <div className="flex items-center gap-8">
      <img
        src={image}
        className="w-32 h-28 object-cover object-center rounded-full rounded-tl-none"
        alt=""
      />
      <div>
        <div className="flex justify-between items-center gap-3">
          <h3 className="text-xl font-cinzel font-medium text-neutral uppercase">
            {name}
          </h3>
          <div className="border border-dashed border-neutral grow"></div>
          <p className="font-inter font-medium text-xl text-golden ">
            ${price}
          </p>
        </div>
        <p className="text-dark-gray font-inter">{recipe}</p>
      </div>
    </div>
  );
};

MenuItem.propTypes = {
  menu: PropTypes.object,
};

export default MenuItem;
