import { v4 as uuid } from 'uuid';
import db from '../../db';
import type { CreateUserPayload, User } from './users.model';

const listUsers = (): User[] => db.listUsers();

const createUser = (payload: CreateUserPayload): User => {
  const now = new Date().toISOString();
  const user: User = {
    id: uuid(),
    createdAt: now,
    ...payload
  };

  return db.addUser(user);
};

export default {
  listUsers,
  createUser
};

