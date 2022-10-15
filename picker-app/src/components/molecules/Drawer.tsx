import { FC, Fragment, PropsWithChildren, useState } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { Dialog, Transition } from '@headlessui/react';

type Props = {
  buttonElement?: JSX.Element;
};

export const Drawer: FC<PropsWithChildren<Props>> = ({ buttonElement, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    const elements = document.getElementsByClassName(styles.openbtn2);
    elements[0].classList.remove(styles.active);
  };

  const openModal = () => {
    setIsOpen(true);
    const elements = document.getElementsByClassName(styles.openbtn2);
    elements[0].classList.add(styles.active);
  };
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <>
      <div onClick={openModal}>{buttonElement}</div>

      <Transition appear show={isOpen} as={Fragment}>
        <div className={styles.hamburgerBackground}>
          <Dialog as="div" className={styles.hamburgerArea} onClose={closeModal}>
            <Transition.Child as={Fragment}>
              <Dialog.Panel>
                <button type="button">
                  <div className={styles.active} onClick={closeModal}>
                    <span></span>
                    <span></span>
                  </div>
                </button>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </div>
      </Transition>
    </>
  );
};

const getStyles = (theme: Theme) => ({
  hamburgerBackground: css`
    position: absolute;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${theme.hambergerHover};
  `,
  hamburgerArea: css`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
    width: 375px;
    height: 100%;
    padding: 24px;
    color: ${theme.textInverse};
    background-color: ${theme.main};
  `,
  openbtn2: css`
    position: relative;
    width: 50px;
    height: 50px;
    cursor: pointer;
    background: #fff;

    span {
      position: absolute;
      left: 13px;
      display: inline-block;
      height: 2px;
      background-color: #666;
      transition: all 0.4s;
    }

    span:nth-of-type(1) {
      top: 22px;
      width: 50%;
    }

    span:nth-of-type(2) {
      top: 29px;
      width: 50%;
    }
  `,
  active: css`
    position: relative;
    width: 50px;
    height: 50px;
    cursor: pointer;
    background: #fff;

    span {
      position: absolute;
      left: 13px;
      display: inline-block;
      height: 2px;
      background-color: #666;
      transition: all 0.4s;
    }

    span:nth-of-type(1) {
      top: 20px;
      left: 16px;
      width: 35%;
      transform: translateY(6px) rotate(-45deg);
    }

    span:nth-of-type(2) {
      top: 32px;
      left: 16px;
      width: 35%;
      transform: translateY(-6px) rotate(45deg);
    }
  `,
});
