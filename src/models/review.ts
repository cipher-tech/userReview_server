import { Schema, model, connect } from "mongoose";

interface IReview {
    rating: string;
    comment: string;
  }
  
const schema = new Schema<IReview>({
    rating: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

const ReviewModel = model<IReview>("Review", schema);

