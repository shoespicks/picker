export const AuthErrorCodes = ['OAuthAccountNotLinked'];
export type AuthErrorCode = typeof AuthErrorCodes[number];
export const AUTH_ERROR_MESSAGES: { [key in AuthErrorCode]: string } = {
  OAuthAccountNotLinked: `認証エラーが発生しました。
        このメールアドレスはすでにアカウントが作成されています。
        前回ログインした時と同じ方法でログインしてください。`,
};
