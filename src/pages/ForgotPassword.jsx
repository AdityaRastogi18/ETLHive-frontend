import React, { useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

import BtnLoader from "../components/BtnLoader";
import ErrorScreen from "../components/ErrorScreen";
import Api from "../services/Api";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [emailSent, setEmailSent] = useState(false);

  const navigate = useHistory();

  const updateFormData = (e, field) => {
    setErrors({ ...errors, [field]: "" });
    setFormData({ ...formData, [field]: e.target.value });
  };

  const goBack = () => {
    setEmailSent(false);
    navigate.push("/home");
  };

  const handleValidation = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    return newErrors;
  };

  const mutation = useMutation(
    async () => {
      const response = await Api.forgotPassword({ email: formData.email });
      return response;
    },
    {
      onSuccess: () => {
        setEmailSent(true);
      },
      onError: (error) => {
        console.error("Error:", error);
        return <ErrorScreen />;
      },
    }
  );

  const handleSubmit = (e) => {
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
      {emailSent ? (
        <div className="flex items-center justify-center">
          <div className="bg-green-100 text-green-800 border border-green-200 rounded-lg p-6 shadow-md text-center max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Check Your Email</h2>
            <p className="text-lg">
              We've sent a password reset link to your email address. Please
              check your inbox and follow the instructions to reset your
              password.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="label">
              Enter your email <span className="text-purple-500">*</span>
            </label>
            <input
              type="email"
              placeholder="xyz@gmail.com"
              className={`form-input w-full px-3 py-2 border rounded-lg ${
                errors.email ? "border-purple-500" : ""
              }`}
              value={formData.email}
              onChange={(e) => updateFormData(e, "email")}
            />
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="btn bg-purple-600 hover:bg-purple-800 w-full text-center"
            >
              {mutation.isLoading ? <BtnLoader /> : "Send Email"}
            </button>
          </div>
        </form>
      )}
      <div className="flex items-center gap-1 justify-center mt-5">
        <button
          onClick={() => navigate.push("/home")}
          className="text-purple-400  hover:text-purple-500 font-bold"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
