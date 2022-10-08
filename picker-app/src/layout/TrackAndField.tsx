import { PropsWithChildren } from 'react';
import DefaultLayout from 'layout/Default';
import { trackAndFieldTheme } from 'shared/constants/styles/colors';

const TAFLayout = ({ children }: PropsWithChildren) => {
  return <DefaultLayout theme={trackAndFieldTheme}>{children}</DefaultLayout>;
};

export default TAFLayout;
