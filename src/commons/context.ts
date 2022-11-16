export interface IUser {
  user?: {
    email: string;
    id: string;
    artistImageId: string;
  };
}

export interface IContext {
  req: Request & IUser;
  res: Response;
}
