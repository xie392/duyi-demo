import { SignInData } from '@/types/api/user'
import { postApi } from '@/utils/request'

const baseUrl = '/api/user'

export const signInApi = (data: SignInData) => postApi(`${baseUrl}/sign-in`, data)
