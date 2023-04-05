import React from "react";
import { useQuery } from "react-query";
import http from "../../utils/Api";

const ViewPostData = () => {
  const getPostData = () => {
    const response = http.get("/posts");
    return response;
  };
  const { data, isLoading } = useQuery("posts", getPostData, {
    onSuccess: (successData) => {
      console.log("Get Posts succesfully...", successData);
    },
    onError: (Error) => {
      console.log("Not getting posts...", Error);
    },
  });
  console.log(data);
  return <div>ViewPost</div>;
};

export default ViewPostData;
