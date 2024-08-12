import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Api from "../services/Api";
import { useAuth } from "../contexts/authContext";
import ErrorScreen from "./ErrorScreen";

const sampleProducts = [
  { productName: "Nike Tshirt", productID: "31274" },
  { productName: "Nike Shoes", productID: "31275" },
  { productName: "Adidas Shoes", productID: "31276" },
  { productName: "Adidas Hoodie", productID: "31277" },
];

const CreateLeadModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    product: {
      productID: "",
      productName: "",
    },
  });

  const [errors, setErrors] = useState({});

  const { token } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      console.log("formDara", formData);
      const response = await Api.createLead(token, formData);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("leadsList");
        clearForm();
        onClose();
      },
      onError: (error) => {
        console.error("Error adding lead:", error);
      },
    }
  );

  const clearForm = () => {
    setFormData({
      name: "",
      number: "",
      email: "",
      product: {
        productID: "",
        productName: "",
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (e) => {
    const selectedProductID = e.target.value;
    const selectedProduct = sampleProducts.find(
      (product) => product.productID === selectedProductID
    );
    setFormData((prev) => ({
      ...prev,
      product: {
        productID: selectedProductID,
        productName: selectedProduct?.productName || "",
      },
    }));
  };

  const validateForm = () => {
    const { name, number, email, product } = formData;
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!number) newErrors.number = "Number is required";
    if (!email) newErrors.email = "Email is required";
    if (!product.productID) newErrors.product = "Product is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      mutation.mutate();
    } else {
      setErrors(validationErrors);
    }
  };

  const handleCancel = () => {
    clearForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <h2 className="text-2xl font-bold mb-4">Create Lead</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name <span className="text-purple-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? "border-purple-500" : ""}`}
            />
            {errors.name && (
              <p className="text-purple-500 text-xs italic">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Number <span className="text-purple-500">*</span>
            </label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className={`form-input ${
                errors.number ? "border-purple-500" : ""
              }`}
            />
            {errors.number && (
              <p className="text-purple-500 text-xs italic">{errors.number}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email <span className="text-purple-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${
                errors.email ? "border-purple-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-purple-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Product <span className="text-purple-500">*</span>
            </label>
            <select
              name="productID"
              value={formData.product.productID}
              onChange={handleProductChange}
              className={`form-input ${
                errors.product ? "border-purple-500" : ""
              }`}
            >
              <option value="">Select Product</option>
              {sampleProducts.map((product) => (
                <option key={product.productID} value={product.productID}>
                  {product.productName}
                </option>
              ))}
            </select>
            {errors.product && (
              <p className="text-purple-500 text-xs italic">{errors.product}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="btn bg-gray-400 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn bg-green-600 hover:bg-green-800 ${
                mutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
      {mutation.isError && (
        <ErrorScreen
          message={mutation.error.message}
          retry={() => mutation.mutate()}
        />
      )}
    </div>
  );
};

export default CreateLeadModal;
