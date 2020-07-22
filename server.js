require("dotenv").config({ path: `${__dirname}/config/config.env` });
require("./config/db")();
const app = require("./app.js");

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server up on port ${port}...`));
