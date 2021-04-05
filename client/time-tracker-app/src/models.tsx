export interface ISession {
  name: string;
  length: string;
}

export interface IStoredSession extends ISession {
  id: number;
  created_at: string;
}
