import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import Api from "../services/Api";
import { useAuth } from "../contexts/authContext";
import ConfirmationPopup from "./confirmationPopup";
import ErrorScreen from "./ErrorScreen";

const sampleProducts = [
  { productName: "Nike Tshirt", productID: "31274" },
  { productName: "Nike Shoes", productID: "31275" },
  { productName: "Adidas Shoes", productID: "31276" },
  { productName: "Adidas Hoodie", productID: "31277" },
];

const LeadsTable = ({ data, page, pageLimit }) => {
  const [editingRowId, setEditingRowId] = useState(null);
  const [rowId, setRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const { token } = useAuth();
  const queryClient = useQueryClient();

  const handleEditChange = (e, field) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSelectProduct = (e) => {
    const selectedProductID = e.target.value;
    const selectedProduct = sampleProducts.find(
      (product) => product.productID === selectedProductID
    );
    setEditedData((prev) => ({
      ...prev,
      product: selectedProduct,
    }));
  };

  const onClose = () => {
    setIsOpen(false);
    setRowId(null);
  };

  const mutation = useMutation(
    async (id) => {
      const response = await Api.editLeadEntry(token, id, editedData);
      return response.data;
    },
    {
      onSuccess: () => {
        setEditedData({});
        queryClient.invalidateQueries("leadsList");
        onClose();
      },
      onError: (error) => {
        console.error("Error updating lead:", error);
      },
    }
  );

  const handleSave = (id) => {
    mutation.mutate(id);
    setEditingRowId(null);
  };

  const handleCancel = () => {
    setEditingRowId(null);
  };

  const handleDelete = (id) => {
    setIsOpen(true);
    setRowId(id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="th">S. No.</th>
            <th className="th">Name</th>
            <th className="th">Email</th>
            <th className="th">Number</th>
            <th className="th">Product</th>
            <th className="th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => {
            const isEditing = editingRowId === entry._id;

            return (
              <tr key={entry._id} className="hover:bg-gray-100">
                <td className="td">{(page - 1) * pageLimit + index + 1}</td>
                <td className="td">
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={entry.name}
                      value={editedData.name}
                      onChange={(e) => handleEditChange(e, "name")}
                      className="form-input-small"
                    />
                  ) : (
                    entry.name
                  )}
                </td>
                <td className="td">
                  {isEditing ? (
                    <input
                      type="email"
                      defaultValue={entry.email}
                      value={editedData.email}
                      onChange={(e) => handleEditChange(e, "email")}
                      className="form-input-small"
                    />
                  ) : (
                    entry.email
                  )}
                </td>
                <td className="td">
                  {isEditing ? (
                    <input
                      type="tel"
                      defaultValue={entry.number}
                      value={editedData.number}
                      onChange={(e) => handleEditChange(e, "number")}
                      className="form-input-small"
                    />
                  ) : (
                    entry.number
                  )}
                </td>
                <td className="td">
                  {isEditing ? (
                    <select
                      // defaultValue={entry.product.productID}
                      value={
                        editedData.product?.productID || entry.product.productID
                      }
                      onChange={handleSelectProduct}
                      className="form-input-small"
                    >
                      <option value="">Select Product</option>
                      {sampleProducts.map((product) => (
                        <option
                          key={product.productID}
                          value={product.productID}
                        >
                          {product.productName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    sampleProducts.find(
                      (product) =>
                        product.productID === entry.product?.productID
                    )?.productName || "Unknown Product"
                  )}
                </td>
                <td className="td">
                  {isEditing ? (
                    <>
                      <button
                        className="text-green-500 p-1 text-xl"
                        onClick={() => handleSave(entry._id)}
                      >
                        <FontAwesomeIcon icon={faSave} />
                      </button>{" "}
                      <button
                        className="text-red-600 p-1 text-xl"
                        onClick={handleCancel}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="text-blue-500 p-1 text-xl"
                        onClick={() => setEditingRowId(entry._id)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>{" "}
                      <button
                        className="text-red-600 p-1 text-xl"
                        onClick={() => handleDelete(entry._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ConfirmationPopup
        isOpen={isOpen}
        onClose={onClose}
        id={rowId}
        token={token}
      />
      {mutation.isError && (
        <ErrorScreen
          message={mutation.error.message}
          retry={() => mutation.mutate()}
        />
      )}
    </div>
  );
};

export default LeadsTable;
