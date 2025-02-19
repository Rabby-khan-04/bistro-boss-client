import PropTypes from "prop-types";

const MenuCard = ({ food }) => {
  const { name, recipe, image, category, price, _id } = food;
  return (
    <div className="bg-[#F3F3F3] overflow-y-hidden rounded-xl">
      <div className="relative">
        <img
          src={image}
          className="w-full h-80 block object-cover object-center"
          alt=""
        />
        <p className="text-base py-3 px-6 bg-neutral font-inter text-white absolute top-5 right-5">
          ${price}
        </p>
      </div>
      <div className="py-8 px-10 font-inter text-center text-neutral h-full">
        <h2 className="text-2xl font-bold font-cinzel">{name}</h2>
        <p>{recipe}</p>
        <button className="golden__btn mt-6">Add To Cart</button>
      </div>
    </div>
  );
};

MenuCard.propTypes = {
  food: PropTypes.object,
};

export default MenuCard;
