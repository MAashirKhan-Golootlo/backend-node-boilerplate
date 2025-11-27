import { Router } from 'express';
import * as usersController from './users.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createUserSchema } from './users.validator';

const router = Router();

router.get('/', usersController.getUsers);
router.post('/', validateRequest({ body: createUserSchema }), usersController.createUser);

export default router;

