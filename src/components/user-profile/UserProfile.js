import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../member-profile/MemberProfile.css";
import cel from "../../assests/event.png";
// import Calendar from 'react-calendar';
// import { data } from "../../dummyData/OfficeHours";
// import { data2 } from "../../dummyData/PastCall";
import User from "../../assests/user.png";
import { Link } from "react-router-dom";
import arrow from "../../assests/arrow.png";
import Footer from "../footer/Footer";

function UserProfile(props) {
  const location = useLocation();
  const [singleApi, setSingleApi] = useState();
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [isAppInfoOpen, setIsAppInfoOpen] = useState(true);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("hours");

  const openAppInfo = () => {
    setIsAppInfoOpen(true);
    setIsDocumentOpen(false);
    setActiveButton("hours");
  };
  const openDocumentation = () => {
    setIsAppInfoOpen(false);
    setIsDocumentOpen(true);
    setActiveButton("call");
  };
  const openPricing = () => {
    setIsAppInfoOpen(false);
    setIsDocumentOpen(false);
    setIsPricingOpen(true);
  };

  function truncateAddress(address) {
    if (address.length <= 3) {
      return address;
    }
    const start = address.slice(0, 10);
    const end = address.slice(-3);
    return `${start}...${end}`;
  }

  const [isDateTimePickerOpen, setDateTimePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handleCelClick = () => {
    setDateTimePickerOpen(!isDateTimePickerOpen);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <div class="container">
        <div class="row">
          {/* <Link to="/all-daos">
        <div
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            margin:"20px auto",
            width:"100%",
            cursor: "pointer",
            // padding:"0px 10px"
          }}
        >
          <img
            src={arrow}
            style={{
              // transform: "rotate(180deg)",
              width: "25px",
              margin:"0px 10px"
            }}
          ></img>
          Back
        </div>
      </Link> */}
          <div class="col-md-3 profile-left">
            <div className="single-dao-profile">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                <img
                  src={User}
                  alt={""}
                  style={{
                    width: "80px",
                    borderRadius: "50px",
                    backgroundColor: "white",
                  }}
                />
                <h2 style={{ padding: "20px", fontSize: "2rem" }}>User1</h2>
              </div>
              <div className="delegate-bio">
                <div
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.5rem",
                    textAlign: "left",
                    padding: "5px",
                  }}
                >
                  Received Delegations: 35068
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.5rem",
                    textAlign: "left",
                    padding: "5px",
                  }}
                >
                  Voting power: 25.32M
                </div>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      fontSize: "13px",
                      lineHeight: "1.5rem",
                      textAlign: "left",
                      padding: "5px",
                    }}
                  >
                    Wallet address:
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      lineHeight: "1.5rem",
                      textAlign: "left",
                      padding: "5px",
                    }}
                  >
                    {" "}
                    {truncateAddress(
                      "0x257f25B70Baf79a846D54a8B41e7bE4A0b004e9F"
                    )}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.5rem",
                    textAlign: "left",
                    padding: "5px",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipiscing elit at
                  pharetra nec sed erat non metus suspendisse mus non lectus vel
                  vitae massa id in in turpis posuere laoreet tortor.
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-9 mp-sec2">
            <h1 style={{ padding: "10px 0px" }}>Ready, set, mentor! 🚀</h1>
            <div style={{ padding: "10px 0px", fontSize: "20px" }}>
              You've completed X hours of mentoring.
            </div>
            <div
              style={{
                padding: "10px 0px",
                letterSpacing: "1px",
                fontSize: "15px",
              }}
            >
              Set Your Availability{" "}
              <img
                src={cel}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "5px",
                  width: "40px",
                }}
                onClick={handleCelClick}
              ></img>
              <div>
                {isDateTimePickerOpen && (
                  <input
                    type="datetime-local"
                    value={selectedDate}
                    onChange={handleDateChange}
                    style={{
                      marginTop: "20px",
                    }}
                  />
                )}
              </div>
            </div>
            <div style={{ margin: "30px 0px", display: "flex" }}>
              <button
                onClick={openAppInfo}
                className="listapi-tabBtn"
                style={{
                  color: activeButton === "hours" ? "#b0f127" : "white",
                  "--tw-text-opacity": 1,
                  borderBottom:
                    activeButton === "hours"
                      ? "1px solid #b0f127"
                      : "1px solid white",

                  background: activeButton === "hours" ? "none" : "none",
                }}
              >
                Office Hours
              </button>
              <button
                onClick={openDocumentation}
                className="listapi-tabBtn"
                style={{
                  color: activeButton === "call" ? "#b0f127" : "white",
                  "--tw-text-opacity": 1,
                  borderBottom:
                    activeButton === "call"
                      ? "1px solid #b0f127"
                      : "1px solid white",

                  background: activeButton === "call" ? "none" : "none",
                  margin: "0px 20px",
                }}
              >
                Past Calls
              </button>
            </div>

            {isAppInfoOpen && (
              <div className="dashboard-main">
                <div className="api-grid-profile">
                  {data.map((dao, index) => (
                    <div
                      class="api-card"
                      style={{ padding: "0px", marginTop: "0px" }}
                    >
                      <video width="300" controls class="card-img-top">
                        <source src={dao.image_url} type="video/mp4" />
                      </video>

                      <div class="card-body profile-card">
                        <h5 class="card-title">{dao.name}</h5>
                        <p
                          class="card-text description"
                          style={{ textAlign: "left", padding: "0px" }}
                        >
                          {dao.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {isDocumentOpen && (
              <div className="dashboard-main">
                <div className="api-grid-profile">
                  {data2.map((dao, index) => (
                    <div
                      class="api-card"
                      style={{ padding: "0px", marginTop: "0px" }}
                    >
                      <video width="300" controls class="card-img-top">
                        <source src={dao.image_url} type="video/mp4" />
                      </video>
                      <div class="card-body profile-card">
                        <h5 class="card-title">{dao.name}</h5>
                        <p
                          class="card-text description"
                          style={{ textAlign: "left", padding: "0px" }}
                        >
                          {dao.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default UserProfile;
