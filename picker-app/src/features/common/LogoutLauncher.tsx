import React, { type FC } from 'react';
import { signOut } from 'next-auth/react';
import { Button } from 'components/atoms/Button';

export const LogoutLauncher: FC = () => {
  return (
    <>
      <Button label="ログアウト" width="100%" fontSize="14px" onClick={() => signOut()}></Button>
    </>
  );
};
