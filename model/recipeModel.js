import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const RecipeSchema = new mongoose.Schema({
  user:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ingredients: {
    type: String,
  }
});

export default mongoose.model.Recipe || mongoose.model('Recipe', RecipeSchema);