/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type { Context } from './../../context';
import type { core } from 'nexus';
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>
    ): void; // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void; // "DateTime";
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  SpikeInput: {
    // input type
    id: string; // String!
  };
  SpikesInput: {
    // input type
    allWeatherOnly?: boolean | null; // Boolean
    athleteLevel?: NexusGenEnums['TAFAthleteLevel'][] | null; // [TAFAthleteLevel!]
    brands?: NexusGenEnums['TAFBrands'][] | null; // [TAFBrands!]
    events?: NexusGenEnums['TAFEvents'][] | null; // [TAFEvents!]
    keyword?: string | null; // String
    latestOnly?: boolean | null; // Boolean
    limit?: number | null; // Int
    order?: NexusGenEnums['TAFShoeOrder'] | null; // TAFShoeOrder
    pinCountRangeMax?: number | null; // Int
    pinCountRangeMin?: number | null; // Int
    priceRangeMax?: number | null; // Int
    priceRangeMin?: number | null; // Int
    shoeColor?: Array<string | null> | null; // [String]
    shoeLaceType?: NexusGenEnums['TAFShoeLaceType'][] | null; // [TAFShoeLaceType!]
    years?: string[] | null; // [String!]
  };
  UpdateProfileInput: {
    // input type
    birthdate: NexusGenScalars['DateTime']; // DateTime!
    gender: NexusGenEnums['GenderEnum']; // GenderEnum!
    introduction?: string | null; // String
    prefecture: NexusGenEnums['PrefectureEnum']; // PrefectureEnum!
  };
  UpdateUserInput: {
    // input type
    email?: string | null; // String
    image?: string | null; // String
    name?: string | null; // String
  };
}

export interface NexusGenEnums {
  GenderEnum: 'FEMALE' | 'MALE' | 'OTHER';
  PrefectureEnum: 'KANAGAWA' | 'SAITAMA' | 'TOKYO';
  TAFAthleteLevel: 'advanced' | 'beginner' | 'intermediate' | 'professional';
  TAFBrands: 'adidas' | 'asics' | 'mizuno' | 'newBalance' | 'nike';
  TAFEvents:
    | 'discusThrow'
    | 'e100m'
    | 'e110mH'
    | 'e200m'
    | 'e400m'
    | 'e400mH'
    | 'e800m'
    | 'e1500m'
    | 'e3000m'
    | 'e3000msc'
    | 'e5000m'
    | 'e10000m'
    | 'hammerThrow'
    | 'highJump'
    | 'javelinThrow'
    | 'longJump'
    | 'poleVault'
    | 'shotPut'
    | 'tripleJump';
  TAFShoeLaceType: 'belt' | 'lace';
  TAFShoeOrder:
    | 'expensive'
    | 'flat'
    | 'gripPower'
    | 'hard'
    | 'highscore'
    | 'inexpensive'
    | 'light'
    | 'narrow'
    | 'warp'
    | 'wide';
}

export interface NexusGenScalars {
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: any;
}

