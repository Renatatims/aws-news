const express = require("express");
const router = express.Router();

//Service interface object configuration
const AWS = require("aws-sdk");
const awsConfig = {
  region: "us-east-2",
};
AWS.config.update(awsConfig);
//Connect with the local DynamoDB instance - DocumentClient class - use native JavaScript objects to interface with the dunamodb service object
const dynamodb = new AWS.DynamoDB.DocumentClient();
//Table value - Messages
const table = "Messages";

//ROUTES

//GET /users - route - retrieve all user's messages
router.get("/users", (req, res) => {
  const params = {
    TableName: table,
  };
  // Scan return all items in the table
  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.status(500).json(err); // an error occurred
    } else {
      res.json(data.Items);
    }
  });
});
