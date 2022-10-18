import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowsAltH,
  faBalanceScale,
  faCompressAlt,
  faExclamationCircle,
  faFeatherAlt,
  faGlobeAmericas,
  faHandHoldingHeart,
  faHands,
  faHatWizard,
  faLessThanEqual,
  faShield,
  faThumbsUp,
  faThumbTack,
  faUserInjured,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { IconName } from 'picker-types/types/track-and-field/icons';

export const spikeIconMap: { [key in IconName]: IconDefinition } = {
  'hold-fit': faHands,
  stability: faBalanceScale,
  'non-injury': faUserInjured,
  light: faFeatherAlt,
  repulse: faCompressAlt,
  'sole-soft': faHandHoldingHeart,
  'dual-ground': faGlobeAmericas,
  soleAngle: faLessThanEqual,
  pro: faUserPlus,
  beginner: faShield,
  specialized: faHatWizard,
  'take-off': faThumbTack,
  width: faArrowsAltH,
  good: faThumbsUp,
  caution: faExclamationCircle,
};
