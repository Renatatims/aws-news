import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

const MessageCard = ({ messages, title }) => {
  //shareContent
  const shareContent = {
    text: messages,
  };

  const handleShareClick = async () => {
    try {
      await navigator.share(shareContent);
      console.log("Content shared successfully!");
    } catch (error) {
      console.error("Error sharing", error);
    }
  };
  //upvote Comments
  const [upvotes, setUpvotes] = useState(0);
  if (!messages.length) {
    return <h3>No News Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      <Grid container spacing={2}>
        {messages &&
          messages.map((message) => (
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{ maxWidth: 345, boxShadow: 8 }}
                key={message.createdAt}
              >
                <CardHeader
                  avatar={
                    <a href={`/profile/${message.username}`} style={{ textDecoration: "none" }}>
                      <Avatar sx={{ bgcolor: "grey" }} aria-label="user inital">
                        {message.username[0]}
                      </Avatar>
                    </a>
                  }
                  title={
                    <h3>
                      <a href={`/profile/${message.username}`} style={{ textDecoration: "none" }}>
                        {message.username}
                      </a>
                    </h3>
                  }
                />
                <p className="card-header">
                  <Link
                    to={`/profile/${message.username}`}
                    style={{ fontWeight: 500, textDecoration: "none" }}
                  >
                    {message.username}'s message on{" "}
                    {new Date(parseInt(message.createdAt)).toLocaleDateString()}
                  </Link>{" "}
                </p>
                {message.image && (
                  <CardMedia
                    component="img"
                    height="300"
                    src={message.image}
                    alt="image"
                  />
                )}
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {message.message}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon onClick={() => setUpvotes(upvotes + 1)} />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon onClick={handleShareClick} />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};
export default MessageCard;
