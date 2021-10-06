import React, { useContext, useState, useEffect }  from "react";
import UserContext from "../auth/UserContext";


function JobCard({ id, title, salary, equity, companyName }) {
    console.debug("JobCard");
    
    const { hasAppliedToJob, applyToJob } = useContext(UserContext);
    const [applied, setApplied] = useState();

    useEffect(() => {
        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);


    return (
        <div>
            <h4>{title}</h4>
            <p>{companyName}</p>
            {salary && <div>{salary}</div>}
            {equity !== undefined && <div>{equity}</div>}

            <p>{applied ? "Applied" : "Apply"}</p>
        </div>

    );
};

export default JobCard;