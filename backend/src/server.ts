
import express from 'express';
import cors from 'cors'; 
import todoRoutes from './Api/api';
import db from './DB/db'

db();
const app = express();
app.use(cors()); 
app.use(express.json()); 

app.use('/api', todoRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
