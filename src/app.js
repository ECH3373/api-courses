import express from 'express';
import 'express-async-errors';
import { course } from './features/course/index.js';
import { module } from './features/module/index.js';
import { lesson } from './features/lesson/index.js';
import { resource } from './features/resource/index.js';

export const app = express();

app.use(express.json());

app.use('/api/v1/courses', course.router);
app.use('/api/v1/modules', module.router);
app.use('/api/v1/lessons', lesson.router);
app.use('/api/v1/resources', resource.router);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || 'An error occurred while processing the request' });
});
