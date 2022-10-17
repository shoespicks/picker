import { PropsWithChildren } from 'react';
import { TAFHeader } from 'features/track-and-field/common/TAFHeader';
import DefaultLayout from 'layout/Default';
import { trackAndFieldTheme } from 'shared/constants/styles/colors';

const TAFLayout = ({ children }: PropsWithChildren) => {
  return (
    <DefaultLayout theme={trackAndFieldTheme} headerElement={<TAFHeader></TAFHeader>}>
      {children}
    </DefaultLayout>
  );
};

export default TAFLayout;
