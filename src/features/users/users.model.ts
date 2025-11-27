export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export type CreateUserPayload = {
  name: string;
  email: string;
};

