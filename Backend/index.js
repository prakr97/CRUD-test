import express from 'express';
import cors from 'cors'; 
import bodyParser from 'body-parser';
import Connection from './db.js';
import { addUser, getUsers } from './services.js';

const app = express();
const port = 8085;

app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/', getUsers);

app.post('/create', addUser);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

Connection()