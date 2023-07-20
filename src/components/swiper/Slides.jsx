const Slides = ({ title, desc, image }) => {
  return (
    <div className="h-screen w-full">
      <img src={image} alt={title} />
    </div>
  );
};

export default Slides;
