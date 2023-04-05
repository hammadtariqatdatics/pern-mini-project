import React from "react";
import HeroBanner from "../components/hero/HeroBanner";
import ViewPostData from "../components/post/ViewPostData";

const ViewPost = () => {
  return (
    <>
      <HeroBanner
        headingText="View Post"
        paraText="Here is the View Post page, you can see your post here"
      />
      <ViewPostData />
    </>
  );
};

export default ViewPost;
