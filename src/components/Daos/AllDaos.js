import React, { useEffect, useState } from "react";
import { data } from "../../dummyData/AllDaos.js";
import "../Daos/AllDaos.css";
import { useNavigate } from "react-router-dom";
import dao1 from "../../assests/dao1.jpg"
import Footer from "../footer/Footer.js";

function AllDaos() {
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();

  return (
    <>
      <div className="dashboard-main">
        <div className="explore-dao">
          <div style={{fontSize:"15px"}}>
            Explore DAOs
          </div>
        </div>
        <div className="api-grid">
          {data.map((dao, index) => (
            
              <div class="api-card" >
  <img  src={dao.image_url} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{dao.name}</h5>
    <p class="card-text description">{dao.description}</p>
    <a class="btn btn-primary "  onClick={() => navigate("/daos-member", { state: { data: dao } })}>View More</a>
  </div>
</div>
           
          ))}
        </div>
       
      </div>
      <Footer/>
    </>
  );
}

export default AllDaos;
