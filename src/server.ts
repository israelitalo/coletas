import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.use("/items/upload", express.static(path.resolve(__dirname, "..", "upload_items")));

app.listen(3333, () => {
    console.log('Server On!');
});