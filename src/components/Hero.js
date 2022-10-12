import React from "react";
import hero from "../images/hero.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-grid">
        <article className="hero__info">
          <h1 className="hero__title">
            Get Things
            <br />
            <span className="italic-strikethrough">Done</span>
          </h1>
          <p className="hero__subtitle">
            A Notion.so clone made for learning purposes. Let me know your
            thoughts below.
          </p>
          <div className="hero__cta-buttons">
            <button className="btn btn--signup">Sign Up</button>
            <Link to="demo" className="btn btn--login">
              Demo
            </Link>
          </div>
        </article>
        <img src={hero} className="hero__img" alt="illustation" />
      </div>
    </section>
  );
};

export default Hero;
