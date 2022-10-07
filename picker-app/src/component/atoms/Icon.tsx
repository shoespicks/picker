import React, { type FC } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

type Props = FontAwesomeIconProps & {
  icon: IconDefinition;
};

export const Icon: FC<Props> = props => <FontAwesomeIcon size="lg" {...props}></FontAwesomeIcon>;
