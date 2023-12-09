import React from 'react';
import { useLocation } from "react-router-dom";
import { useState,useEffect } from 'react';
import "../Daos-members/DaosMember.css"
import { data } from "../../dummyData/DaosMember.js";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import arrow from "../../assests/arrow.png"
import Footer from '../footer/Footer.js';

function DaosMember() {
    const location = useLocation();
  const [singleApi, setSingleApi] = useState();
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state.data) {
      console.log(location.state.data);
      setSingleApi(location.state.data);
    }
  }, [location]);

    return (
        <div style={{ textAlign: "start", margin: "20px" }}>
           
    <div className='single-dao'>
        {singleApi && (
          <>
          <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}>
            <img
              src={singleApi.image_url}
              alt={singleApi.name}
              style={{ width: "60px",borderRadius:"50px"}}
            />
            <h2 style={{ padding: "10px 30px", fontSize: "1.5rem",letterSpacing:"1.5px" }}>
              {singleApi.name}
            </h2></div>
            <div style={{fontSize:"16px",lineHeight:"1.5rem",marginLeft:"90px"}}>
              {singleApi.description}
            </div>
          </>
        )}
      </div>
      <div className="dashboard-main">
        <div style={{width:"75%",margin:"20px auto",fontWeight:"700",letterSpacing:"1.5px"}}>Daos Delegates</div>
        <div className="api-grid-member">
          {data.map((dao, index) => (
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
            
          ))}
        </div>
      </div>
      <Footer/>
        </div>
    );
}

export default DaosMember;