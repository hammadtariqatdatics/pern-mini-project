import React from "react";
import HeroBanner from "../../components/hero/HeroBanner";
import AccountData from "../../components/user/AccountData";

const ViewAccount = () => {
  return (
    <>
      <HeroBanner
        headingText="View Account"
        paraText="Here is the User Account page, you can manage account here"
      />
      <AccountData />
    </>
  );
};

export default ViewAccount;
