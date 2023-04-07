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
import { Delete, Edit } from "@mui/icons-material";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const AccountData = () => {
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const getUserData = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const { id } = loggedInUser;
    const response = http.get(`/users/${id}`);
    return response;
  };
  const { data, isLoading } = useQuery("users", getUserData, {
    onSuccess: (successData) => {
      console.log("Get User successfully...", successData);
    },
    onError: (Error) => {
      console.log("Not getting users...", Error);
    },
  });
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
                <TableCell>User Role</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <MuiTypography text="No User in a table" align="center" />
              ) : (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {data.name}
                  </TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.phone}</TableCell>
                  <TableCell>{data.userRole}</TableCell>
                  <TableCell>
                    <Edit
                      color="secondary"
                      sx={{ cursor: "pointer" }}
                      onClick={handleOpenEditModal}
                    />
                    <EditModal
                      open={openEditModal}
                      onClose={handleCloseEditModal}
                    />
                    <Delete
                      color="secondary"
                      sx={{ cursor: "pointer" }}
                      onClick={handleOpenDeleteModal}
                    />
                    <DeleteModal
                      open={openDeleteModal}
                      onClose={handleCloseDeleteModal}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default AccountData;
