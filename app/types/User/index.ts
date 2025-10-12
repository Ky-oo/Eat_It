export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  roles: string[];
};

export type UsersData = {
  users: User[];
};
