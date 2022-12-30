import { FC, PropsWithChildren } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { Dialog } from '@headlessui/react';
import { Animation, AnimationChild } from 'components/atoms/Animation';
import { useDialog } from 'components/hooks/useDialog';
import { breakpoints, mediaGreaterThan } from 'shared/constants/styles/media-query';

type Props = {
  isOpen?: boolean;
  triggerElement?: JSX.Element;
  closeModal?: () => void;
  isOpenChange?: (isOpen: boolean) => void;
};

export const Drawer: FC<PropsWithChildren<Props>> = ({ isOpen, triggerElement, isOpenChange, children }) => {
  const { open, close } = useDialog(isOpenChange);
  const styles = getStyles(useTheme());

  return (
    <>
      <div onClick={open}>{triggerElement}</div>
      <Animation show={isOpen}>
        <Dialog as="div" className={styles.drawer} onClose={close}>
          <div className={styles.drawerBackground} onClick={close}></div>
          <AnimationChild name="slideIn" appear>
            <Dialog.Panel className={styles.dialogPanel}>{children}</Dialog.Panel>
          </AnimationChild>
        </Dialog>
      </Animation>
    </>
  );
};

const getStyles = (theme: Theme) => ({
  drawer: css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
  `,
  drawerBackground: css`
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
  dialogPanel: css`
    position: absolute;
    right: 0;
    z-index: 2000;
    width: 20vw;
    min-width: 375px;
    height: 100%;
    background-color: ${theme.main};
    box-shadow: ${theme.shadowLeft};

    ${mediaGreaterThan('2xl')} {
      width: calc(20vw + ((100vw - ${breakpoints['2xl']}px) / 2));
      padding-right: calc((100vw - ${breakpoints['2xl']}px) / 2);
    }
  `,
});
