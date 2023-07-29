import express, {Express, Request, Response} from "express";
import dotenv from 'dotenv';
import { getXataClient,Ingredients  } from "./xata";

dotenv.config(); // make sure that env variables are included

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const xata = getXataClient();


app.get('/api/jobs', async (req: Request, res: Response)=>{
    try {
        const data = await xata.db.ingredients.getAll();
        res.json(data);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ err: 'Something went wrong' });
      }
})

app.post('/api/jobs', async (req: Request, res: Response)=>{
    try{
        const item = req.body;
        const createdJob = await xata.db.ingredients.create(item);
        // throw new Error('error');
        res.json(createdJob);
    }
    catch(err){
        console.error(err);
        res.status(500).json({err:'Something went wrong'});
    }      
})

app.put('/api/jobs/:id', async (req: Request, res: Response)=>{
    const id = req.params.id;   //params.id has to match the url parameter /:id
    const item = req.body;
    const updatedIng = await xata.db.ingredients.update(id, item);
    res.json(updatedIng);
})

app.delete('/api/jobs/:id', async (req: Request, res: Response)=>{
    const id = req.params.id;
    const deleteRecord = await xata.db.ingredients.delete(id);
    res.json(deleteRecord);
})

app.listen(port, ()=>{
    console.log(`Server running at port ${port}`);
})