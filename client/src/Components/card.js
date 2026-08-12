import React from "react";

function Card({ header, title, text, body }) {
  return (
    <div className="bank-card">
      {header && <div className="account-label">{header}</div>}
      {title && <h2>{title}</h2>}
      {text && <p>{text}</p>}
      {body}
    </div>
  );
}

export default Card;