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
import { Delete, Edit } from "@mui/icons-material";
import EditPost from "./EditPost";

const ViewPostsData = () => {
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [listPostId, setlistPostId] = React.useState(null);
  const handleOpenEditModal = (postId) => {
    setlistPostId(postId);
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => setOpenEditModal(false);

  // getting all posts
  const getAllPostsData = () => {
    const response = http.get(`/posts`);
    return response;
  };
  const { data, isLoading } = useQuery("posts", getAllPostsData, {
    onSuccess: (successData) => {
      console.log("Get Posts successfully...", successData);
    },
    onError: (Error) => {
      console.log("Not getting posts...", Error);
    },
  });

  // deleting post
  const deleteData = (postId) => {
    const response = http.delete(`/posts/${postId}`);
    return response;
  };

  const { mutate } = useMutation(deleteData, {
    onSuccess: (successData) => {
      console.log("Post deleted successfully...", successData);
    },
    onError: (Error) => {
      console.log("Post is not deleted...", Error);
    },
  });

  const deletePost = (postId) => {
    mutate(postId);
  };

  return (
    <Box sx={{ margin: "100px 0px" }}>
      <Container>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Date Created</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <MuiTypography text="No Posts in a table" align="center" />
              ) : (
                data?.map((list) => {
                  const { id, title, content, createdDate, status } = list;
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={id}
                    >
                      <TableCell component="th" scope="row">
                        {title}
                      </TableCell>
                      <TableCell>{content}</TableCell>
                      <TableCell>{createdDate}</TableCell>
                      <TableCell>{status}</TableCell>
                      <TableCell>
                        <Edit
                          color="secondary"
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleOpenEditModal(id)}
                        />
                        <EditPost
                          open={openEditModal}
                          onClose={handleCloseEditModal}
                          PostId={listPostId}
                        />
                        <Delete
                          color="secondary"
                          sx={{ cursor: "pointer" }}
                          onClick={() => deletePost(id)}
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

export default ViewPostsData;