export interface NexusGenObjects {
  AricleItem: {
    // root type
    description?: string | null; // String
    id: string; // ID!
    imageUrls?: string[] | null; // [String!]
    title?: string | null; // String
  };
  ColorImages: {
    // root type
    colorCode: string; // String!
    colorId: string; // ID!
    imageUrls: string[]; // [String!]!
  };
  Mutation: {};
  Query: {};
  Spike: {
    // root type
    allWeatherOnly?: boolean | null; // Boolean
    amazonUrl?: string | null; // String
    angleScore?: number | null; // Float
    brand?: NexusGenEnums['TAFBrands'] | null; // TAFBrands
    brandPageUrl?: string | null; // String
    colorImages: NexusGenRootTypes['ColorImages'][]; // [ColorImages!]!
    detailSpec?: NexusGenRootTypes['SpikeDetailSpec'] | null; // SpikeDetailSpec
    events?: NexusGenRootTypes['TAFShoeEvents'][] | null; // [TAFShoeEvents!]
    gripScore?: number | null; // Float
    hardnessScore?: number | null; // Float
    id: string; // String!
    keyFeature?: NexusGenRootTypes['AricleItem'][] | null; // [AricleItem!]
    lightnessScore?: number | null; // Float
    name: string; // String!
    nameEn?: string | null; // String
    newModels?: NexusGenRootTypes['ISpikeBase'][] | null; // [ISpikeBase!]
    price?: number | null; // Int
    rakutenUrl?: string | null; // String
    recommendItems?: NexusGenRootTypes['ISpikeBase'][] | null; // [ISpikeBase!]
    recommendedFor?: string | null; // String
    score?: number | null; // Int
    strength?: NexusGenRootTypes['Strength'][] | null; // [Strength!]
    weight?: number | null; // Int
    widthScore?: number | null; // Float
  };
  SpikeBase: {
    // root type
    allWeatherOnly?: boolean | null; // Boolean
    angleScore?: number | null; // Float
    brand?: NexusGenEnums['TAFBrands'] | null; // TAFBrands
    colorImages: NexusGenRootTypes['ColorImages'][]; // [ColorImages!]!
    events?: NexusGenRootTypes['TAFShoeEvents'][] | null; // [TAFShoeEvents!]
    gripScore?: number | null; // Float
    hardnessScore?: number | null; // Float
    id: string; // String!
    lightnessScore?: number | null; // Float
    name: string; // String!
    nameEn?: string | null; // String
    price?: number | null; // Int
    score?: number | null; // Int
    weight?: number | null; // Int
    widthScore?: number | null; // Float
  };
  SpikeDetailSpec: {
    // root type
    allWeatherOnly?: string | null; // String
    athleteLevel?: string | null; // String
    events?: string | null; // String
    madeIn?: string | null; // String
    name?: string | null; // String
    pinDetail?: string | null; // String
    price?: string | null; // String
    releaseYear?: string | null; // String
    shoeLaceType?: string | null; // String
    size?: string | null; // String
    soleMaterial?: string | null; // String
    upperMaterial?: string | null; // String
    weight?: string | null; // String
  };
  Strength: {
    // root type
    description?: string | null; // String
    icon?: string | null; // String
    label?: string | null; // String
  };
  TAFShoeEvents: {
    // root type
    id: NexusGenEnums['TAFEvents']; // TAFEvents!
    label: string; // String!
  };
  User: {
    // root type
    email?: string | null; // String
    id: string; // ID!
    image?: string | null; // String
    name?: string | null; // String
  };
  UserProfile: {
    // root type
    birthdate: NexusGenScalars['DateTime']; // DateTime!
    gender: NexusGenEnums['GenderEnum']; // GenderEnum!
    id: string; // ID!
    introduction?: string | null; // String
    prefecture: NexusGenEnums['PrefectureEnum']; // PrefectureEnum!
  };
}

export interface NexusGenInterfaces {
  ISpikeBase: NexusGenRootTypes['Spike'] | NexusGenRootTypes['SpikeBase'];
  ISpikeDetail: NexusGenRootTypes['Spike'];
}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects;

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums;

