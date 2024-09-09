import React, { useState } from 'react';
import UserDetailsForm from './UserDetailsForm';
import { Button } from './ui/button';

const AddBank = ({ user }: User) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      {/* Main page content with conditional blur */}
      <div className={openForm ? 'blur-sm pointer-events-none' : ''}>
        <h1>Add Details</h1>

        {/* Button to open the form */}
        <Button
          className="plaidlink-primary"
          onClick={() => setOpenForm(true)}
        >
          Connect Bank
        </Button>
      </div>

      {/* Conditionally render the modal form and center it */}
      {openForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            
            {/* X button to close the form */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setOpenForm(false)}
            >
              &times;
            </button>

            {/* Form content */}
            <UserDetailsForm user={user} type="user-details-bank" />
          </div>
        </div>
      )}
    </>
  );
};

export default AddBank;
