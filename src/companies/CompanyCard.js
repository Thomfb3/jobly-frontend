import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

function CompanyCard({ name, description, logoUrl, handle }) {
    console.debug("CompanyCard");

    return (
        <Link className="CompanyCard" to={`/companies/${handle}`}>
            <div className="CompanyCard-card">
            <div className="CompanyCard-company-logo">{logoUrl && <img className="CompanyCard-company-logo-image" src={logoUrl} alt={name} /> }</div>
                <div className="CompanyCard-company">
                    <h4 className="CompanyCard-company-name">{name}</h4>
                    <p className="CompanyCard-company-description">{description}</p>
                </div>
            </div>
        </Link>
    );
};


export default CompanyCard;

