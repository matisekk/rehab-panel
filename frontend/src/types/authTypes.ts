export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};
