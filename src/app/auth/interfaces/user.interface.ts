export interface User {
  id: number,
  name: string,
  email: string,
  password?: string,
  role?: string,
  user?: {
    name: string,
    email: string,
    role?: string
  }
  token?: string,
}
