import React from 'react';
import PostTicket from './PostTicket';

const Post = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Post Your Train Ticket
      </h1>
      <PostTicket />
    </div>
  );
};

export default Post;
