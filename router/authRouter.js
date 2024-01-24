import { Router } from "express";
const authRouter = Router();

/** import all controllers */
import * as controller from '../controllers/authController.js';
import Auth from '../middleware/auth.js';

authRouter.route('/generateOTP').post(controller.generateOTP) // generate random OTP
authRouter.route('/verifyOTP').post(controller.verifyOTP) // verify generated OTP
authRouter.route('/createResetSession').get(controller.createResetSession) // reset all the variables


export default authRouter