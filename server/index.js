const http = require('http');
const port = 4000;
const app = require('./app')
const server = http.createServer(app);
const { sequelize } = require('./models');




server.listen(port, (req, res) => {
    console.log(`Server running at ${port} port !`)
});



