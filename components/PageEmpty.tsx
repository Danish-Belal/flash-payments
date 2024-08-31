import React from 'react';

const PageEmpty = ({ message, page = 'user' }: { message: string; page?: string }) => {
  return (
    <section className='flex flex-col justify-center items-center min-h-screen'>
      <div className='text-center'>
        <div className='text-2xl lg:text-4xl font-semibold text-red-600 mb-4'>
          {message}
        </div>
        <p className='text-base lg:text-lg text-gray-600'>
          {page === 'user'
            ? 'Please connect a bank account to proceed.'
            : 'Please try again after a while.'}
        </p>
      </div>
    </section>
  );
};

export default PageEmpty;
