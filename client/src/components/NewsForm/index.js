import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

//Import buttons
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

export default function FullWidthTextField() {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
        p: 4,
      }}
    >
      <TextField
        fullWidth
        label="Name"
        id="fullWidth"
        sx={{
          p: 1,
        }}
      />
      <TextField
        fullWidth
        label="Message"
        id="fullWidth"
        sx={{
          p: 1,
        }}
        multiline
        rows={8}
      />
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          p: 1,
        }}
      >
        <Button variant="contained" component="label">
          Upload
        </Button>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>
        
      </Stack>
    </Box>
  );
}
