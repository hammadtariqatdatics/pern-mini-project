import React from "react";
import HeroBanner from "../../components/hero/HeroBanner";
import ViewPostsData from "../../components/admin/ViewPostsData";

const ViewPosts = () => {
  return (
    <>
      <HeroBanner
        headingText="View Posts"
        paraText="Here is the View Posts page, you can see all posts here"
      />
      <ViewPostsData />
    </>
  );
};

export default ViewPosts;
