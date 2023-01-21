import { FC, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import { PROFILE_EDIT_PAGE_PATH } from 'features/profile/constants/routing';

// 初回ログイン後、プロフィールを設定してない場合編集ページに飛ばす
export const InitProfileGuard: FC<PropsWithChildren> = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user?.hasProfile === false && router.route !== PROFILE_EDIT_PAGE_PATH) {
    // キャッシュが残ってたりするので再フェッチする
    getSession().then(session => session?.user?.hasProfile === false && router.push(PROFILE_EDIT_PAGE_PATH));
  }

  return <>{children}</>;
};
