// import Swiper JS
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

//Custom Components
import { sliderData } from "../../assets/constants/constants";
import Slides from "./Slides";

const SwiperSlider = () => {
  return (
    <Swiper
      className="swiper-slider"
      modules={[Pagination, Navigation, Autoplay]}
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation={true}
    >
      {sliderData.map((item) => (
        <SwiperSlide key={item.id}>
          <Slides title={item.title} desc={item.desc} image={item.image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperSlider;
