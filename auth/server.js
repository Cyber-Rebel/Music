require('dotenv').config();// always at top ise app me accesse me or sare me 
const app = require('./src/app.js')
const DbConnect = require('./src/db/db.js');
// Connect to the database
DbConnect();


app.listen(3000, () => {
  console.log('Authentication service running on port 3000');
});