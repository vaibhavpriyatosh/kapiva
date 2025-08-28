import express from 'express';
import { createTodoEntry, getTodoList } from './db/todo.js';

const app = express();

app.use(express.json());

app.get('/healthz', (_req, res) => {
  return res.send('Working Todo Application');
});

app.post('/todo', (req, res) => {
  console.log('body', req.body);
  const { text, userId } = req.body;
  /**
   * validation
   */
  const { ok } = createTodoEntry({ text, userId });
  if (ok) {
    return res.status(201).json({ msg: 'Entry Created' });
  } else {
    return res.status(200).json({ msg: 'Entry Not created' });
  }
});

app.get('/todo', (req, res) => {
  const { userId, page = 1, pageLength = 10 } = req.query;

  const { ok, data } = getTodoList({ userId, page, pageLength });

  if (ok) {
    return res.status(200).json({ data });
  }
  return res.status(200).json({ msg: 'Something Went wrong' });
});

app.listen(3000, () => {
  console.log('Listening on localhist:3000');
});
