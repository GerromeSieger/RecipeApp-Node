import { Router } from "express";
const userRouter = Router();
import Auth, { localVariables } from '../middleware/auth.js';

import * as controller from '../controllers/userController.js';

/**
 * @openapi
 * '/api/users/register':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - number
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: gerrome
 *              email:
 *                type: string
 *                default: gerrome@gmail.com
 *              number:
 *                type: string
 *                default: 080890901
 *              password:
 *                type: string
 *                default: 12345
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
userRouter.route('/register').post(controller.register); // register user

/**
 * @openapi
 * '/api/users/login':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: gerrome@gmail.com
 *              password:
 *                type: string
 *                default: 12345
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
userRouter.route('/login').post(controller.login); // login in app

/**
 * @openapi
 * '/api/users/getall':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Get all users
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
userRouter.route('/getall').get(controller.getAllUsers) // user with id

/**
 * @openapi
 * '/api/users/get':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Get All user
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
userRouter.route('/get').get(Auth, controller.getUser) // user

/**
 * @openapi
 * '/api/users/update':
 *  put:
 *     tags:
 *     - User Controller
 *     summary: Edit a user
 *     requestBody:
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                default: gerrome
 *              email:
 *                type: string
 *                default: gerrome@gmail.com
 *              number:
 *                type: string
 *                default: 080890901
 *              password:
 *                type: string
 *                default: 12345
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
userRouter.route('/update').put(Auth, controller.updateUser); // is use to update the user

/**
 * @openapi
 * '/api/users/delete':
 *  delete:
 *     tags:
 *     - User Controller
 *     summary: Delete user
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
userRouter.route('/delete').delete(Auth, controller.deleteUser); // is use to delete the user

/**
 * @openapi
 * '/api/users/changePassword':
 *  put:
 *     tags:
 *     - User Controller
 *     summary: Change a user password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - oldPassword
 *              - newPassword
 *            properties:
 *              oldPassword:
 *                type: string
 *                default: '12345'
 *              newPassword:
 *                type: string
 *                default: 'newpassword123'
 *     responses:
 *      200:
 *        description: Modified
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
userRouter.route("/changePassword").put(Auth, controller.changePassword); // used to change password
export default userRouter;