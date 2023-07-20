// import Swiper JS
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

//import Custom Components
import { sliderProducts } from "../../assets/constants/constants";
import ProductCard from "../cards/ProductCard";

const CardSlider = () => {
  return (
    <Swiper
      modules={[Navigation]}
      navigation={true}
      slidesPerView={4}
      spaceBetween={10}
      className="mt-20 card-slider"
    >
      {sliderProducts.map((item) => (
        <SwiperSlide key={item.id}>
          <ProductCard
            image={item.image}
            name={item.name}
            rating={item.rating}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CardSlider;
