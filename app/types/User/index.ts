export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  roles: string[];
  phone_number?: string;
  address?: {
    city: string;
    cp: string;
    address: string;
    details: string | null | undefined;
  };
  name?: string;
  picture?: string;
};

export type GoogleUser = {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  picture: string;
  sub: string;
};

export type UsersData = User[];

export type UserWithoutPassword = Omit<User, "password">;
