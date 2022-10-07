import React, { type FC, Fragment, PropsWithChildren } from 'react';
import { Transition } from '@headlessui/react';
import { ReactTag } from '@headlessui/react/dist/types';
import { $transitions, TransitionName } from 'shared/constants/styles/transition';

type Props = {
  name: TransitionName;
  as?: ReactTag;
  className?: string;
};

export const Animation: FC<PropsWithChildren<Props>> = ({ name, as = Fragment, children }) => (
  <Transition as={as} {...$transitions[name]}>
    {children}
  </Transition>
);
