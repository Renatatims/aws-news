import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";

const MessageCard = ({ messages, title }) => {
  if (!messages.length) {
    return <h3>No News Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {messages &&
        messages.map((message) => (
          <Card sx={{ maxWidth: 345 }} key={message.createdAt}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              
              title={message.username}
              
            />
            <p className="card-header">
              <Link
                to={`/profile/${message.username}`}
                style={{ fontWeight: 500 }}
              >
                {message.username}'s message on{" "}
                {new Date(parseInt(message.createdAt)).toString()}
              </Link>{" "}
            </p>
            <CardMedia
              component="img"
              height="300"
              src={require("./placeholder.jpg")}
              alt="image"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {message.message}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
    </div>
  );
};
export default MessageCard;
