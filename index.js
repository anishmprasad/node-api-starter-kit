const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/', (req, res, next) => {
	res.status(200).json({
		name: 'anish'
	});
});

// mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

// start a server on port 8080
const server = app.listen(8080, () => {
	const port = server.address().port;
	console.log('App listening on port', port);
});
