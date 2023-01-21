import { FC, PropsWithChildren } from 'react';
import { Breadcrumbs } from 'features/common/Breadcrumbs';
import { TAFHeader } from 'features/track-and-field/common/TAFHeader';
import DefaultLayout from 'layout/Default';
import { InitProfileGuard } from 'layout/guard/InitProfileGuard';
import { trackAndFieldTheme } from 'shared/constants/styles/colors';
import { Link } from 'shared/constants/type';

type Props = {
  links: Link[];
};

const TAFLayout: FC<PropsWithChildren<Props>> = ({ links, children }) => {
    return (
      <DefaultLayout theme={trackAndFieldTheme} headerElement={<TAFHeader></TAFHeader>}>
        <InitProfileGuard>{children}</InitProfileGuard>
      <Breadcrumbs links={links}/>
    </DefaultLayout>
  );
};

export default TAFLayout;
