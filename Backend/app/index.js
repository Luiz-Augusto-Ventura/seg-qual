const express = require('express');
const server = express();
const db = require('./config/db.conf');
const routes = require('./routes');
const cors = require('cors');

server.use(cors());
server.use(express.json());
server.use(routes);

db.sequelize.sync({force: false}).then(() => {
	console.log('Drop and Resync with { force: false }');
});

var app = server.listen(3000, ()=> {

	var host = app.address().address
	var port = app.address().port
	

	console.log("App listening at http://%s:%s", host, port)
});