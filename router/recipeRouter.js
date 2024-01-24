import { Router } from "express";
const recipeRouter = Router();
import * as controller from '../controllers/recipeController.js';
import Auth, { localVariables } from '../middleware/auth.js';

/**
 * @openapi
 * '/api/recipe/getallrecipes':
 *  get:
 *     tags:
 *     - Recipe Controller
 *     summary: Get all user's recipes
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
recipeRouter.route('/getallrecipes').get(Auth, controller.getAllRecipes);

/**
 * @openapi
 * '/api/recipe/{id}':
 *  get:
 *     tags:
 *     - Recipe Controller
 *     summary: Get specific recipe
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the recipe
 *        required: true 
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
recipeRouter.route('/:id').get(Auth, controller.getRecipesById);

/**
 * @openapi
 * '/api/recipe/create':
 *  post:
 *     tags:
 *     - Recipe Controller
 *     summary: Create a recipe
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *              - ingredients
 *            properties:
 *              name:
 *                type: string
 *                default: Pasta
 *              description:
 *                type: string
 *                default: A Cool pasta recipe
 *              ingredients:
 *                type: string
 *                default: onions
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
recipeRouter.route('/create').post(Auth, controller.createrrecipe);

/**
 * @openapi
 * '/api/recipe/update/{id}':
 *  put:
 *     tags:
 *     - Recipe Controller
 *     summary: Edit a recipe
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The Id of the recipe
 *        required: true 
 *     requestBody:
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                default: New Pasta
 *              description:
 *                type: string
 *                default: Great Pasta Recipe!
 *              ingredients:
 *                type: string
 *                default: Pepper, Onions
 *              userId:
 *                type: string
 *                default: 
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
recipeRouter.route('/update/:id').put(Auth, controller.updaterecipe);

/**
 * @openapi
 * '/api/recipe/delete/{id}':
 *  delete:
 *     tags:
 *     - Recipe Controller
 *     summary: Delete recipe by Id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The Id of the recipe
 *        required: true
 *     responses:
 *      200:
 *        description: Removed
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
recipeRouter.route('/delete/:id').delete(Auth, controller.deleterecipe);

export default recipeRouter;