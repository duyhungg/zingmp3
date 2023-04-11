import artist1 from "../assets/chi-dan.png";
import artist2 from "../assets/duc-phuc.png";
import artist3 from "../assets/erik.png";
import artist4 from "../assets/hoa-minzy.png";
import artist5 from "../assets/huong-ly.png";
import artist6 from "../assets/jack.png";
import artist7 from "../assets/justatee.png";
import artist8 from "../assets/mr-siro.png";
import artist9 from "../assets/onlyc.png";
import artist10 from "../assets/trinh-thanh-binh.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Artist() {
  const arrArtist = [
    artist1,
    artist2,
    artist3,
    artist4,
    artist5,
    artist6,
    artist7,
    artist8,
    artist9,
    artist10,
  ];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  return (
    <div className="px-[59px] w-full">
      <Slider {...settings}>
        {arrArtist.map((item, index) => (
          <div className="flex items-center justify-center " key={index}>
            <img
              src={item}
              className="object-contain hover:cursor-pointer hover:animate-scale-up-image"
              alt="item"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Artist;
