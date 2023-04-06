import React from "react";
import { useQuery } from "react-query";
import http from "../../utils/Api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Box } from "@mui/material";
import MuiTypography from "../MuiTypography";

const ViewPostData = () => {
  const getPostData = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const { id } = loggedInUser;
    const response = http.get(`/posts/${id}`);
    return response;
  };
  const { data, isLoading } = useQuery("posts", getPostData, {
    onSuccess: (successData) => {
      console.log("Get Posts successfully...", successData);
    },
    onError: (Error) => {
      console.log("Not getting posts...", Error);
    },
  });
  return (
    <Box sx={{ margin: "100px 0px" }}>
      <Container>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Post Name</TableCell>
                <TableCell>Post Content</TableCell>
                <TableCell>Date Created</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>User Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <MuiTypography text="No Post in a table" align="center" />
              ) : (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {data.title}
                  </TableCell>
                  <TableCell>{data.content}</TableCell>
                  <TableCell>{data.createdDate}</TableCell>
                  <TableCell>{data.status}</TableCell>
                  <TableCell>{data.userName}</TableCell>
                  <TableCell>{data.userEmail}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default ViewPostData;
