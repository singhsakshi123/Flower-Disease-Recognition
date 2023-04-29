import React from "react";
import "./Home.css";
import logo from "./img/logo1.png";

function Home() {
  // fixed Header
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    header.classList.toggle("active", window.scrollY > 0);
  });
  return (
    <div className="home" id="Home">
      <div className="home__bg">
        <div className="header d__flex align__items__center pxy__30">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="navigation pxy__30">
            <ul className="navbar d__flex">
              <a href="#Home">
                <li className="nav__items mx__15">Home</li>
              </a>
              <a href="#About">
                <li className="nav__items mx__15">About Us</li>
              </a>
              <a href="#Services">
                <li className="nav__items mx__15">Our Service</li>
              </a>
            </ul>
          </div>
        </div>
        {/* HOME CONTENT */}
        <div className="container">
          <div className="home__content">
            <div className="home__meta">
              <h2 className="home__text pz__10">All great changes are</h2>
              <h3 className="home__text sweet pz__10">preceded by chaos</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
