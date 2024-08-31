import React from 'react';
import { Button } from './ui/button';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onProceed: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onProceed }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black-1 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-white">Connect a Bank in Sandbox Mode</h3>
        <p className='text-white'>For Testing Purpose, use the credentials below:</p>
        <p className='text-white'><strong>Username:</strong> user_good</p>
        <p className='text-white'><strong>Password:</strong> pass_good</p>
        <p className='text-white'><strong>OTP:</strong> 1111</p>
        <div className="mt-6 flex justify-end">
          <Button className="mr-2 bg-red-500 " onClick={onClose}>Cancel</Button>
          <Button className="bg-blue-500 text-white" onClick={onProceed}>Proceed</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
