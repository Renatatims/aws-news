import React, { useState, useEffect } from "react";

// Material UI imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ImageList from "@mui/material/ImageList";

//Imports - Components 
import NewsForm from "../components/NewsForm";
import NewsList from "../components/NewsList";


export default function ButtonAppBar() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/users");
        const jsonData = await res.json();
        const _data = jsonData.sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1
        );
        setMessages([..._data]);
        setIsLoaded(true);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <main style = {{backgroundColor:"#e0e0e0"}}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ bgcolor: "#a594c7" }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <ImageList variant="h6" component="div">
                <a href = "/">
                <img src={require("../assets/favicon/favicon.ico")} alt = "logo Tech News" width = "25">
                </img>
                </a>
              </ImageList>
              <a href = "/" style={{textDecoration: "none", color: "inherit"}}>
              <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
              AWS Tech News
              </Typography>
              </a>
              
              {/*<Button color="inherit">Login</Button>*/}
            </Toolbar>
          </AppBar>
        </Box>
        <div>
          <div align="center">
            <NewsForm />
          </div>

          <div align="center">
            {!isLoaded ? (
              <div>Loading...</div>
            ) : (
              <NewsList
                messages={messages}
                setMessages={setMessages}
                title="News Feed..."
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
