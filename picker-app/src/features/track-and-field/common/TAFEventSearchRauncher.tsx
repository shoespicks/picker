import React, { type FC, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { IEventItem } from 'picker-types/types/track-and-field/shoeEvents';
import { Select } from 'components/atoms/Select';
import { TAF_SEARCH_PAGE_PATH } from 'features/track-and-field/constants/routing';
import { searchFormOptions } from 'features/track-and-field/constants/search';
import { useSearchSpike } from 'features/track-and-field/hooks/useSearchSpike';

type Props = {
  onSubmit(events: IEventItem): void;
};

export const TAFEventSearchRauncher: FC<Props> = ({ onSubmit }) => {
  const [event, setEvent] = useState<IEventItem>();

  const handleChange = useCallback(
    (events: IEventItem) => {
      setEvent(events);
      onSubmit && onSubmit(events);
    },
    [onSubmit]
  );

  return (
    <Select<IEventItem>
      value={event}
      options={searchFormOptions.events}
      idKey="id"
      labelKey="label"
      onChange={handleChange}
    ></Select>
  );
};

export const useTAFEventSearchRauncher = () => {
  const { search } = useSearchSpike();
  const router = useRouter();

  const eventSearch = useCallback(
    (event: IEventItem) => {
      search({ events: [event] });
      router.push(TAF_SEARCH_PAGE_PATH).then();
    },
    [router, search]
  );

  return { eventSearch };
};
