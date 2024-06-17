import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Player } from 'video-react';
import axios from 'axios';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`https://csc-study-api.vercel.app/blog/post/${slug}/`);
      setPost(response.data);
    };
    fetchPost();
  }, [slug]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded shadow p-4" data-aos="fade-up">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      {post.image && <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded mt-4" />}
      {post.video && (
        <div className="mt-4">
          <Player playsInline src={post.video} />
        </div>
      )}
      <p className="mt-4">{post.content}</p>
    </div>
  );
};

export default BlogDetail;
