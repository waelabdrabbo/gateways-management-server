import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import connectToDatabase from './db/conn.mjs';
import gatewayRoutes from './routes/gateway.routes.mjs'
import deviceRoutes from './routes/device.routes.mjs'

const PORT = process.env.PORT || 5050;
const app = express();
await connectToDatabase();

app.use(express.json());


app.use(cors());
app.use(express.json());

app.use('/api', gatewayRoutes);
app.use('/api', deviceRoutes);


// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

