export const AuthErrorCodes = ['OAuthAccountNotLinked'];
export type AuthErrorCode = typeof AuthErrorCodes[number];
export const AUTH_ERROR_MESSAGES: { [key in AuthErrorCode]: string } = {
  OAuthAccountNotLinked: `このメールアドレスはすでにアカウントが作成されています。
        前回ログインした際と同じ方法でログインしてください。`,
};
