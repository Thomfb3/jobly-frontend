import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import JobCardList from "./JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";


function JobList() {
    console.debug("JobList");

    const [jobs, setJobs] = useState(null);

    async function getJobs() {
        let jobs = await JoblyApi.getJobs();
        setJobs(jobs);
    }

    useEffect(() => {
        getJobs();
    }, []);


    if (!jobs) return <LoadingSpinner />;

    return (
        <div> 
            {jobs.length 
                ? <JobCardList jobs={jobs} />
                : <p>No Jobs found!</p>
            }
        </div>
    );
};

export default JobList;