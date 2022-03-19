import { ISpikeShoesFields } from '~/types/generated/contentful';

export type EventCode = Exclude<ISpikeShoesFields['events'], undefined>[number];

export type EventCategoryCode =
  | 'shortDistance'
  | 'middleDistance'
  | 'longDistance'
  | 'jumping'
  | 'throwing';

export type EventsAndEventCategoriesCode = EventCode | EventCategoryCode;

export interface IEventItem {
  readonly id: EventsAndEventCategoriesCode;
  readonly label: string;
  readonly eventCodes: EventCode[];
}

export const shoeEvents: {
  [key in EventCode]: IEventItem;
} = {
  '100m': {
    id: '100m',
    label: '100m',
    eventCodes: ['100m']
  },
  '200m': {
    id: '200m',
    label: '200m',
    eventCodes: ['200m']
  },
  '400m': {
    id: '400m',
    label: '400m',
    eventCodes: ['400m']
  },
  '110mH': {
    id: '110mH',
    label: '110mH',
    eventCodes: ['110mH']
  },
  '400mH': {
    id: '400mH',
    label: '400mH',
    eventCodes: ['400mH']
  },
  '800m': {
    id: '800m',
    label: '800m',
    eventCodes: ['800m']
  },
  '1500m': {
    id: '1500m',
    label: '1500m',
    eventCodes: ['1500m']
  },
  '3000m': {
    id: '3000m',
    label: '3000m',
    eventCodes: ['3000m']
  },
  '3000msc': {
    id: '3000msc',
    label: '3000msc',
    eventCodes: ['3000msc']
  },
  '5000m': {
    id: '5000m',
    label: '5000m',
    eventCodes: ['5000m']
  },
  '10000m': {
    id: '10000m',
    label: '10000m',
    eventCodes: ['10000m']
  },
  highJump: {
    id: 'highJump',
    label: '走高跳',
    eventCodes: ['highJump']
  },
  longJump: {
    id: 'longJump',
    label: '走幅跳',
    eventCodes: ['longJump']
  },
  poleVault: {
    id: 'poleVault',
    label: '棒高跳',
    eventCodes: ['poleVault']
  },
  tripleJump: {
    id: 'tripleJump',
    label: '三段跳',
    eventCodes: ['tripleJump']
  },
  shotPut: {
    id: 'shotPut',
    label: '砲丸投',
    eventCodes: ['shotPut']
  },
  discusThrow: {
    id: 'discusThrow',
    label: '円盤投',
    eventCodes: ['discusThrow']
  },
  hammerThrow: {
    id: 'hammerThrow',
    label: 'ハンマー投',
    eventCodes: ['hammerThrow']
  },
  javelinThrow: {
    id: 'javelinThrow',
    label: 'やり投',
    eventCodes: ['javelinThrow']
  }
};

export const shoeEventCategories: {
  [key in EventCategoryCode]: IEventItem;
} = {
  shortDistance: {
    id: 'shortDistance',
    label: '短距離',
    eventCodes: ['100m', '200m', '400m', '110mH', '400mH']
  },
  middleDistance: {
    id: 'middleDistance',
    label: '中距離',
    eventCodes: ['800m', '1500m']
  },
  longDistance: {
    id: 'longDistance',
    label: '長距離',
    eventCodes: ['3000m', '5000m', '10000m', '3000msc']
  },
  jumping: {
    id: 'jumping',
    label: '跳躍',
    eventCodes: ['longJump', 'highJump', 'tripleJump', 'poleVault']
  },
  throwing: {
    id: 'throwing',
    label: '投てき',
    eventCodes: ['shotPut', 'discusThrow', 'javelinThrow', 'hammerThrow']
  }
};

export const shoeEventsAndEventCategories: {
  [key in EventsAndEventCategoriesCode]: IEventItem;
} = {
  ...shoeEvents,
  ...shoeEventCategories
} as const;
