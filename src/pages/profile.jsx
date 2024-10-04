import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { email, logout, getProfile } = useContext(UserContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      setProfileData(data);
    };
    fetchProfile();
  }, [getProfile]);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {profileData && <p>Email: {profileData.email}</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
