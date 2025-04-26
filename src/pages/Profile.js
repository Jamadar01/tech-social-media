import { useEffect, useState } from 'react';
import { getUserPosts } from '../api/api';
import { useUser } from '../context/UserContext';

const Profile = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      const res = await getUserPosts(user._id);
      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{user.username}'s Profile</h2>
      <h3>Your Posts ({posts.length})</h3>
      <div>
        {posts.map((post) => (
          <div key={post._id} style={{ marginBottom: '30px', border: '1px solid black', padding: '10px' }}>
            <p>{post.content}</p>
            {post.image && (
              <img
                src={`http://localhost:5000/uploads/${post.image}`}
                alt="post"
                style={{ width: '300px', height: 'auto' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
