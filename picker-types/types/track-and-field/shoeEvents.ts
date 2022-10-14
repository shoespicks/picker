import { ISpikeShoesFields } from 'picker-types/generated/contentful';
import { AthleteLevelCode } from './athleteLevel';

export type EventCode = Exclude<ISpikeShoesFields['events'], undefined>[number];

export type EventCategoryCode = 'shortDistance' | 'middleDistance' | 'longDistance' | 'jumping' | 'throwing';

export type EventsAndEventCategoriesCode = EventCode | EventCategoryCode;

export type IEventItem = {
  readonly id: EventCode;
  readonly label: string;
  readonly eventCodes: EventCode[];
};

export type IEventCategoryItem = {
  readonly id: EventCategoryCode;
  readonly label: string;
  readonly eventCodes: EventCode[];
};

export const shoeEvents: {
  [key in EventCode]: IEventItem;
} = {
  e100m: {
    id: 'e100m',
    label: '100m',
    eventCodes: ['e100m'],
  },
  e200m: {
    id: 'e200m',
    label: '200m',
    eventCodes: ['e200m'],
  },
  e400m: {
    id: 'e400m',
    label: '400m',
    eventCodes: ['e400m'],
  },
  e110mH: {
    id: 'e110mH',
    label: '110mH',
    eventCodes: ['e110mH'],
  },
  e400mH: {
    id: 'e400mH',
    label: '400mH',
    eventCodes: ['e400mH'],
  },
  e800m: {
    id: 'e800m',
    label: '800m',
    eventCodes: ['e800m'],
  },
  e1500m: {
    id: 'e1500m',
    label: '1500m',
    eventCodes: ['e1500m'],
  },
  e3000m: {
    id: 'e3000m',
    label: '3000m',
    eventCodes: ['e3000m'],
  },
  e3000msc: {
    id: 'e3000msc',
    label: '3000msc',
    eventCodes: ['e3000msc'],
  },
  e5000m: {
    id: 'e5000m',
    label: '5000m',
    eventCodes: ['e5000m'],
  },
  e10000m: {
    id: 'e10000m',
    label: '10000m',
    eventCodes: ['e10000m'],
  },
  highJump: {
    id: 'highJump',
    label: '走高跳',
    eventCodes: ['highJump'],
  },
  longJump: {
    id: 'longJump',
    label: '走幅跳',
    eventCodes: ['longJump'],
  },
  poleVault: {
    id: 'poleVault',
    label: '棒高跳',
    eventCodes: ['poleVault'],
  },
  tripleJump: {
    id: 'tripleJump',
    label: '三段跳',
    eventCodes: ['tripleJump'],
  },
  shotPut: {
    id: 'shotPut',
    label: '砲丸投',
    eventCodes: ['shotPut'],
  },
  discusThrow: {
    id: 'discusThrow',
    label: '円盤投',
    eventCodes: ['discusThrow'],
  },
  hammerThrow: {
    id: 'hammerThrow',
    label: 'ハンマー投',
    eventCodes: ['hammerThrow'],
  },
  javelinThrow: {
    id: 'javelinThrow',
    label: 'やり投',
    eventCodes: ['javelinThrow'],
  },
};

export const shoeEventCategories: {
  [key in EventCategoryCode]: IEventCategoryItem;
} = {
  shortDistance: {
    id: 'shortDistance',
    label: '短距離',
    eventCodes: ['e100m', 'e200m', 'e400m', 'e110mH', 'e400mH'],
  },
  middleDistance: {
    id: 'middleDistance',
    label: '中距離',
    eventCodes: ['e800m', 'e1500m'],
  },
  longDistance: {
    id: 'longDistance',
    label: '長距離',
    eventCodes: ['e3000m', 'e5000m', 'e10000m', 'e3000msc'],
  },
  jumping: {
    id: 'jumping',
    label: '跳躍',
    eventCodes: ['longJump', 'highJump', 'tripleJump', 'poleVault'],
  },
  throwing: {
    id: 'throwing',
    label: '投てき',
    eventCodes: ['shotPut', 'discusThrow', 'javelinThrow', 'hammerThrow'],
  },
};

export type ICompetitivenessItem = {
  readonly [key in AthleteLevelCode]: string;
};

export const shoeEventsAndEventCategories: {
  [key in EventsAndEventCategoriesCode]: IEventItem | IEventCategoryItem;
} = {
  ...shoeEvents,
  ...shoeEventCategories,
} as const;