export interface NexusGenFieldTypes {
  AricleItem: {
    // field return type
    description: string | null; // String
    id: string; // ID!
    imageUrls: string[] | null; // [String!]
    title: string | null; // String
  };
  ColorImages: {
    // field return type
    colorCode: string; // String!
    colorId: string; // ID!
    imageUrls: string[]; // [String!]!
  };
  Mutation: {
    // field return type
    updateUserProfile: boolean | null; // Boolean
  };
  Query: {
    // field return type
    spike: NexusGenRootTypes['Spike'] | null; // Spike
    spikes: NexusGenRootTypes['SpikeBase'][]; // [SpikeBase!]!
    userProfile: NexusGenRootTypes['User'] | null; // User
  };
  Spike: {
    // field return type
    allWeatherOnly: boolean | null; // Boolean
    amazonUrl: string | null; // String
    angleScore: number | null; // Float
    brand: NexusGenEnums['TAFBrands'] | null; // TAFBrands
    brandPageUrl: string | null; // String
    colorImages: NexusGenRootTypes['ColorImages'][]; // [ColorImages!]!
    detailSpec: NexusGenRootTypes['SpikeDetailSpec'] | null; // SpikeDetailSpec
    events: NexusGenRootTypes['TAFShoeEvents'][] | null; // [TAFShoeEvents!]
    gripScore: number | null; // Float
    hardnessScore: number | null; // Float
    id: string; // String!
    keyFeature: NexusGenRootTypes['AricleItem'][] | null; // [AricleItem!]
    lightnessScore: number | null; // Float
    name: string; // String!
    nameEn: string | null; // String
    newModels: NexusGenRootTypes['ISpikeBase'][] | null; // [ISpikeBase!]
    price: number | null; // Int
    rakutenUrl: string | null; // String
    recommendItems: NexusGenRootTypes['ISpikeBase'][] | null; // [ISpikeBase!]
    recommendedFor: string | null; // String
    score: number | null; // Int
    strength: NexusGenRootTypes['Strength'][] | null; // [Strength!]
    weight: number | null; // Int
    widthScore: number | null; // Float
  };
  SpikeBase: {
    // field return type
    allWeatherOnly: boolean | null; // Boolean
    angleScore: number | null; // Float
    brand: NexusGenEnums['TAFBrands'] | null; // TAFBrands
    colorImages: NexusGenRootTypes['ColorImages'][]; // [ColorImages!]!
    events: NexusGenRootTypes['TAFShoeEvents'][] | null; // [TAFShoeEvents!]
    gripScore: number | null; // Float
    hardnessScore: number | null; // Float
    id: string; // String!
    lightnessScore: number | null; // Float
    name: string; // String!
    nameEn: string | null; // String
    price: number | null; // Int
    score: number | null; // Int
    weight: number | null; // Int
    widthScore: number | null; // Float
  };
  SpikeDetailSpec: {
    // field return type
    allWeatherOnly: string | null; // String
    athleteLevel: string | null; // String
    events: string | null; // String
    madeIn: string | null; // String
    name: string | null; // String
    pinDetail: string | null; // String
    price: string | null; // String
    releaseYear: string | null; // String
    shoeLaceType: string | null; // String
    size: string | null; // String
    soleMaterial: string | null; // String
    upperMaterial: string | null; // String
    weight: string | null; // String
  };
  Strength: {
    // field return type
    description: string | null; // String
    icon: string | null; // String
    label: string | null; // String
  };
  TAFShoeEvents: {
    // field return type
    id: NexusGenEnums['TAFEvents']; // TAFEvents!
    label: string; // String!
  };
  User: {
    // field return type
    email: string | null; // String
    id: string; // ID!
    image: string | null; // String
    name: string | null; // String
    profile: NexusGenRootTypes['UserProfile'] | null; // UserProfile
  };
  UserProfile: {
    // field return type
    birthdate: NexusGenScalars['DateTime']; // DateTime!
    gender: NexusGenEnums['GenderEnum']; // GenderEnum!
    id: string; // ID!
    introduction: string | null; // String
    prefecture: NexusGenEnums['PrefectureEnum']; // PrefectureEnum!
  };
  ISpikeBase: {
    // field return type
    allWeatherOnly: boolean | null; // Boolean
    angleScore: number | null; // Float
    brand: NexusGenEnums['TAFBrands'] | null; // TAFBrands
    colorImages: NexusGenRootTypes['ColorImages'][]; // [ColorImages!]!
    events: NexusGenRootTypes['TAFShoeEvents'][] | null; // [TAFShoeEvents!]
    gripScore: number | null; // Float
    hardnessScore: number | null; // Float
    id: string; // String!
    lightnessScore: number | null; // Float
    name: string; // String!
    nameEn: string | null; // String
    price: number | null; // Int
    score: number | null; // Int
    weight: number | null; // Int
    widthScore: number | null; // Float
  };
  ISpikeDetail: {
    // field return type
    amazonUrl: string | null; // String
    brandPageUrl: string | null; // String
    detailSpec: NexusGenRootTypes['SpikeDetailSpec'] | null; // SpikeDetailSpec
    keyFeature: NexusGenRootTypes['AricleItem'][] | null; // [AricleItem!]
    newModels: NexusGenRootTypes['ISpikeBase'][] | null; // [ISpikeBase!]
    rakutenUrl: string | null; // String
    recommendItems: NexusGenRootTypes['ISpikeBase'][] | null; // [ISpikeBase!]
    recommendedFor: string | null; // String
    strength: NexusGenRootTypes['Strength'][] | null; // [Strength!]
  };
}

