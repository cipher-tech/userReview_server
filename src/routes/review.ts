import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Socket } from 'socket.io';
import { io } from '../app';

const Review = mongoose.model('Review');

const router = express.Router();

router.get('/get_reviews', async (req: Request, res: Response) => {
    const reviews = await Review.find();
    res.send(reviews);
});

router.post('/add_review', async (req: Request, res: Response) => {
    const { comment, rating } = req.body;

    if (!comment || !rating) {
        return res
            .status(422)
            .send({ error: 'You must provide a comment and rating' });
    }
    try {
        const review = new Review({ comment, rating, });
        await review.save();
        //adding realtime update with socket IO 
            io.emit("New_review", { status: "successful", review } );

        res.send({ status: "successful", review });
    } catch (error) {
        res.status(422).send({ error: error });
    }
});
export default router;