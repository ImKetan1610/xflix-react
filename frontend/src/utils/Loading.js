import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

export const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#181818"
      }}
    >
      <Stack gap="20px" alignItems={"center"} color="black">
        <CircularProgress sx={{ color: "red" }} />
        <Typography variant="h5">Loading...</Typography>
      </Stack>
    </Box>
  );
};
