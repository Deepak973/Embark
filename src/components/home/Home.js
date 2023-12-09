import React from "react";
import { useState } from "react";
import arrow from "../../assests/right-arrow.png";
import "../home/Home.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import AllDaos from "../Daos/AllDaos";
import img1 from "../../assests/filecoin.png";
import img2 from "../../assests/celo.jpg";
import img3 from "../../assests/safe.png";
import img8 from "../../assests/arbitrum.jpg";
import img5 from "../../assests/chainlink.jpg";
import img6 from "../../assests/xdc.webp";
import img7 from "../../assests/op.png";
import Footer from "../footer/Footer";

function Home() {
  const { address, isConnected, isDisconnected } = useAccount();
  const walletAddress = address;
  console.log(walletAddress);
  const navigate = useNavigate();
  const handleDashboardNavigation = () => {
    if (isConnected) {
      navigate("/all-daos");
    } else {
      alert("Please connect your wallet");
    }
  };
  const [activeIndex, setActiveIndex] = useState(0);

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
      <img src={img1} className="filecoin"></img>
      <img src={img2} className="celo"></img>
      <img src={img3} className="safe"></img>
      <img src={img8} className="arbitrum"></img>
      <img src={img5} className="chainlink"></img>
      <img src={img6} className="xdc"></img>
      <img src={img7} className="op"></img>
      <div className="home-sec1">
        <h1>
          Discover, learn & engage with{" "}
          <span style={{ color: "#a6ff35" }}>delegates</span>
        </h1>
        <div className="home-pera">
          Book a session to kick start your journey into DAOs & its governance.
          Catch up with delegates by tracking their Office hours at one placAOs
        </div>
        <button
          id="button-7"
          className="home-button"
          onClick={() => handleDashboardNavigation()}
        >
          Explore DAOs
          <div id="dub-arrow">
            <img src={arrow} />
          </div>
        </button>
      </div>
      <section
        className="homepage-secion3-main-template"
        smooth={true}
        duration={200}
      >
        <div style={{ margin: "50px 0px" }}>
          <h1 style={{ letterSpacing: "1px" }}>Why Embark?</h1>
          <div style={{ letterSpacing: "1px" }}>
            We will kick start your journey into DAOs faster than ever before...
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
      <Footer />
    </div>
  );
}

export default Home;
