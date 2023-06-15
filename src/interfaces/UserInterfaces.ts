export interface ICreate {
  name: string;
  email: string;
  password: string;
}
export interface TokenPayload {
  sub: string;
}
export interface IUpdate {
  newName: string;
  newPassword: string;
  oldPassword: string;
  user_id: string;
}
// types para o UserServices