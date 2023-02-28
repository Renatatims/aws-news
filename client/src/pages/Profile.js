import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsList from "../components/NewsList";

import Typography from "@mui/material/Typography";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

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
          <Typography variant="h3" gutterBottom>
           {`${userParam}'s`} profile
          </Typography>
          <div>
            <div align="center">
              {!isLoaded ? (
                <div>Loading...</div>
              ) : (
                <NewsList
                  messages={messages}
                  title={`${userParam}'s messages...`}
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
