import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";


function CompanyList() {
    console.debug("CompanyList");

    const [companies, setCompanies] = useState(null);

    async function getCompanies(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    useEffect(() => {
        getCompanies();
    }, []);


    if (!companies) return <LoadingSpinner />;
     
    return (
        <div> 
            {companies.length ? (
                <div>
                  {companies.map(c => (
                    <CompanyCard 
                        key={c.handle}
                        handle={c.handle}
                        name={c.name}
                        description={c.description}
                        logoUrl={c.logoUrl}
            
                    />
                  ))}
                </div>
                ) : (
                    <p>No Companies found!</p>
            )}
        </div>
    );
};

export default CompanyList;