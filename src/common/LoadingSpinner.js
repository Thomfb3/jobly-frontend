import React from "react";
import "./LoadingSpinner.css";

/** Loading  */

function LoadingSpinner() {
  return (
      <div>
        <div className="LoadingSpinner"></div>
        <p className="LoadingSpinner-message">Loading...</p>
      </div>

  );
}

export default LoadingSpinner;