// 'use client'
import UserDetailsForm from '@/components/UserDetailsForm';
import React, { useEffect, useState } from 'react';
import { getLoggedInUser } from '@/lib/actions/user.action';

const UserDetails = async() => {
  // const [loggedInUser, setLoggedInUser] = useState(null);

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const user = await getLoggedInUser();
  //       setLoggedInUser(user);
  //       console.log("Logged in User", user);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };
  //   getUserData();
  // }, []);
    const loggedInUser = await getLoggedInUser();
  return (
    <div>
      <h2>Hello, How are you doing?</h2>
      {/* Make sure loggedInUser is available before rendering the form */}
      {loggedInUser && (

        <UserDetailsForm user={loggedInUser} type="user-details-bank" />
      )}
    </div>
  );
};

export default UserDetails;
