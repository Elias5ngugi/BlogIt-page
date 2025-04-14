import React, { useState } from 'react';
import { useAuth } from '../../Authx/AuthContext';

const MyProfilePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [name, setName] = useState<string>('John Doe'); 

  if (!isAuthenticated) {
    return <div>You need to be logged in to view this page.</div>;
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const saveChanges = () => {
    // Logic to update the name (could send to server)
    console.log(`Updated name: ${name}`);
  };

  return (
    <div>
      <h1>My Profile</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
        />
      </div>
      <button onClick={saveChanges}>Save</button>
    </div>
  );
};

export default MyProfilePage;
