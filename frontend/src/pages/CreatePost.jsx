import React from "react";
import HeroBanner from "../components/hero/HeroBanner";
import PostForm from "../components/post/PostForm";

const CreatePost = () => {
  return (
    <>
      <HeroBanner
        headingText="Create Post"
        paraText="Here is the Post page, you can post here"
      />
      <PostForm />
    </>
  );
};

export default CreatePost;
