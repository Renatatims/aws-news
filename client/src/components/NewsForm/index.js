//import react hooks useState and useRef
import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

//Import buttons
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const NewsForm = () => {
  const [formState, setFormState] = useState({
    username: "",
    message: "",
  });
  //Count characters
  const [characterCount, setCharacterCount] = useState(0);

  //initial value of fileInput set to null - this ensures that the reference to the DOM element is current
  const fileInput = useRef(null);

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

    //POST - new message - Fetch function - send the form data to the endpoint in the body of the request
    const postData = async () => {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      console.log(data);
    };
    postData();

    setFormState({ username: "", message: "" });
    setCharacterCount(0);
  };

  //handleImageUpload function - Upload image button - retrieves the image file uploaded by the user
  const handleImageUpload = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("image", fileInput.current.files[0]);
    // send image file to endpoint with the postImage function
    const postImage = async () => {
      try {
        const res = await fetch("/api/image-upload", {
          mode: "cors",
          method: "POST",
          body: data,
        });
        if (!res.ok) throw new Error(res.statusText);
        const postResponse = await res.json();
        setFormState({ ...formState, image: postResponse.Location });

        return postResponse.Location;
      } catch (error) {
        console.log(error);
      }
    };
    postImage();
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <Box
          sx={{
            width: 290,
            pl: 2,
            pr: 4,
            pt: 2,
            pb: 2,
            m: 1.5,
            boxShadow: 4,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h7"
            sx={{
              color: "#a594c7",
              fontWeight: "bold",
            }}
          >
            {" "}
            Message{" "}
          </Typography>

          <p>Character Count: {characterCount}/250</p>

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
            rows={3}
            onChange={handleChange}
          />
          {/*Click photo icon or "choose file" - user can choose the file to import - was file is chosen, click over the upload button to upload to S3 bucket*/}
          <Stack
            direction="row"
            alignItems="center"
            spacing={0}
            sx={{
              p: 0,
            }}
          >
            <IconButton
              color="#b9adcf"
              aria-label="upload picture"
              component="label"
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                  cursor: "pointer"
                },
              }}
            >
              <PhotoCamera
                sx={{
                  "&:hover": {
                    color: "#a594c7",
                  },
                }}
              />
              <input
                accept="image/*"
                type="file"
                ref={fileInput}
                style={{ padding: "0px", margin: "0px", cursor: "pointer"}}
              />
              <CloudUploadIcon
                onClick={handleImageUpload}
                sx={{
                  "&:hover": {
                    color: "#a594c7",
                  },
                }}
              />
            </IconButton>
          </Stack>

          {/*Submit button - submit message*/}
          <Button
            variant="contained"
            type="submit"
            sx={{
              bgcolor: "#a594c7",
              boxShadow: 4,
              ":hover": {
                bgcolor: "#7b6eac",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default NewsForm;
