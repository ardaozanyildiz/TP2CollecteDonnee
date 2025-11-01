//C'est ma classe user
export type UserRole = "user" | "admin";

export class User {
  public mediaIds: string[] = [];
  public favorites: string[] = [];

  constructor(
    public id: string,
    public email: string,
    public password: string,
    public role: UserRole = "user",
    public name?: string
  ) {}

}