import express, {Express, Request, Response} from "express";
import dotenv from 'dotenv';
import { getXataClient,Ingredients  } from "./xata";

dotenv.config(); // make sure that env variables are included

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const xata = getXataClient();

type MyResponse<T> =
| {
    err: string;
} | {
    data: any;
}

app.get('/api/jobs', async (req: Request, res: Response<MyResponse<Ingredients[]>>)=>{
    try {
        const data = await xata.db.ingredients.getAll();
        return res.status(200).json({data:data});
      } catch (err) {
        console.error(err);
        return res.status(500).json({err: 'Something went wrong' });
      }
})

app.post('/api/jobs', async (req: Request<{},{},Ingredients>, res: Response<MyResponse<Ingredients>>)=>{
    try{
        const item = req.body;
        const createdJob = await xata.db.ingredients.create(item);
        // throw new Error('error');
        return res.status(201).json({data:createdJob});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({err:'Something went wrong'});
    }      
})

app.put('/api/jobs/:id', async (req: Request<{id:string},{},Ingredients>, res: Response<MyResponse<Ingredients>>)=>{
    try{
        const id = req.params.id;   //params.id has to match the url parameter /:id
        const item = req.body;
        const updatedIng = await xata.db.ingredients.update(id, item);

        if(!updatedIng){
            return res.status(404).json({err: 'Ingredient Not Found'});
        }

        return res.status(201).json({data:updatedIng});
    }
    catch(err){
        console.error(err);
        return res.status(500).json({err:'Something went wrong'});
    }
    
})

app.delete('/api/jobs/:id', 
async (req: Request<{id:string},{},{}>, res: Response<MyResponse<Ingredients>>)=>{
    try{
        const id = req.params.id;
        const deleteRecord = await xata.db.ingredients.delete(id);
        if(!deleteRecord){
            return res.status(404).json({err: "Ingredient Not Found"})
        }
        return res.status(200).json({data:deleteRecord});
    }
    catch(err){
        console.error(err);
        res.status(500).json({err:'Something went wrong'});
    }

})

app.listen(port, ()=>{
    console.log(`Server running at port ${port}`);
})