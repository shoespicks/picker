import { PropsWithChildren } from 'react';
import { Session } from 'next-auth';
import { TAFHeader } from 'features/track-and-field/common/TAFHeader';
import DefaultLayout from 'layout/Default';
import { trackAndFieldTheme } from 'shared/constants/styles/colors';

type Props = {
  session?: Session | null;
};
const TAFLayout = ({ children, session }: PropsWithChildren<Props>) => {
  return (
    <DefaultLayout theme={trackAndFieldTheme} headerElement={<TAFHeader></TAFHeader>} session={session}>
      {children}
    </DefaultLayout>
  );
};

export default TAFLayout;
