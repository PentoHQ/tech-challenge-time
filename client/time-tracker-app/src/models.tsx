export interface ISession {
  id?: string;
  name: string;
  length: string;
}

export interface IStoredSession extends ISession {
  id?: string;
}
