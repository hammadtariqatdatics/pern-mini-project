import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

const MuiToolbar = styled(Toolbar)(({ theme }) => ({
  height: 64,
  background: "#28282a",
  [theme.breakpoints.up("sm")]: {
    height: 70,
  },
}));

export default MuiToolbar;
