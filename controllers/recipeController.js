import RecipeModel from '../model/recipeModel.js';
import UserModel from '../model/userModel.js';
import jwt from 'jsonwebtoken';

export async function getAllRecipes(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const recipes = await RecipeModel.find({  user: userId });
    
    if (!recipes) {
      return res.status(404).send({ error: 'User not found' });
    }
//      const rest = Object.assign(contacts.toJSON());      
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function getRecipesById (req, res) {
  try {
    const { id } = req.params;
    const recipe = await RecipeModel.findById(id);
    if (!recipe) {
      return res.status(404).send({ error: 'Recipe not found' });
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

export async function getRecipe (req, res) {
  try {
    const { id } = req.params;
    const recipe = await RecipeModel.findById(id);
    if (!recipe) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

export async function createrrecipe (req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const { name, description, ingredients } = req.body;
    const recipe = new RecipeModel({ name, description, ingredients, user: userId });
    await recipe.save();
    res.status(201).send({ message: 'Recipe created successfully', recipe: recipe });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


export async function updaterecipe (req, res) {
    try {
      const body = req.body;  
      const { id } = req.params;

      const recipe = await RecipeModel.findById(id);
      if (!recipe) {
        return res.status(404).send("Recipe Not Found");
      }
      const updaterecipe = await RecipeModel.updateOne({ _id: id }, body);
      if (!updaterecipe) {
        return res.status(401).send({ message: "Recipe not updated" });
      }
      if (updaterecipe) {
        return res.status(201).send({ message: "Recipe updated...!", recipe: body });
      }
  } catch (error) {
    res.status(500).json({
      status: error.status,
      message: error.message,
    });
  }
}
export async function deleterecipe (req, res) {
  try {
    const { id } = req.params;
    const recipe = await RecipeModel.findByIdAndDelete(id);
    if (!recipe) {
      return res.status(404).send({ error: 'Recipe not found' });
    }
    res.status(200).send({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};