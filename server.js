import express from "express";
import cors from "cors";
import path from "path";
const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
  //   // Set static folder
  //   // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  //   // index.html for all page routes  html or routing and naviagtion
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

export default app;
