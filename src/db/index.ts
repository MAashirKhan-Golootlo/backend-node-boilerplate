import type { User } from '../features/users/users.model';

const defaultSeed: User[] = [
  {
    id: 'seed-1',
    name: 'Ada Lovelace',
    email: 'ada@golootlo.dev',
    createdAt: new Date().toISOString()
  }
];

const usersStore: User[] = [];

const clone = (user: User): User => ({ ...user });

export const resetUsers = (seed: User[] = defaultSeed): void => {
  usersStore.length = 0;
  usersStore.push(...seed.map(clone));
};

export const listUsers = (): User[] => usersStore.map(clone);

export const addUser = (user: User): User => {
  usersStore.push(clone(user));
  return user;
};

resetUsers();

export default {
  listUsers,
  addUser,
  resetUsers
};

