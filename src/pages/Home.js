import { useEffect, useState } from 'react';
import { createPost, getPosts, likePost, unlikePost, commentPost } from '../api/api';
import { useUser } from '../context/UserContext';

const Home = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const { user } = useUser();
  const [commentText, setCommentText] = useState('');

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('postedBy', user._id);
      if (image) formData.append('image', image);

      await createPost(formData);
      setContent('');
      setImage(null);
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await getPosts();
      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await likePost({ postId, userId: user._id });
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      await unlikePost({ postId, userId: user._id });
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async (postId) => {
    if (!commentText.trim()) return;
    try {
      await commentPost({ postId, text: commentText, userId: user._id });
      setCommentText('');
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Home - Tech Feed</h2>
      <form onSubmit={handlePost} encType="multipart/form-data">
        <input
          placeholder="What's happening in tech?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Post</button>
      </form>

      <div>
        {posts.map((post) => (
          <div key={post._id} style={{ marginBottom: '30px', border: '1px solid black', padding: '10px' }}>
            <h4>{post.postedBy?.username}</h4>
            <p>{post.content}</p>
            {post.image && (
              <img
                src={`http://localhost:5000/uploads/${post.image}`}
                alt="post"
                style={{ width: '300px', height: 'auto' }}
              />
            )}

            <div style={{ marginTop: '10px' }}>
              <button onClick={() => handleLike(post._id)}>Like ❤️</button>
              <button onClick={() => handleUnlike(post._id)}>Unlike 💔</button>
              <p>{post.likes.length} Likes</p>
            </div>

            <div style={{ marginTop: '10px' }}>
              <input
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button onClick={() => handleComment(post._id)}>Comment 💬</button>

              <div style={{ marginTop: '10px' }}>
                {post.comments.map((c, idx) => (
                  <p key={idx}><b>{c.postedBy?.username || "User"}:</b> {c.text}</p>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
