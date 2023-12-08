import React from "react";
import { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();
  const handleDashboardNavigation = () => {};

  const handleBeforeChange = (current, next) => {
    setActiveIndex(next);
  };
  const slickSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    dots: true,
    speed: 300,
    centerPadding: "20px",
    infinite: true,
    autoplaySpeed: 3000,
    autoplay: true,
    beforeChange: handleBeforeChange,
  };

  return (
    <div>
      <div className="home-sec1">
        <h1>
          Buy and trade cryptos like never{" "}
          <span style={{ color: "#a6ff35" }}>before</span>.
        </h1>
        <div className="home-pera">
          Lorem ipsum dolor sit amet consectetur adipiscing elit at pharetra nec
          sed erat non metus suspendisse mus non lectus vel vitae massa id in in
          turpis posuere laoreet tortor.
        </div>
        <button
          id="button-7"
          className="home-button"
          onClick={() => handleDashboardNavigation()}
        >
          Explore DOAs
          <div id="dub-arrow"></div>
        </button>
      </div>
      <section
        className="homepage-secion3-main-template"
        smooth={true}
        duration={200}
      >
        <div style={{ margin: "50px 0px" }}>
          <h1>Our approch</h1>
          <div>
            As a governance delegate, we hold the following core values...
          </div>
        </div>

        <Slider {...slickSettings}>
          <div className={activeIndex === 0 ? "slick-active" : ""}>
            <div className="section3-card">
              <h1 className="section3-card-title">
                Transparency & Open Communication
              </h1>

              <p className="section3-card-desc">
                We believe in being open about our decision-making process and
                keeping the community informed about any proposals or issues we
                discuss.
              </p>
            </div>
          </div>
          <div className={activeIndex === 1 ? "slick-active" : ""}>
            <div className="section3-card">
              <h1 className="section3-card-title">Community Focus</h1>

              <p className="section3-card-desc">
                Our top priority is to always consider the community's needs and
                interests in every decision we make.
              </p>
            </div>
          </div>
          <div className={activeIndex === 2 ? "slick-active" : ""}>
            <div className="section3-card">
              <h1 className="section3-card-title">Accountability</h1>

              <p className="section3-card-desc">
                We value accountability and are always open to feedback, which
                helps us continually improve and better serve our community.
              </p>
            </div>
          </div>
          <div className={activeIndex === 3 ? "slick-active" : ""}>
            <div className="section3-card">
              <h1 className="section3-card-title">Inclusiveness</h1>

              <p className="section3-card-desc">
                We're committed to fostering a diverse and inclusive
                environment, where everyone's voice is heard, regardless of
                their background or experience.
              </p>
            </div>
          </div>
        </Slider>
      </section>
    </div>
  );
}

export default Home;
