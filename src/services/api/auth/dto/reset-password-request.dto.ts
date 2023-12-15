export interface ResetPasswordRequestDto {
  reset_password_token: string;
  password: string;
  confirm_password: string;
}
