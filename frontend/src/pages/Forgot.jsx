import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function Forgot() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [inputValue, setInputValue] = useState({ email: "", otp: "", password: "" });
    const [otpSent, setOtpSent] = useState(false);
    const [otpValidated, setOtpValidated] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const verifyCookie = async () => {
            if (cookies.token) {
                navigate("/");
            }
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const { email, otp, password } = inputValue;

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (!otpSent) {
                const { data } = await axios.post("http://localhost:5000/api/auth/forgotpass", { email });
                const { success, message } = data;
                if (success) {
                    handleSuccess(message);
                    setOtpSent(true);
                } else {
                    handleError(message);
                }
            } else if (!otpValidated) {
                const { data } = await axios.post("http://localhost:5000/api/auth/validateOtp", { email, otp });
                const { success, message } = data;
                if (success) {
                    handleSuccess(message);
                    setOtpValidated(true);
                } else {
                    handleError(message);
                }
            } else {
                const { data } = await axios.post("http://localhost:5000/api/auth/resetPassword", { email, password });
                const { success, message } = data;
                if (success) {
                    handleSuccess(message);
                    navigate("/login");
                } else {
                    handleError(message);
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setError("User with this email does not exist");
                } else {
                    handleError(error.response.data.message || 'An error occurred');
                }
            } else {
                handleError('Failed to communicate with server');
            }
        }
    };

    const handleError = (err) => toast.error(err, { position: "bottom-left" });
    const handleSuccess = (msg) => toast.success(msg, { position: "bottom-left" });

    return (
        <div className="forgot">
            <div className="form_container">
                <h2>{otpValidated ? "Reset Password" : otpSent ? "Enter OTP" : "Forgot Password"}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type="email"
                            name='email'
                            value={email}
                            placeholder='Enter your email'
                            onChange={handleOnChange}
                            autoComplete='true'
                            disabled={otpSent}
                        />
                    </div>
                    {otpSent && !otpValidated && (
                        <div>
                            <label htmlFor='otp'>OTP</label>
                            <input
                                type="text"
                                name='otp'
                                value={otp}
                                placeholder='Enter OTP'
                                onChange={handleOnChange}
                                autoComplete='true'
                            />
                        </div>
                    )}
                    {otpValidated && (
                        <div>
                            <label htmlFor='password'>New Password</label>
                            <input
                                type="password"
                                name='password'
                                value={password}
                                placeholder='Enter new password'
                                onChange={handleOnChange}
                                autoComplete='true'
                            />
                        </div>
                    )}
                    <button type="submit">
                        {otpValidated ? "Reset Password" : otpSent ? "Validate OTP" : "Submit"}
                    </button>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <a className="text-red-600 mt-1" href="/login">Login</a>
            </div>
        </div>
    );
}

export default Forgot;
