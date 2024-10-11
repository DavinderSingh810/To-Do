
import express, { Request, Response } from "express";
import TodoModel from '../DB/ItemSchema'; 
import { request } from "http";
const router = express.Router();

router.get("/todos", async (req: Request, res: Response) => {
    try {
        const todos = await TodoModel.find();
        res.status(200).json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: 'Error fetching todos' });
    }
});

router.post("/todos", async (req: Request, res: Response) => {
    const todo = req.body;
    const newItem = new TodoModel(todo);
    try {
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error saving todo:', error);
        res.status(500).json({ message: 'Error saving todo' });
    }
});

router.put("/todos/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedTodo = await TodoModel.findOneAndUpdate({ id: id }, updates, { new: true, runValidators: true });

        if (!updatedTodo) {
             res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(400);
    }
});

router.delete("/todos/:id", async (req: Request, res: Response) => {
    const id = req.params.id; 
    try {
        const deltodo = await TodoModel.findOneAndDelete({ id: id }); 
        if (!deltodo) {
             res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(deltodo);
    } catch (error) {
        console.error('Error deleting todo', error);
        res.status(500).json({ message: 'Internal server error' }); 
    }
});





export default router;
