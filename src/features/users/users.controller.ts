import type { Request, Response, NextFunction } from 'express';
import usersService from './users.service';
import { successResponse } from '../../utils/response';

export const getUsers = (req: Request, res: Response): Response =>
  res.json(successResponse(usersService.listUsers(), req.requestId));

export const createUser = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const created = usersService.createUser(req.body);
    res.status(201).json(successResponse(created, req.requestId));
  } catch (error) {
    next(error);
  }
};

