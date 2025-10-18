export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  roles: string[];
  phone_number: string;
  address: {
    city: string;
    cp: string;
    address: string;
    details: string | null | undefined;
  };
};

export type UsersData = User[];

export type UserWithoutPassword = Omit<User, "password">;
