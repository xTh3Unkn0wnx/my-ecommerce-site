'use client';

import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user');

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        const data = await response.json(); // Directly parse as JSON
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading once the data is fetched or failed
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <LoadingSpinner/> ; // Show loading message
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin User List</h1>
      {users.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-black py-2 px-4">Name</th>
              <th className="text-black py-2 px-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="text-black py-2 px-4">{user.name}</td>
                <td className="text-black py-2 px-4">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
}
