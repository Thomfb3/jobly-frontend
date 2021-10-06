import React from "react";
import { Link } from "react-router-dom";

function CompanyCard({ name, description, logoUrl, handle }) {
    console.debug("CompanyCard");

    return (
        <Link to={`/companies/${handle}`}>
            <div>
                <div>
                    <h4>{name}</h4>
                    <div>{logoUrl && <img src={logoUrl} alt={name} /> }</div>
                </div>
                <p>{description}</p>
            </div>
        </Link>
    );
};


export default CompanyCard;