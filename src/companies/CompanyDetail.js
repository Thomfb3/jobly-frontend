import React, { useEffect, useState }from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import JobCardList from "../jobs/JobCardList";
import "./CompanyDetail.css";



function CompanyDetail() {
    const { handle } = useParams();
    console.debug("CompanyCard", "handle=", handle );

    const [company, setCompany] = useState(null);

    useEffect(() => {
        async function getCompany() {
            setCompany(await JoblyApi.getCompany(handle));
        };

        getCompany();
    }, [handle]);

    if (!company) return <LoadingSpinner />;

    return (
        <div className="CompanyDetail">
            <h4 className="CompanyDetail-name">{company.name}</h4>
            <p className="CompanyDetail-description">{company.description}</p>
            <JobCardList jobs={company.jobs} />
        </div>
    );
};


export default CompanyDetail;