import React from "react";
import { useMutation, useQueryClient } from "react-query";
import Api from "../services/Api";

const ConfirmationPopup = ({ isOpen, onClose, token, id }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      const response = await Api.deleteLeadEntry(token, id);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("leadsList");
        onClose();
      },
      onError: (error) => {
        console.error("Error deleting user:", error);
      },
    }
  );

  const handleDelete = () => {
    mutation.mutate();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this entry?</p>
        <div className="flex items-center justify-end mt-4">
          <button
            onClick={onClose}
            className="btn bg-gray-400 hover:bg-gray-600 mr-2"
          >
            No
          </button>
          <button
            onClick={handleDelete}
            className={`btn bg-purple-600 hover:bg-purple-800 ${
              mutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Deleting..." : "Yes"}
          </button>
        </div>
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

export default ConfirmationPopup;
