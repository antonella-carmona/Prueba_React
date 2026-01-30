import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchUsers();
    saveUsersToFirestore();
  }, [page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await api.getUsers(page, 20);
      setUsers(data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveUsersToFirestore = async () => {
    try {
      const data = await api.getUsers(page, 20);
      const usersCollection = collection(db, 'users');
      
      // Save each user to Firestore
      for (const user of data.data || []) {
        await addDoc(usersCollection, {
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          picture: user.picture,
          title: user.title || '',
          savedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error saving to Firestore:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Community Members
        </h1>
        <p className="text-gray-600">
          Meet the people behind the stories
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
          >
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
              <img
                src={user.picture}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                {user.title} {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{user.email}</p>
              {user.dateOfBirth && (
                <p className="text-xs text-gray-500">
                  Born: {new Date(user.dateOfBirth).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setPage(Math.max(0, page - 1))}
          disabled={page === 0}
          className="px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <span className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium">
          Page {page + 1}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={users.length < 20}
          className="px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
