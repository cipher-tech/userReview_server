import { Schema, model, connect } from "mongoose";

interface IReview {
    rating: number;
    comment: string;
  }
  
const schema = new Schema<IReview>({
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

const ReviewModel = model<IReview>("Review", schema);

