// imports aws-sdk package
const AWS = require("aws-sdk");

//import fs package
const fs = require("fs");

AWS.config.update({
  region: "us-east-2",
});
//DocumentClient () class to create dynamodb service object
const dynamodb = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});

console.log("Importing messages into DynamoDB. Please wait.");
const allUsers = JSON.parse(
  fs.readFileSync("./server/seed/users.json", "utf8")
);

//Loop over the allUsers array and create the params object with the elements in the array
allUsers.forEach((user) => {
  const params = {
    TableName: "Messages",
    Item: {
      username: user.username,
      createdAt: user.createdAt,
      message: user.message,
    },
  };
  //Call to the database - dynamodb - PUT method
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        "Unable to add message",
        user.username,
        ". Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("PutItem succeeded:", user.username);
    }
  });
});