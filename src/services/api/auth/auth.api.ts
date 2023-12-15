import ApiService from '../api-service';
import { type AxiosResponse } from 'axios';
import { type AuthResponseDto } from './dto/auth-response.dto';
import { type SignInRequestDto } from './dto/sign-in-request.dto';
import { type SignUpRequestDto } from './dto/sign-up-request.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
import { GoogleSignInRequestDto } from "./dto/google-sign-in-request.dto";
import { IClient } from "../client/dto/client.dto";
import { IProvider } from "../provider/dto/provider.dto";
import { IUser } from "../user/dto/user.dto";

class AuthApiService extends ApiService {
  signIn = async (data: SignInRequestDto): Promise<AxiosResponse<AuthResponseDto>> =>
    await this.post('/login', data).then((res) => res.data);

  signUp = async (data: SignUpRequestDto): Promise<AxiosResponse<AuthResponseDto>> =>
    await this.post('/register', data).then((res) => res.data);

  googleSignIn = async (data: GoogleSignInRequestDto): Promise<AuthResponseDto> =>
    await this.get('/sign-up-google', data).then((res) => res.data);

  logout = async (): Promise<AxiosResponse> => await this.get('logout').then((res) => res.data);

  verify = async (code: string): Promise<AxiosResponse> => await this.post(`/verify/${code}`).then((res) => res.data);

  sendVerificationCode = async (): Promise<AxiosResponse> =>
    await this.post('/send-verification-code').then((res) => res.data);

  applyVerificationCode = async (code: string): Promise<AxiosResponse> =>
    await this.post(`/apply-verification-code/${code}`).then((res) => res.data);

  resetPassword = async (data: ResetPasswordRequestDto): Promise<AxiosResponse> =>
    await this.post('/reset-password', data).then((res) => res.data);

  getAuthUser = async (): Promise<IUser | IClient | IProvider> =>
    await this.get('/get-auth-user').then((res) => res.data.auth);
}

export const AuthApi = new AuthApiService('users/auth');
