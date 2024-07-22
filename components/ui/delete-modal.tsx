"use client";
import { useContactStore } from "@/stores/contactStore";
import { Dialog } from "@headlessui/react";
import { useApiService } from "@/context/HuxApiServiceContext";
import { useUserStore } from "@/stores/userStore";

const Modal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const { contactToDelete, deleteContact } = useContactStore();
  const { apiService } = useApiService();
  const token = useUserStore((state) => state.token);

  if (!contactToDelete) return null;

  const confirmDelete = async () => {
    try {
      apiService.setToken(token);
      await apiService.delete(`/contact/${contactToDelete.id}`);
      deleteContact(contactToDelete.id);
      closeModal();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="max-w-sm p-6 mx-auto bg-white rounded-lg shadow-lg">
          <Dialog.Title className="text-xl font-semibold">
            Delete Contact
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-gray-600">
            Are you sure you want to delete {contactToDelete.fullname}?
          </Dialog.Description>
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="w-full py-2 text-white transition duration-150 ease-in-out bg-gray-500 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              className="w-full py-2 text-white transition duration-150 ease-in-out bg-red-500 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
