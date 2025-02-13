import React from "react";
import "../assets/css/Card.css";

const Card = ({ image, title, description, link }) => {
  return (
    <article className="card">
      <img src={image} alt={title} />
      <div className="card__body">
        <h3 className="tit">{title}</h3>
        <p className="desc">{description}</p>
        <a className="btn" href={link}>
          바로가기 →
        </a>
      </div>
    </article>
  );
};

export default Card;
