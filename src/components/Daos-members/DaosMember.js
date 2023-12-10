import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Daos-members/DaosMember.css";
import { data } from "../../dummyData/DaosMember.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import arrow from "../../assests/arrow.png";
import Footer from "../footer/Footer.js";
import call from "../../assests/call.mp4";
import Chatbot from "./Chatbot.js";

function DaosMember() {
  const location = useLocation();
  const [singleApi, setSingleApi] = useState();
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();
  const [isAppInfoOpen, setIsAppInfoOpen] = useState(true);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("delegate");

  const openAppInfo = () => {
    setIsAppInfoOpen(true);
    setIsDocumentOpen(false);
    setActiveButton("delegate");
  };
  const openDocumentation = () => {
    setIsAppInfoOpen(false);
    setIsDocumentOpen(true);
    setActiveButton("hour");
  };

  useEffect(() => {
    if (location.state.data) {
      console.log(location.state.data);
      setSingleApi(location.state.data);
    }
  }, [location]);

  return (
    <div style={{ textAlign: "start", margin: "20px" }}>
      <div className="single-dao">
        {singleApi && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <img
                src={singleApi.image_url}
                alt={singleApi.name}
                style={{ width: "60px", borderRadius: "50px" }}
              />
              <h2
                style={{
                  padding: "10px 30px",
                  fontSize: "1.5rem",
                  letterSpacing: "1.5px",
                }}
              >
                {singleApi.name}
              </h2>
            </div>
            <div
              style={{
                fontSize: "16px",
                lineHeight: "1.5rem",
                marginLeft: "90px",
              }}
            >
              {singleApi.description}
            </div>
          </>
        )}
      </div>
      <div style={{ margin: "30px auto", display: "flex", width: "75%" }}>
        <button
          onClick={openAppInfo}
          className="listapi-tabBtn"
          style={{
            color: activeButton === "delegate" ? "#b0f127" : "white",
            "--tw-text-opacity": 1,
            borderBottom:
              activeButton === "delegate"
                ? "1px solid #b0f127"
                : "1px solid white",

            background: activeButton === "delegate" ? "none" : "none",
          }}
        >
          Delegates
        </button>
        <button
          onClick={openDocumentation}
          className="listapi-tabBtn"
          style={{
            color: activeButton === "hour" ? "#b0f127" : "white",
            "--tw-text-opacity": 1,
            borderBottom:
              activeButton === "hour" ? "1px solid #b0f127" : "1px solid white",

            background: activeButton === "hour" ? "none" : "none",
            margin: "0px 20px",
          }}
        >
          Office Hours
        </button>
      </div>
      <div className="dashboard-main">
        {singleApi && (
          <>
            {isAppInfoOpen && (
              <div
                className="dashboard-main"
                style={{ width: "75%", margin: "0 auto" }}
              >
                <div className="api-grid-profile">
                  {data.map((dao, index) => (
                    <div
                      key={dao.id}
                      className="api-card-member"
                      onClick={() =>
                        navigate("/member-profile", { state: { data: dao } })
                      }
                    >
                      <div className="dao-flex">
                        <img src={dao.image_url} className="api-image-member" />
                        <h2 className="api-name-member">{dao.name}</h2>
                      </div>

                      <p
                        className="description-member"
                        style={{ padding: "10px 10px 0px 10px" }}
                      >
                        {dao.description}
                      </p>

                      <div
                        style={{ width: "100%", padding: "0px 50px 0px 0px" }}
                      >
                        <div
                          class="btn btn-primary-member "
                          onClick={() =>
                            navigate("/member-profile", {
                              state: { data: dao },
                            })
                          }
                        >
                          View More...
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {isDocumentOpen && (
              <div
                className="dashboard-main"
                style={{ width: "75%", margin: "0 auto" }}
              >
                <div className="api-grid-member">
                  {data.map((dao, index) => (
                    <div
                      class="api-card-office"
                      style={{
                        padding: "20px",
                        marginTop: "0px",
                        flexDirection: "row",
                      }}
                    >
                      {/* <video  src={dao.image_url} class="card-img-top" alt="..."/> */}
                      {/* <video  src={call} ></video> */}
                      <video width="300" controls class="card-img-top">
                        <source src={call} type="video/mp4" />
                      </video>

                      <div class="card-body profile-card">
                        <h5 class="card-title" style={{ letterSpacing: "1px" }}>
                          {dao.name}
                        </h5>
                        <p
                          class="card-text description"
                          style={{
                            textAlign: "left",
                            padding: "0px",
                            letterSpacing: "1px",
                          }}
                        >
                          Plutus is a delegate for Arbitrum & Optimism. Plutus
                          Office Hour is every 14 days.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        <div className="api-grid-member">
          {/* {data.map((dao, index) => (
            <div
            key={dao.id}
              className="api-card-member"
              onClick={() => navigate("/member-profile", { state: { data: dao } })}
            >
              <div className="dao-flex">
                <img
                  src={dao.image_url}
                  className="api-image-member"
                />
                <h2 className="api-name-member">
                  {dao.name}
                </h2>
              </div>
             
                <p className="description-member">
                  {dao.description}
                </p>
            
              <div style={{width:"100%",padding:"0px 50px"}}>
              <div class="btn btn-primary-member "  onClick={() => navigate("/member-profile", { state: { data: dao } })}>View More...</div></div>
            </div>
            
          ))} */}
        </div>
      </div>

      {/* <Chatbot /> */}
    </div>
  );
}

export default DaosMember;
