import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";

export default function HeaderBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
           WP Music
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
