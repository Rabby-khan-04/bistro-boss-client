import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FaQuoteLeft } from "react-icons/fa";
import Rating from "react-rating";
import SectionTitle from "../shared/SectionTitle";
import { Navigation } from "swiper/modules";
import placeholderStarIco from "@/assets/icon/placeholder-star.png";
import starIco from "@/assets/icon/star.png";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("./reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  console.log(reviews);

  return (
    <section className="py-32">
      <div className="container">
        <div>
          <SectionTitle
            heading={"TESTIMONIALS"}
            subHeading={"What Our Clients Say"}
          />
        </div>
        <div>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            loop={true}
            className="mySwiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="px-24 text-center font-inter">
                  <div className="flex-col flex items-center mb-10">
                    <Rating
                      style={{ maxWidth: 270 }}
                      readonly
                      className="mb-12"
                      placeholderRating={review.rating}
                      placeholderSymbol={
                        <img
                          src={starIco}
                          className="inline-block size-8"
                          alt=""
                        />
                      }
                      fullSymbol={
                        <img
                          src={starIco}
                          className="inline-block size-8"
                          alt=""
                        />
                      }
                      emptySymbol={
                        <img
                          src={placeholderStarIco}
                          className="inline-block size-8"
                          alt=""
                        />
                      }
                    />
                    <FaQuoteLeft className="text-[100px] text-neutral " />
                  </div>
                  <p className="text-xl text-[#444] mb-2">{review.details}</p>
                  <h2 className="text-rating text-3xl font-medium ">
                    {review.name}
                  </h2>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
