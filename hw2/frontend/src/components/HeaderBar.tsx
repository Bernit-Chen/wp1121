
import AppBar from "@mui/material/AppBar";

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
