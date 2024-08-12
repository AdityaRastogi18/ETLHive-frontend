import React, { useState, useEffect } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Api from "../services/Api";
import { useMutation } from "react-query";
import { useAuth } from "../contexts/authContext";
import { useHistory } from "react-router-dom";
import BtnLoader from "../components/BtnLoader";
import PasswordValidation from "../components/PasswordValidation";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
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

  useEffect(() => {
    const { password } = formData;
    setPasswordValidation({
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasMinLength: password.length >= 7,
    });
  }, [formData.password]);

  const handleValidation = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (Object.values(passwordValidation).includes(false)) {
      newErrors.password = "Password does not meet all the criteria";
    }
    return newErrors;
  };

  const mutation = useMutation(
    async () => {
      const urlEncodedData = new URLSearchParams(formData).toString();
      const response = await Api.signup(urlEncodedData);
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newErrors = handleValidation();
    if (Object.keys(newErrors).length === 0) {
      mutation.mutate();
    } else {
      setErrors(newErrors);
    }
  };

  const allRulesPassed = Object.values(passwordValidation).every(Boolean);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm lg:max-w-md">
      <img
        src="/images/ETLHiveLogo.png"
        alt="ETLHiveLogo"
        className="h-14 w-2/4 mb-6"
      />
      <form>
        <div className="mb-4">
          <label className="block label">
            Enter your username <span className="text-purple-500">*</span>
          </label>
          <input
            type="username"
            placeholder="Aditya123"
            className="form-input"
            value={formData.username}
            onChange={(e) => updateFormData(e, "username")}
          />
          {errors.username && <p className="error-msg">{errors.username}</p>}
        </div>
        <div className="mb-4">
          <label className="block label">
            Enter your email <span className="text-purple-500">*</span>
          </label>
          <input
            type="email"
            placeholder="xyz@gmail.com"
            className="form-input"
            value={formData.email}
            onChange={(e) => updateFormData(e, "email")}
          />
          {errors.email && <p className="error-msg">{errors.email}</p>}
        </div>
        <div className="mb-6">
          <div className="relative">
            <label className="block label">
              Password <span className="text-purple-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="form-input pr-10"
              value={formData.password}
              onChange={(e) => updateFormData(e, "password")}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute bottom-0 right-0 flex items-center pr-3 h-[42px]"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.password && <p className="error-msg">{errors.password}</p>}
        </div>
        {!allRulesPassed && (
          <PasswordValidation
            validationRules={{
              "1 Uppercase letter": passwordValidation.hasUpperCase,
              "1 Lowercase letter": passwordValidation.hasLowerCase,
              "1 Number": passwordValidation.hasNumber,
              "1 Special character": passwordValidation.hasSpecialChar,
              "Minimum 7 characters": passwordValidation.hasMinLength,
            }}
          />
        )}
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="btn bg-purple-600 hover:bg-purple-800 w-full"
            onClick={handleSignUp}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? <BtnLoader /> : "Sign Up"}
          </button>
        </div>
        <div className="flex items-center gap-1 justify-center mt-5">
          Already have an account?
          <a href="/login" className="link">
            Login!
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
