import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
import "./JobCard.css";


function JobCard({ id, title, salary, equity, companyName }) {
    console.debug("JobCard");

    const { hasAppliedToJob, applyToJob } = useContext(UserContext);
    const [applied, setApplied] = useState();

    useEffect(() => {
        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);

    async function handleApply(evt) {
        if (hasAppliedToJob(id)) return;
        applyToJob(id);
        setApplied(true);
    };

    return (
        <div className="JobCard">
            <h4 className="JobCard-title">{title}</h4>
            <p className="JobCard-company">{companyName}</p>
            {salary && <div className="JobCard-salary">Salary: {formatSalary(salary)}</div>}
            <div className="JobCard-equity">Equity: {formatEquity(equity)}</div>
                <button
                    className={!applied ? "Button" : "Button Disabled" }
                    disabled={applied}
                    onClick={handleApply}
                >
                    {applied ? "Applied" : "Apply"}
                </button>
        </div>
    );
};


function formatSalary(salary) {
    const commaSalary = [];
    const salaryString = salary.toString().split("").reverse();

    for (let i = 0; i < salaryString.length; i++) {
        commaSalary.push(salaryString[i]);
        if ((i + 1) % 3 === 0 && (i + 1) < salaryString.length) commaSalary.push(',');
    };

    return `$${commaSalary.reverse().join("")}`;
};


function formatEquity(equity) {
    if (equity === null) return "n/a";
    if (equity === 0 || equity === "0") return "none";
    return `${parseFloat(equity)}%`;
};


export default JobCard;