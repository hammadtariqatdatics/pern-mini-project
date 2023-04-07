import React from "react";
import HeroBanner from "../../components/hero/HeroBanner";
import ViewUsersData from "../../components/admin/ViewUsersData";

const ViewUsers = () => {
  return (
    <>
      <HeroBanner
        headingText="View Users"
        paraText="Here is the View Users page, you can see all users here"
      />
      <ViewUsersData />
    </>
  );
};

export default ViewUsers;
