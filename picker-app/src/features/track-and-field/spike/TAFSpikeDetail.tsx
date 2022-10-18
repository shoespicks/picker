import React, { type FC } from 'react';
import { IconName, iconNames } from 'picker-types/types/track-and-field/icons';
import { Icon } from 'components/atoms/Icon';
import { Radar } from 'components/atoms/Radar';
import { P, Strong } from 'components/atoms/Typography';
import { spikeIconMap } from 'features/track-and-field/constants/spikeIconMap';
import { SpikeFragment } from 'graphql/generated/codegen-client';

type Props = {
  spike: SpikeFragment;
};

export const TAFSpikeDetail: FC<Props> = ({ spike }) => {
  return (
    <>
      <div>
        <Radar
          data={[4, 3, 2, 4.5, 5]}
          labels={['軽さ', '    広さ', '   反り', 'グリップ力    ', '反発性    ']}
        ></Radar>
        {spike.strength?.length && (
          <ul>
            {spike.strength.map((s, index) => (
              <li key={index}>
                <>
                  {s.icon && iconNames.includes(s.icon as IconName) && (
                    <Icon icon={spikeIconMap[s.icon as IconName]}></Icon>
                  )}
                  <div>
                    {s.icon && <Strong semiBold>{s.icon}</Strong>}
                    {s.label && <Strong semiBold>{s.label}</Strong>}
                    {s.description && <P>{s.description}</P>}
                  </div>
                </>
                )
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
