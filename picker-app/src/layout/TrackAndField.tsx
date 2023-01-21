import { PropsWithChildren } from 'react';
import { TAFHeader } from 'features/track-and-field/common/TAFHeader';
import DefaultLayout from 'layout/Default';
import { InitProfileGuard } from 'layout/guard/InitProfileGuard';
import { trackAndFieldTheme } from 'shared/constants/styles/colors';

const TAFLayout = ({ children }: PropsWithChildren) => {
  return (
    <DefaultLayout theme={trackAndFieldTheme} headerElement={<TAFHeader></TAFHeader>}>
      <InitProfileGuard>{children}</InitProfileGuard>
    </DefaultLayout>
  );
};

export default TAFLayout;