export interface NexusGenFieldTypeNames {
  AricleItem: {
    // field return type name
    description: 'String';
    id: 'ID';
    imageUrls: 'String';
    title: 'String';
  };
  ColorImages: {
    // field return type name
    colorCode: 'String';
    colorId: 'ID';
    imageUrls: 'String';
  };
  Mutation: {
    // field return type name
    updateUserProfile: 'Boolean';
  };
  Query: {
    // field return type name
    spike: 'Spike';
    spikes: 'SpikeBase';
    userProfile: 'User';
  };
  Spike: {
    // field return type name
    allWeatherOnly: 'Boolean';
    amazonUrl: 'String';
    angleScore: 'Float';
    brand: 'TAFBrands';
    brandPageUrl: 'String';
    colorImages: 'ColorImages';
    detailSpec: 'SpikeDetailSpec';
    events: 'TAFShoeEvents';
    gripScore: 'Float';
    hardnessScore: 'Float';
    id: 'String';
    keyFeature: 'AricleItem';
    lightnessScore: 'Float';
    name: 'String';
    nameEn: 'String';
    newModels: 'ISpikeBase';
    price: 'Int';
    rakutenUrl: 'String';
    recommendItems: 'ISpikeBase';
    recommendedFor: 'String';
    score: 'Int';
    strength: 'Strength';
    weight: 'Int';
    widthScore: 'Float';
  };
  SpikeBase: {
    // field return type name
    allWeatherOnly: 'Boolean';
    angleScore: 'Float';
    brand: 'TAFBrands';
    colorImages: 'ColorImages';
    events: 'TAFShoeEvents';
    gripScore: 'Float';
    hardnessScore: 'Float';
    id: 'String';
    lightnessScore: 'Float';
    name: 'String';
    nameEn: 'String';
    price: 'Int';
    score: 'Int';
    weight: 'Int';
    widthScore: 'Float';
  };
  SpikeDetailSpec: {
    // field return type name
    allWeatherOnly: 'String';
    athleteLevel: 'String';
    events: 'String';
    madeIn: 'String';
    name: 'String';
    pinDetail: 'String';
    price: 'String';
    releaseYear: 'String';
    shoeLaceType: 'String';
    size: 'String';
    soleMaterial: 'String';
    upperMaterial: 'String';
    weight: 'String';
  };
  Strength: {
    // field return type name
    description: 'String';
    icon: 'String';
    label: 'String';
  };
  TAFShoeEvents: {
    // field return type name
    id: 'TAFEvents';
    label: 'String';
  };
  User: {
    // field return type name
    email: 'String';
    id: 'ID';
    image: 'String';
    name: 'String';
    profile: 'UserProfile';
  };
  UserProfile: {
    // field return type name
    birthdate: 'DateTime';
    gender: 'GenderEnum';
    id: 'ID';
    introduction: 'String';
    prefecture: 'PrefectureEnum';
  };
  ISpikeBase: {
    // field return type name
    allWeatherOnly: 'Boolean';
    angleScore: 'Float';
    brand: 'TAFBrands';
    colorImages: 'ColorImages';
    events: 'TAFShoeEvents';
    gripScore: 'Float';
    hardnessScore: 'Float';
    id: 'String';
    lightnessScore: 'Float';
    name: 'String';
    nameEn: 'String';
    price: 'Int';
    score: 'Int';
    weight: 'Int';
    widthScore: 'Float';
  };
  ISpikeDetail: {
    // field return type name
    amazonUrl: 'String';
    brandPageUrl: 'String';
    detailSpec: 'SpikeDetailSpec';
    keyFeature: 'AricleItem';
    newModels: 'ISpikeBase';
    rakutenUrl: 'String';
    recommendItems: 'ISpikeBase';
    recommendedFor: 'String';
    strength: 'Strength';
  };
}

export interface NexusGenArgTypes {
  Mutation: {
    updateUserProfile: {
      // args
      id: string; // String!
      profileInput: NexusGenInputs['UpdateProfileInput']; // UpdateProfileInput!
      userInput: NexusGenInputs['UpdateUserInput']; // UpdateUserInput!
    };
  };
  Query: {
    spike: {
      // args
      input: NexusGenInputs['SpikeInput']; // SpikeInput!
    };
    spikes: {
      // args
      input: NexusGenInputs['SpikesInput']; // SpikesInput!
    };
    userProfile: {
      // args
      id: string; // String!
    };
  };
}

export interface NexusGenAbstractTypeMembers {
  ISpikeBase: 'Spike' | 'SpikeBase';
  ISpikeDetail: 'Spike';
}

export interface NexusGenTypeInterfaces {
  Spike: 'ISpikeBase' | 'ISpikeDetail';
  SpikeBase: 'ISpikeBase';
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = keyof NexusGenInterfaces;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    resolveType: false;
    __typename: false;
    isTypeOf: false;
  };
};

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes:
    | NexusGenTypes['objectNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['unionNames']
    | NexusGenTypes['interfaceNames']
    | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes'];
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {}
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}
