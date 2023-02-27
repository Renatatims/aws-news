import React from "react";
import Typography from "@mui/material/Typography";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#d1c4e9", height: "100vh" }}>
          <Typography variant="h3" gutterBottom>
            Welcome user!
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
}
