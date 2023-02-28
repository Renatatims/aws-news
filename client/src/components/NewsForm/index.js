import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

//Import buttons
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";

const NewsForm = () => {
  const [formState, setFormState] = useState({
    username: "",
    message: "",
  });
  //Count characters
  const [characterCount, setCharacterCount] = useState(0);

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 250) {
      setFormState({ ...formState, [event.target.name]: event.target.value });
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormState({ username: "", message: "" });
    setCharacterCount(0);
  };

  return (
    <div>
      <p >
        Character Count: {characterCount}/250
      </p>
      <FormControl onSubmit={handleFormSubmit}>
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
            name="username"
            value={formState.username}
            id="fullWidth"
            sx={{
              p: 1,
            }}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={formState.message}
            id="fullWidth"
            sx={{
              p: 1,
            }}
            multiline
            rows={8}
            onChange={handleChange}
          />
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              p: 1,
            }}
          >
            <Button variant="contained" component="label" type="submit">
              Submit
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
      </FormControl>
    </div>
  );
};

export default NewsForm;
