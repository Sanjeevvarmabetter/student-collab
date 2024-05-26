import React from 'react';
import Slider from 'react-slick';
import Card from './components/Card';

const CardSlider = ({ subjects, subjectCovers }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {subjects.map(subject => (
          <Card key={subject} subject={subject} cover={subjectCovers[subject]} />
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
