import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { faChevronCircleRight, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components/atoms/Button';
import { Container } from 'components/atoms/Container';
import { Divider } from 'components/atoms/Divider';
import { Form } from 'components/atoms/Form';
import { Spacer } from 'components/atoms/Spacer';
import { Span } from 'components/atoms/Typography';
import { useModal } from 'components/hooks/useModal';
import { Modal } from 'components/molecules/Modal';
import { SearchFormInput, searchFormInputDefaultValues } from 'features/track-and-field/constants/search';
import { useSearchSpikeForm } from 'features/track-and-field/hooks/useSearchSpikeForm';
import { FormInput } from 'features/track-and-field/search/searchForm/TAFSearchFormInput';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  currentSearchCondition?: SearchFormInput;
  isLoading?: boolean;
  onSubmit?(input: SearchFormInput): void;
};

export const TAFSearchFormModal: FC<Props> = ({
  currentSearchCondition = searchFormInputDefaultValues,
  isLoading,
  onSubmit,
}) => {
  const { formOptions, control, handleSubmit } = useSearchSpikeForm(currentSearchCondition);
  const { isModalOpen, close, setIsModalOpen } = useModal();
  const submit = handleSubmit(data => {
    onSubmit && onSubmit(data);
    close();
  });

  return (
    <Modal
      headerText="絞り込み"
      isOpen={isModalOpen}
      isOpenChange={setIsModalOpen}
      triggerElement={
        <Button width="100%" icon={faPlusCircle} iconPosition="right">
          <span
            className={css`
              display: grid;
              grid-template-columns: 1fr max-content 2fr;
              gap: ${$spacing.md};
              width: 100%;
              height: 20px;
            `}
          >
            <Span
              className={css`
                display: inline-flex;
                align-items: center;
                text-align: left;
              `}
              semiBold
              truncate
            >
              {currentSearchCondition?.events?.length ? (
                <Span truncate>{currentSearchCondition?.events?.map(e => e.label).join(', ')} </Span>
              ) : (
                <Span color="low" truncate>
                  種目を選択
                </Span>
              )}
            </Span>
            <Divider orientation="vertical"></Divider>
            <Span
              className={css`
                display: inline-flex;
                align-items: center;
                text-align: left;
              `}
              semiBold
              truncate
            >
              {currentSearchCondition?.athleteLevel?.length ? (
                <Span truncate>{currentSearchCondition?.athleteLevel?.map(a => a.label).join(', ')} </Span>
              ) : (
                <Span color="low" truncate>
                  競技レベルを選択
                </Span>
              )}
            </Span>
          </span>
        </Button>
      }
      footerElement={
        <Button
          type="submit"
          color="primary"
          icon={faChevronCircleRight}
          label="検索する"
          width="100%"
          iconPosition="rightAbsolute"
          disabled={isLoading}
          onClick={submit}
        ></Button>
      }
    >
      <Container>
        <Form>
          <Spacer size={$spacing.xs}></Spacer>
          <FormInput control={control} formOptions={formOptions}></FormInput>
          <Spacer size={$spacing.lg}></Spacer>
        </Form>
      </Container>
    </Modal>
  );
};
