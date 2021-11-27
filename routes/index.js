import express from 'express';
const app = express();
import courseRoutes from './course.js';

app.use("/courses", courseRoutes)
// Further routes can be added here

export default app
