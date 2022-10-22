import { FC } from 'react';
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
import { useSearchSpikeForm } from 'features/track-and-field/hooks/useSearchSpikeForm';
import { useSearchSpikesQueryCondition } from 'features/track-and-field/hooks/useSearchSpikesQuery';
import { FormInput } from 'features/track-and-field/search/searchForm/TAFSearchFormInput';
import { $spacing } from 'shared/constants/styles/spacing';

export const TAFSearchFormModal: FC = () => {
  const { searchCondition, setSearchCondition } = useSearchSpikesQueryCondition();
  const { formOptions, control, handleSubmit, watch } = useSearchSpikeForm(searchCondition);

  const { isModalOpen, close, setIsModalOpen } = useModal();
  const submit = handleSubmit(data => {
    setSearchCondition(data);
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
              {watch('events')?.length ? (
                <Span truncate>
                  {watch('events')
                    ?.map(e => e.label)
                    .join(', ')}{' '}
                </Span>
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
              {watch('athleteLevel')?.length ? (
                <Span truncate>
                  {watch('athleteLevel')
                    ?.map(a => a.label)
                    .join(', ')}{' '}
                </Span>
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
