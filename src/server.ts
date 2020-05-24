import express from 'express';
import 'reflect-metadata';
import routes from './routes';
import './database';
import uploadConfig from './config/upload';

const app = express();
app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.directory));

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log(' 🚀 server started on port 33333 ! ');
});
