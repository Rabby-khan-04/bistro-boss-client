import PropTypes from "prop-types";

const SectionCover = ({ heading, subHeading, img }) => {
  return (
    <section
      className="flex items-center h-[700px] bg-no-repeat bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url("${img}")`,
      }}
    >
      <div className="max-w-5xl mx-auto bg-neutral/60 text-white py-28 px-32">
        <div className="text-center ">
          <h1 className="mb-2 text-5xl uppercase font-cinzel font-medium">
            {heading}
          </h1>
          <p className="text-base font-medium font-inter">{subHeading}</p>
        </div>
      </div>
    </section>
  );
};

SectionCover.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  img: PropTypes.string,
};

export default SectionCover;
