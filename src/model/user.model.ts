export class LoginUserRequest {
  email: string;
  password: string;
}

export class RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  role_id: number;
  timeStamp: Date;
}

export class UserResponse {
  email: string;
  name: string;
  token?: string;
}
