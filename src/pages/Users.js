import { useEffect, useState } from 'react';
import { getAllUsers, followUser, unfollowUser } from '../api/api';
import { useUser } from '../context/UserContext';

const Users = () => {
  const { user } = useUser();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFollow = async (targetUserId) => {
    try {
      await followUser({ currentUserId: user._id, targetUserId });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollow = async (targetUserId) => {
    try {
      await unfollowUser({ currentUserId: user._id, targetUserId });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Explore Users</h2>
      <div>
        {users.map((u) => (
          <div key={u._id} style={{ marginBottom: '20px', border: '1px solid gray', padding: '10px' }}>
            <p><b>{u.username}</b></p>

            {u._id !== user._id && (
              u.followers.includes(user._id) ? (
                <button onClick={() => handleUnfollow(u._id)}>Unfollow</button>
              ) : (
                <button onClick={() => handleFollow(u._id)}>Follow</button>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
