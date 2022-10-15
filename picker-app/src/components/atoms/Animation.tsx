import React, { ElementType, type FC, Fragment, PropsWithChildren } from 'react';
import { Transition } from '@headlessui/react';
import { $transitions, TransitionName } from 'shared/constants/styles/transition';

type Props = {
  name: TransitionName;
  as?: ElementType;
  className?: string;
};

export const Animation: FC<PropsWithChildren<Props>> = ({ name, as = Fragment, children }) => (
  <Transition as={as} {...$transitions[name]}>
    {children}
  </Transition>
);
