import React, { ElementType, type FC, Fragment, PropsWithChildren } from 'react';
import { Transition } from '@headlessui/react';
import { $transitions, TransitionClasses, TransitionName } from 'shared/constants/styles/transition';

type Props = {
  name?: TransitionName;
  transitions?: TransitionClasses;
  as?: ElementType;
  show?: boolean;
  appear?: boolean;
  className?: string;
};

export const Animation: FC<PropsWithChildren<Props>> = ({ name, transitions, as = Fragment, show, children }) => (
  <Transition show={show} as={as} {...(name && $transitions[name])} {...transitions}>
    {children}
  </Transition>
);

export const AnimationChild: FC<PropsWithChildren<Omit<Props, 'show'>>> = ({
  name,
  transitions,
  as = Fragment,
  children,
}) => (
  <Transition.Child as={as} {...(name && $transitions[name])} {...transitions}>
    {children}
  </Transition.Child>
);
