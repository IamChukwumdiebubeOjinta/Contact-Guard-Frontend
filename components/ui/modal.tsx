"use client";
import { Dialog } from '@headlessui/react';
import { useState } from 'react';

const Modal = ({ isOpen, closeModal }: { isOpen: boolean, closeModal: () => void }) => {
  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="max-w-sm p-6 mx-auto bg-white rounded-lg shadow-lg">
          <Dialog.Title className="text-xl font-semibold">Coming Soon</Dialog.Title>
          <Dialog.Description className="mt-2 text-gray-600">
            This feature is coming soon. Stay tuned!
          </Dialog.Description>
          <div className="mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="w-full py-2 text-white bg-[#5DADE2] hover:bg-[#4987b1] transition duration-150 ease-in-out rounded"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
