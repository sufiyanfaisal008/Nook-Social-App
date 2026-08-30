import React, { useState } from 'react';
import Header from '../../component/header';
import { message } from 'antd';
import axios from 'axios';
import { BiImageAdd, BiSend, BiBookContent } from 'react-icons/bi';
import { baseURL } from '../../core'
import './post.scss';

function Post() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handlepost = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      message.error('Title is Required...');
      return;
    }

    if (!description.trim()) {
      message.error('Description is Required...');
      return;
    }

    try {
      setLoading(true);
      
      const response = await axios.post(`${baseURL}/api/v1/post`, {
        title: title,
        text: description
      });

      message.success('Post Created Successfully!');
      setTitle('');
      setDescription('');

    } catch (error) {
      console.error(error);
      message.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-post-page">
      <Header />
      
      <div className="pos-container">
        <div className="post-card">
          
          <div className="text">
            <BiBookContent className="heading-icon" />
            <h2>Create New Post</h2>
            <p>Share your thoughts with the Nook-Social community</p>
          </div>

          <form onSubmit={handlepost}>
            <div className="input-group">
              <label>Post Title</label>
              <input 
                type="text" 
                placeholder="What's on your mind?..." 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Description</label>
              <textarea 
                rows="5"
                placeholder="Write your detailed post content here..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn" disabled={loading}>
                <BiSend />
                <span>{loading ? 'Posting...' : 'Publish Post'}</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Post;