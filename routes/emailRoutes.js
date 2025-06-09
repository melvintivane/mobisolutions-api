import { Router } from 'express';
import { sendEmail } from '../controllers/emailController.js';
const routerEmail = Router();

routerEmail.post('/send-email', sendEmail);

export default routerEmail;