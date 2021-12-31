// ISpikeShoesFieldsのeventsからコピー
export type EventCode =
  | '100m'
  | '200m'
  | '400m'
  | '110mH'
  | '400mH'
  | '800m'
  | '1500m'
  | '3000m'
  | '3000msc'
  | '5000m'
  | '10000m'
  | 'highJump'
  | 'longJump'
  | 'poleVault'
  | 'tripleJump'
  | 'shotPut'
  | 'discusThrow'
  | 'hammerThrow'
  | 'javelinThrow';

export type EventCategoryCode =
  | 'shortDistance'
  | 'middleDistance'
  | 'longDistance'
  | 'jumping'
  | 'throwing';

export type EventsAndEventCategoriesCode = EventCode | EventCategoryCode;

export interface IEventItem {
  id: EventsAndEventCategoriesCode;
  label: string;
  events: EventCode[];
}

export const shoeEvents: {
  [key in EventCode]: IEventItem;
} = {
  '100m': {
    id: '100m',
    label: '100m',
    events: ['100m']
  },
  '200m': {
    id: '200m',
    label: '200m',
    events: ['200m']
  },
  '400m': {
    id: '400m',
    label: '400m',
    events: ['400m']
  },
  '110mH': {
    id: '110mH',
    label: '110mH',
    events: ['110mH']
  },
  '400mH': {
    id: '400mH',
    label: '400mH',
    events: ['400mH']
  },
  '800m': {
    id: '800m',
    label: '800m',
    events: ['800m']
  },
  '1500m': {
    id: '1500m',
    label: '1500m',
    events: ['1500m']
  },
  '3000m': {
    id: '3000m',
    label: '3000m',
    events: ['3000m']
  },
  '3000msc': {
    id: '3000msc',
    label: '3000msc',
    events: ['3000msc']
  },
  '5000m': {
    id: '5000m',
    label: '5000m',
    events: ['5000m']
  },
  '10000m': {
    id: '10000m',
    label: '10000m',
    events: ['10000m']
  },
  highJump: {
    id: 'highJump',
    label: '走高跳',
    events: ['highJump']
  },
  longJump: {
    id: 'longJump',
    label: '走高跳',
    events: ['longJump']
  },
  poleVault: {
    id: 'poleVault',
    label: '棒高跳',
    events: ['poleVault']
  },
  tripleJump: {
    id: 'tripleJump',
    label: '三段跳',
    events: ['tripleJump']
  },
  shotPut: {
    id: 'shotPut',
    label: '砲丸投',
    events: ['shotPut']
  },
  discusThrow: {
    id: 'discusThrow',
    label: '円盤投',
    events: ['discusThrow']
  },
  hammerThrow: {
    id: 'hammerThrow',
    label: 'ハンマー投',
    events: ['hammerThrow']
  },
  javelinThrow: {
    id: 'javelinThrow',
    label: 'やり投',
    events: ['javelinThrow']
  }
};

export const shoeEventCategories: {
  [key in EventCategoryCode]: IEventItem;
} = {
  'shortDistance': {
    id: 'shortDistance',
    label: '短距離',
    events: ['100m', '200m', '400m', '110mH', '400mH']
  },
  'middleDistance': {
    id: 'middleDistance',
    label: '中距離',
    events: ['800m', '1500m']
  },
  'longDistance': {
    id: 'longDistance',
    label: '長距離',
    events: ['3000m', '5000m', '10000m', '3000msc']
  },
  jumping: {
    id: 'jumping',
    label: '跳躍',
    events: ['longJump', 'highJump', 'tripleJump', 'poleVault']
  },
  throwing: {
    id: 'throwing',
    label: '投てき',
    events: ['shotPut', 'discusThrow', 'javelinThrow', 'hammerThrow']
  }
};

export const shoeEventsAndEventCategories: {
  [key in EventsAndEventCategoriesCode]: IEventItem;
} = {
  ...shoeEvents,
  ...shoeEventCategories
};
