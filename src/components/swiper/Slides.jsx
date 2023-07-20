const Slides = ({ title, desc, image }) => {
  return (
    <div className="h-screen w-full relative">
      <img className="object-cover w-full h-screen" src={image} alt={title} />
      <div className="absolute top-1/3 md:w-1/3 left-8">
        <h2 className="text-5xl text-center md:text-left text-white font-bold">
          {title}
        </h2>
        <p className="text-wheat text-2xl text-center md:text-left font-semibold mt-8">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default Slides;
