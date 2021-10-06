import React, { useState } from "react";
import { useHistory } from "react-router-dom";


function LoginForm({ login }) {
    const history = useHistory();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [formErrors, setFormErrors] = useState([]);

    console.debug(
        "LoginForm",
        "login=", typeof login,
        "formData=", formData,
        "formErrors", formErrors,
    );

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);

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
            Login Form
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

                {formErrors.length ? <p>{formErrors}</p> : null}

                <button
                    type="submit"
                    onSubmit={handleSubmit}
                >
                    Login
                </button>

            </form>
        </div>
    );
};

export default LoginForm;