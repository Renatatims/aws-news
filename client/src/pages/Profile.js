import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsList from "../components/NewsList";

import Typography from "@mui/material/Typography";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

const Profile = (props) => {
  const { username: userParam } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState([
    {
      username: userParam,
      createdAt: "",
      message: "",
    },
  ]);
  //useEffect hook - render all messages from a specific user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/users/${userParam}`);
        const data = await res.json();
        console.log(data);
        setMessages([...data]);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userParam]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#d1c4e9", height: "100vh" }}>
          <IconButton sx={{ pl: 1.75 }}>
            <a href="/" style={{ textDecoration: "none" }}>
              <HomeIcon />
            </a>
          </IconButton>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              p: 1,
            }}
          >
            <Avatar>
              <a
                href={`/profile/${userParam}`}
                style={{ textDecoration: "none" }}
              >
                {userParam[0]}
              </a>
            </Avatar>
            <Typography variant="h4" sx={{ color: "#6F7C80" }}>
              {`${userParam}'s`} profile
            </Typography>
          </Stack>
          <div>
            <div align="center">
              {!isLoaded ? (
                <div>Loading...</div>
              ) : (
                <NewsList
                  messages={messages}
                  title={
                    <p style={{ color: "white" }}>
                      {`${userParam}'s messages...`}
                    </p>
                  }
                />
              )}
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};
export default Profile;
