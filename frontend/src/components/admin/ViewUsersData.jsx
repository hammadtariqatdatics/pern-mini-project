import React from "react";
import { useQuery, useMutation } from "react-query";
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
import { Delete } from "@mui/icons-material";

const ViewUsersData = () => {
  const getAllUsersData = () => {
    const response = http.get(`/users`);
    return response;
  };
  const { data, isLoading } = useQuery("users", getAllUsersData, {
    onSuccess: (successData) => {
      console.log("Get Users successfully...", successData);
    },
    onError: (Error) => {
      console.log("Not getting users...", Error);
    },
  });

  const deleteData = (userId) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const { id } = loggedInUser;
    if (id === userId) {
      alert("Can't delete yourself");
    } else {
      const response = http.delete(`/users/${userId}`);
      return response;
    }
  };

  const { mutate } = useMutation(deleteData, {
    onSuccess: (successData) => {
      console.log("User deleted successfully...", successData);
    },
    onError: (Error) => {
      console.log("User is not deleted...", Error);
    },
  });

  const deleteUser = (userId) => {
    mutate(userId);
  };

  return (
    <Box sx={{ margin: "100px 0px" }}>
      <Container>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>UserRole</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <MuiTypography text="No Users in a table" align="center" />
              ) : (
                data?.map((list) => {
                  const { id, name, email, phone, userRole } = list;
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={id}
                    >
                      <TableCell component="th" scope="row">
                        {name}
                      </TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>{phone}</TableCell>
                      <TableCell>{userRole}</TableCell>
                      <TableCell>
                        <Delete
                          color="secondary"
                          sx={{ cursor: "pointer" }}
                          onClick={() => deleteUser(id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default ViewUsersData;
