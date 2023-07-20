import BaseHeading from "../components/headings/BaseHeading";
import CardSlider from "../components/swiper/CardSlider";
import SwiperSlider from "../components/swiper/SwiperSlider";

const Home = () => {
  return (
    <>
      <SwiperSlider />
      <BaseHeading content={"Trending Products"} />
      <CardSlider />
    </>
  );
};

export default Home;
