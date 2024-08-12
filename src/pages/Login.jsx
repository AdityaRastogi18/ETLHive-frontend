import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Api from "../services/Api";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "../contexts/authContext";
import { useHistory } from "react-router-dom";
import BtnLoader from "../components/BtnLoader";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const { login } = useAuth();

  const navigate = useHistory();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const updateFormData = (e, field) => {
    setErrors({ ...errors, [field]: "" });
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleValidation = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const mutation = useMutation(
    async () => {
      const urlEncodedData = new URLSearchParams(formData).toString();
      const response = await Api.login(urlEncodedData);
      return response;
    },
    {
      onSuccess: (data) => {
        login(data.token, data);
        navigate.push("/home");
      },
      onError: (error) => {
        console.error("Login error:", error);
      },
    }
  );

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = handleValidation();
    if (Object.keys(newErrors).length === 0) {
      mutation.mutate();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm lg:max-w-md">
      <img
        src="/images/ETLHiveLogo.png"
        alt="ETLHiveLogo"
        className="h-14 w-2/4 mb-6"
      />
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="label">
            Enter your username <span className="text-purple-500">*</span>
          </label>
          <input
            type="username"
            placeholder="Aditya12"
            className={`form-input w-full px-3 py-2 border rounded-lg ${
              errors.username ? "border-purple-500" : ""
            }`}
            value={formData.username}
            onChange={(e) => updateFormData(e, "username")}
          />
          {errors.username && <p className="error-msg">{errors.username}</p>}
        </div>
        <div className="mb-6 ">
          <div className="relative">
            <label className="label">
              Password <span className="text-purple-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`form-input w-full px-3 py-2 border rounded-lg pr-10 ${
                errors.password ? "border-purple-500" : ""
              }`}
              value={formData.password}
              onChange={(e) => updateFormData(e, "password")}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute bottom-0 right-0 flex items-center pr-3 h-[44px]"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.password && <p className="error-msg">{errors.password}</p>}
          <div className="w-full text-right">
            <button
              onClick={() => navigate.push("/forgot-password")}
              className="text-purple-500  hover:text-purple-600 text-sm font-semibold  mt-2"
            >
              Forgot Password?
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="btn bg-purple-600 hover:bg-purple-800 w-full text-center"
          >
            {mutation.isLoading ? <BtnLoader /> : "Login"}
          </button>
        </div>
        <div className="flex items-center gap-1 justify-center mt-5">
          Don't have an account?
          <a href="/signup" className="link">
            Sign Up!
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
