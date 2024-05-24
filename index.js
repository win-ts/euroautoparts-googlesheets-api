const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const errorController = require("./controllers/errors");

app.use("/sheets", require("./routes/sheets"));
app.get("*", errorController.get404);

app.listen(port, () => {
    console.log(`App is running on port ${port} at http://localhost:${port}`);
});