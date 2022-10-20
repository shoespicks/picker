import { FC, PropsWithChildren } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@headlessui/react';
import { Animation, AnimationChild } from 'components/atoms/Animation';
import { Icon } from 'components/atoms/Icon';
import { ScrollArea } from 'components/atoms/ScrollArea';
import { H3 } from 'components/atoms/Typography';
import { useDialog } from 'components/hooks/useDialog';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  isOpen?: boolean;
  triggerElement?: JSX.Element;
  headerText: string;
  footerElement?: JSX.Element;
  closeModal?: () => void;
  isOpenChange?: (isOpen: boolean) => void;
};

export const Modal: FC<PropsWithChildren<Props>> = ({
  isOpen,
  triggerElement,
  headerText,
  footerElement,
  isOpenChange,
  children,
}) => {
  const { open, close } = useDialog(isOpenChange);
  const styles = getStyles(useTheme());

  return (
    <>
      <div onClick={open}>{triggerElement}</div>
      <Animation show={isOpen}>
        <Dialog as="div" className={styles.modal} onClose={close}>
          <div className={styles.modalBackground} onClick={close}></div>
          <AnimationChild name="popup" appear>
            <Dialog.Panel className={styles.modalPanel}>
              <div className={styles.panelHeader}>
                <H3>{headerText}</H3>
                <div className={styles.panelHeaderIconContainer} onClick={close}>
                  <Icon icon={faCircleXmark} />
                </div>
              </div>
              <div className={styles.panelContent}>
                <ScrollArea height="100%">{children}</ScrollArea>
              </div>

              {footerElement && <div className={styles.panelFooter}>{footerElement}</div>}
            </Dialog.Panel>
          </AnimationChild>
        </Dialog>
      </Animation>
    </>
  );
};

const getStyles = (theme: Theme) => ({
  modal: css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
  `,
  modalBackground: css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    width: 100vw;
    height: 100vh;
    background-color: ${theme.backdrop};
  `,
  modalPanel: css`
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: calc(100vh - 30px);
    background-color: ${theme.background};
    border-radius: 20px 20px 0 0;
  `,
  panelContent: css`
    flex: 1 1 auto;
    height: 1px;
  `,
  panelHeader: css`
    position: relative;
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    min-height: 56px;
    padding: ${$spacing.sm};
    border-bottom: 1px solid;
  `,
  panelHeaderIconContainer: css`
    position: absolute;
    top: 50%;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    cursor: pointer;
    transform: translateY(-50%);

    &:hover {
      color: ${theme.mainHover};
    }
  `,
  panelFooter: css`
    flex: 0 0 auto;
    padding: ${$spacing.sm} ${$spacing.md};
    border-top: 1px solid ${theme.border};
  `,
});