export const competitiveness: {
  [key in EventCode]: ICompetitivenessItem;
} = {
  e100m: {
    beginner: '男性12秒80〜｜女性13秒60〜',
    intermediate: '男性12秒00〜12秒79｜女性13秒00〜13秒59',
    advanced: '男性11秒00〜11秒99｜女性12秒40〜12秒99',
    professional: '男性〜10秒99｜女性〜12秒40',
  },
  e200m: {
    beginner: '男性24秒00〜｜女性27秒00〜',
    intermediate: '男性23秒20〜23秒99｜女性26秒00〜26秒99',
    advanced: '男性22秒50〜23秒19｜女性25秒50〜25秒99',
    professional: '男性〜22秒49｜女性〜25秒49',
  },
  e400m: {
    beginner: '男性55秒00〜｜女性60秒00〜',
    intermediate: '男性53秒00〜54秒99｜女性59秒00〜59秒99',
    advanced: '男性50秒00〜53秒49｜女性57秒50〜58秒99',
    professional: '男性〜50秒00｜女性〜57秒49',
  },
  e110mH: {
    beginner: '男性17秒00〜｜女性16秒50〜',
    intermediate: '男性16秒00〜16秒99｜女性15秒60〜16秒49',
    advanced: '男性15秒20〜15秒99｜女性15秒00〜15秒59',
    professional: '男性〜15秒19｜女性〜14秒99',
  },
  e400mH: {
    beginner: '男性58秒〜｜女性67秒50〜',
    intermediate: '男性57秒00〜57秒99｜女性66秒00〜67秒49',
    advanced: '男性56秒20〜56秒99｜女性64秒70〜65秒99',
    professional: '男性〜56秒19｜女性〜64秒70',
  },
  e800m: {
    beginner: '男性2分25秒00〜｜女性2分35秒00〜',
    intermediate: '男性2分14秒50〜2分24秒99｜女性2分24秒00〜2分34秒99',
    advanced: '男性1分58秒00〜2分14秒49｜女性2分16秒00〜2分23秒99',
    professional: '男性〜1分57秒99｜女性〜2分15秒99',
  },
  e1500m: {
    beginner: '男性5分00秒00〜｜女性6分00秒00〜',
    intermediate: '男性4分30秒00〜4分59秒99｜女性5分00秒00〜5分59秒99',
    advanced: '男性4分06秒00〜4分29秒99｜女性4分35秒00〜4分59秒99',
    professional: '男性〜4分05秒99｜女性〜4分34秒99',
  },
  e3000m: {
    beginner: '男性10分20秒00〜｜女性11分00秒00〜',
    intermediate: '男性9分40秒00〜10分19秒99｜女性10分35秒00〜10分59秒99',
    advanced: '男性8分50秒00〜9分39秒99｜女性9分55秒00〜10分34秒99',
    professional: '男性〜8分49秒99｜女性〜9分49秒99',
  },
  e3000msc: {
    beginner: '男性11分00秒00〜｜女性12分20秒00〜',
    intermediate: '男性10分00秒00〜10分59秒99｜女性11分30秒00〜12分19秒99',
    advanced: '男性9分30秒00〜9分59秒99｜女性10分30秒00〜11分29秒99',
    professional: '男性〜9分29秒99｜女性〜10分29秒99',
  },
  e5000m: {
    beginner: '男性17分00秒00〜｜女性18分30秒00〜',
    intermediate: '男性16分00秒00〜16分59秒99｜女性17分30秒00〜18分29秒99',
    advanced: '男性15分00秒00〜15分59秒99｜女性16分30秒00〜17分29秒99',
    professional: '男性〜14分59秒99｜女性〜16分29秒99',
  },
  e10000m: {
    beginner: '男性34分00秒00〜｜女性37分00秒00〜',
    intermediate: '男性32分00秒00〜33分59秒99｜女性36分00秒00〜36分59秒99',
    advanced: '男性30分00秒00〜31分59秒99｜女性34分00秒00〜35分59秒99',
    professional: '男性〜29分59秒99｜女性〜33分59秒99',
  },
  longJump: {
    beginner: '男性〜4m90｜女性〜4m00',
    intermediate: '男性4m91〜5m99｜女性4m01〜4m99',
    advanced: '男性6m00〜6m90｜女性5m00〜5m50',
    professional: '男性6m91〜｜女性5m51〜',
  },
  tripleJump: {
    beginner: '男性〜12m00｜女性〜9m50',
    intermediate: '男性12m01〜12m80｜女性9m51〜10m10',
    advanced: '男性12m81〜13m80｜女性10m11〜11m30',
    professional: '男性13m81〜｜女性11m31〜',
  },
  poleVault: {
    beginner: '男性〜2m50｜女性〜2m00',
    intermediate: '男性2m51〜3m00｜女性2m01〜2m40',
    advanced: '男性3m01〜4m40｜女性2m41〜3m20',
    professional: '男性4m41〜｜女性3m21〜',
  },
  highJump: {
    beginner: '男性〜1m40｜女性〜1m30',
    intermediate: '男性1m41〜1m60｜女性1m31〜1m44',
    advanced: '男性1m61〜1m90｜女性1m45〜1m63',
    professional: '男性1m90〜｜女性1m63〜',
  },
  javelinThrow: {
    beginner: '男性〜40m｜女性〜30m',
    intermediate: '男性41m〜50m｜女性31m〜36m',
    advanced: '男性51m〜60m｜女性37m〜42m',
    professional: '男性61m〜｜女性42m〜',
  },
  shotPut: {
    beginner: '未対応',
    intermediate: '未対応',
    advanced: '未対応',
    professional: '未対応',
  },
  discusThrow: {
    beginner: '未対応',
    intermediate: '未対応',
    advanced: '未対応',
    professional: '未対応',
  },
  hammerThrow: {
    beginner: '未対応',
    intermediate: '未対応',
    advanced: '未対応',
    professional: '未対応',
  },
};
