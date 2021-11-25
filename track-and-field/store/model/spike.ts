import { Entry } from 'contentful';
import {
  ISpikeArticlesFields,
  ISpikeShoesFields
} from '~/types/generated/contentful';
import { shoeColorsCode } from '~/types/shoes/shoeColors';

export interface IShoeColorVariation {
  id: shoeColorsCode;
  imageUrls: string[];
}

export interface IShoeStrength {
  icon: string;
  label: string;
  description?: string;
}

export interface IShoeKeyFeature {
  id: string;
  title?: string;
  imageUrls?: string[];
  description?: string;
}

/**
 * スパイク記事のModel
 * ContentfulのISpikeShoesFields型とISpikeArticlesFields型どちらも継承
 */
export interface ISpikeModel
  extends Omit<
      ISpikeShoesFields,
      'spikeArticle' | 'recommendItems' | 'newModels'
    >,
    ISpikeArticlesFields {
  id: string;
  name: string;
  colorVariations?: IShoeColorVariation[];
  reviewRating?: number;
  strength?: IShoeStrength[];
  keyFeatures?: IShoeKeyFeature[];
  recommendItems?: ISpikeModel[];
  newModels?: ISpikeModel[];
}

export const transrateSpikeEntityToModel = (
  entity: Entry<ISpikeShoesFields>,
  ignoreLinkFields = false // おすすめスパイク等の他スパイクへの参照を無視する場合true
): ISpikeModel | null => {
  if (!entity?.fields) {
    return null;
  }

  const spikeFields = { ...entity.fields };
  delete spikeFields.spikeArticle;
  delete spikeFields.recommendItems;
  delete spikeFields.newModels;

  return {
    ...spikeFields,
    ...(entity.fields?.spikeArticle?.fields || {}),
    id: entity.sys.id,
    colorVariations: createColorVariations(entity),
    reviewRating: 3.8,
    keyFeatures: createKeyFeatures(entity?.fields?.spikeArticle?.fields),
    strength: createsStrength(entity.fields?.spikeArticle?.fields?.strength),
    recommendItems: ignoreLinkFields
      ? []
      : entity.fields?.recommendItems?.flatMap(
          (item) => transrateSpikeEntityToModel(item, true) || []
        ),
    newModels: ignoreLinkFields
      ? []
      : entity.fields?.newModels?.flatMap(
          (item) => transrateSpikeEntityToModel(item, true) || []
        )
  };
};

const createKeyFeatures = (
  fields?: ISpikeArticlesFields
): IShoeKeyFeature[] | undefined => {
  if (!fields) {
    return undefined;
  }

  const keyFeatures: IShoeKeyFeature[] = [];

  for (let i = 1; i < 5; i++) {
    if (fields[`keyFeatureTitle${i}` as keyof ISpikeArticlesFields]) {
      keyFeatures.push({
        id: i.toString(),
        title:
          (fields[
            `keyFeatureTitle${i}` as keyof ISpikeArticlesFields
          ] as string) || '',
        imageUrls:
          (fields[
            `keyFeatureImageUrls${i}` as keyof ISpikeArticlesFields
          ] as string[]) || [],
        description:
          (
            fields[
              `keyFeatureDescription${i}` as keyof ISpikeArticlesFields
            ] as string
          )?.trim() || ''
      });
    }
  }

  return keyFeatures;
};

const createColorVariations = (
  entity: Entry<ISpikeShoesFields>
): IShoeColorVariation[] | undefined => {
  return entity.fields?.colors?.map((color, index) => {
    const colorVariationImageKey: keyof ISpikeShoesFields =
      `colorVariationImage${index + 1}` as keyof ISpikeShoesFields;

    return {
      id: color,
      imageUrls: entity.fields[colorVariationImageKey] as string[]
    };
  });
};

const createsStrength = (
  strength: Record<string, any> | undefined
): IShoeStrength[] => {
  return strength?.map((s: { [key: string]: string }) => ({
    icon: s?.icon || '',
    label: s?.label || '',
    description: s?.description || ''
  }));
};
