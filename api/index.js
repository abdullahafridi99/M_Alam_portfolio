import app from '../server/app.js';
import connectDB from '../server/config/db.js';

// Initialize Database connection
connectDB();

export default app;
