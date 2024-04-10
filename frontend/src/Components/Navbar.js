import React from "react";
import { AppBar, Box, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { SearchBar } from "./SearchBar";
import { UploadVideo } from "./UploadVideo";
import { Link } from "react-router-dom";

export const Navbar = ({ funcChange, videoDetails }) => {
  const matches = useMediaQuery("(min-width: 750px)");
  return (
    <>
      <AppBar sx={{ bg: "primary.main" }}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box sx={{ display: "flex",}}>
              <Typography variant="h4" color="red">
                X
              </Typography>
              <Typography variant="h4" color="white">
                flix
              </Typography>
            </Box>
          </Link>
          {videoDetails ? "" : matches && <SearchBar change={funcChange} />}
          <Box>
            <UploadVideo />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
