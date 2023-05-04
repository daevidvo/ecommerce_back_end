const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection.js');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
async function startServer() {
  await sequelize.sync({ force: false })
  console.log('Sequelize model synced')
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
}

startServer();