export interface IUser {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export class User implements IUser {
  constructor(
    public username: string,
    public email: string,
    public first_name: string,
    public last_name: string
  ) {}
}
