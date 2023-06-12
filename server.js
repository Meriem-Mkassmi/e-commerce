const express = require("express")
const app = express();
const PORT = 8000;
const DB = "stack_db"
const cookieParser = require('cookie-parser');
const cors = require("cors")
require('dotenv').config();

require("./config/mongoose.config")(DB)
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json(), express.urlencoded({ extended: true }));


require("./routes/user.route")(app)
require("./routes/product.route")(app)



app.listen(PORT, () => { console.log("SERVER IS RUNING 🎈🎈🎈🎈 ") })