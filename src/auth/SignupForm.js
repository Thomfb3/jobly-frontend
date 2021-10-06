import React, { useState } from "react";
import { useHistory } from "react-router-dom";


function SignupForm({ signup }) {
    const history = useHistory();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });

    const [formErrors, setFormErrors] = useState([]);


    console.debug(
        "SignupForm",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors", formErrors,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await signup(formData);
        if (result.success) {
            history.push("/companies");
        } else {
            setFormErrors(result.errors);
        };
    };


    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    };


    return (
        <div>
            Signup Form
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <label htmlFor="firstName">First Name</label>
                <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                {formErrors.length ? <p>{formErrors}</p> : null}

                <button
                    type="submit"
                    onSubmit={handleSubmit}
                >
                    Register
                </button>

            </form>
        </div>
    );
};

export default SignupForm;