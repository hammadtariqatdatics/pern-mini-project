import React, { useState } from "react";
import MuiAppBar from "../MuiAppBar";
import MuiToolbar from "../MuiToolbar";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRoleContext } from "../../context/RoleContext";
import { useNavigate } from "react-router-dom";

const AppBar = () => {
  const { role, setRole } = useRoleContext();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };
  return (
    <MuiAppBar position="fixed">
      <MuiToolbar
        sx={{
          justifyContent: "space-between",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
          },
          padding: {
            xs: "5px 0px",
            sm: "5px 0px",
            md: "0px 24px",
            lg: "0px 24px",
            xl: "0px 24px",
          },
        }}
      >
        <Box sx={{ flex: 1 }} />
        <Link
          to="#"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontSize: "24px",
            textTransform: "uppercase",
          }}
        >
          Mini Project {role ? `- Welcome ${role}` : null}
        </Link>
        <Box
          sx={{
            flex: 1,
            display: {
              xl: "flex",
              lg: "flex",
              md: "flex",
              sm: "none",
              xs: "none",
            },
            justifyContent: "flex-end",
          }}
        >
          {role === "user" ? (
            <>
              <Link
                to="/create-post"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "18px",
                  textTransform: "uppercase",
                }}
              >
                Create Post
              </Link>
              <Link
                to="/view-post"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "18px",
                  textTransform: "uppercase",
                  marginLeft: "20px",
                }}
              >
                View Post
              </Link>
              <Link
                to="/view-account"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "18px",
                  textTransform: "uppercase",
                  marginLeft: "20px",
                }}
              >
                View Account
              </Link>
              <Link
                to="#"
                style={{
                  color: "#ff3366",
                  textDecoration: "none",
                  fontSize: "18px",
                  marginLeft: "24px",
                  textTransform: "uppercase",
                }}
                onClick={handleLogout}
              >
                Logout
              </Link>
            </>
          ) : role === "admin" ? (
            <>
              <Link
                to="/view-users"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "18px",
                  textTransform: "uppercase",
                }}
              >
                View Users
              </Link>
              <Link
                to="/view-posts"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "18px",
                  textTransform: "uppercase",
                  marginLeft: "20px",
                }}
              >
                View Posts
              </Link>
              <Link
                to="#"
                style={{
                  color: "#ff3366",
                  textDecoration: "none",
                  fontSize: "18px",
                  marginLeft: "24px",
                  textTransform: "uppercase",
                }}
                onClick={handleLogout}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "18px",
                  textTransform: "uppercase",
                }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                style={{
                  color: "#ff3366",
                  textDecoration: "none",
                  fontSize: "18px",
                  marginLeft: "24px",
                  textTransform: "uppercase",
                }}
              >
                Sign Up
              </Link>
            </>
          )}
        </Box>
        <Box
          sx={{
            display: {
              xl: "none",
              lg: "none",
              md: "none",
              sm: "block",
              xs: "block",
            },
          }}
        >
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon color="secondary" fontSize="medium" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link
              to="/login"
              style={{
                color: "#000",
                textDecoration: "none",
                fontSize: "24px",
                textTransform: "uppercase",
              }}
            >
              <MenuItem>Login</MenuItem>
            </Link>
            <Link
              to="/signup"
              style={{
                color: "#000",
                textDecoration: "none",
                fontSize: "24px",
                textTransform: "uppercase",
              }}
            >
              <MenuItem>Signup</MenuItem>
            </Link>
            <Link
              to="/users"
              style={{
                color: "#000",
                textDecoration: "none",
                fontSize: "24px",
                textTransform: "uppercase",
              }}
            >
              <MenuItem>Users</MenuItem>
            </Link>
            <Link
              to="/logout"
              style={{
                color: "#000",
                textDecoration: "none",
                fontSize: "24px",
                textTransform: "uppercase",
              }}
            >
              <MenuItem>Logout</MenuItem>
            </Link>
          </Menu>
        </Box>
      </MuiToolbar>
    </MuiAppBar>
  );
};

export default AppBar;
