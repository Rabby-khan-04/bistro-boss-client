import PropTypes from "prop-types";

const PageCover = ({ heading, subHeading, img }) => {
  return (
    <section
      className="flex items-center h-[800px] bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="container bg-neutral/60 text-white py-36">
        <div className="text-center font-cinzel font-bold">
          <h1 className="mb-2 text-[88px] uppercase">{heading}</h1>
          <p className="text-2xl">{subHeading}</p>
        </div>
      </div>
    </section>
  );
};

PageCover.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  img: PropTypes.string,
};

export default PageCover;
