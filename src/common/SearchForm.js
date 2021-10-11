import React, { useState } from "react";
import "./SearchForm.css"


function SearchForm({ searchFor }) {
    console.debug("SearchForm", "searchFor=", typeof searchFor);

    const [searchTerm, setSearchTerm] = useState("");

    function handleSubmit(evt) {
        evt.preventDefault();
        searchFor(searchTerm || undefined);
        setSearchTerm(searchTerm)
    };

    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    };

    return (
        <div className="SearchForm-container">
            <form SearchForm="SearchForm" onSubmit={handleSubmit}>
                <div className="SearchForm-group">
                    <button className="Button" type="submit">Search</button>
                
                    <input
                        className="SearchForm-input"
                        name="searchTerm"
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </div>
            </form>
        </div>
    );
};


export default SearchForm;

