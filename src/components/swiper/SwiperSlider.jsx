// import Swiper JS
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper styles
import "swiper/css";
import { sliderData } from "../../assets/constants/constants";
import Slides from "./Slides";

const SwiperSlider = () => {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation
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
