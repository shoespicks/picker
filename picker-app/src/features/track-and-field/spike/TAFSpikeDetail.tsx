import React, { type FC } from 'react';
import { Radar } from 'components/atoms/Radar';
import { SpikeFragment } from 'graphql/generated/codegen-client';

type Props = {
  spike: SpikeFragment;
};

export const TAFSpikeDetail: FC<Props> = ({ spike }) => {
  return (
    <>
      <Radar data={[4, 3, 2, 4.5, 5]} labels={['軽さ', '    広さ', '   反り', 'グリップ力    ', '反発性    ']}></Radar>
    </>
  );
};
