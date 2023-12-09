import React, { useState, useEffect } from "react";
import { data } from "../../dummyData/AllDaos.js";
import "../Daos/AllDaos.css";
import { useNavigate } from "react-router-dom";
import dao1 from "../../assests/dao1.jpg";
import Footer from "../footer/Footer.js";

function AllDaos() {
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    // Update filteredData when searchInput or data changes
    const results = data.filter((dao) =>
      dao.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(results);
  }, [searchInput, data]);

  return (
    <>
      <div className="dashboard-main">
        <div className="explore-dao">
          <div className="search-container">
            <span className="search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#b0f127"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="20px"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search DAOs"
              className="search-input"
            />
          </div>
        </div>
        <div className="api-grid">
          {filteredData.map((dao, index) => (
            <div class="api-card" key={index}>
              <img src={dao.image_url} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{dao.name}</h5>
                <p class="card-text description">{dao.description}</p>
                <a
                  class="btn btn-primary "
                  onClick={() =>
                    navigate("/daos-member", { state: { data: dao } })
                  }
                >
                  View More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllDaos;
