import { FC, Fragment, PropsWithChildren, useState } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { Dialog, Transition } from '@headlessui/react';

type Props = {
  buttonElement?: JSX.Element;
  
  value?: boolean;
};

export const Drawer: FC<PropsWithChildren<Props>> = ({ buttonElement, children, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    value = false;
    // const elements = document.getElementsByClassName(styles.openbtn2);
    // elements[0].classList.remove(styles.active);
    
  };

  const openModal = () => {
    setIsOpen(true);
    value = true;
    // const elements = document.getElementsByClassName(styles.openbtn2);
    // elements[0].classList.add(styles.active);
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
              <Dialog.Panel className={styles.hamburgerMenuArea}>
                <button type="button">
                  <div className={styles.hambergerIcon(value)} onClick={closeModal}>
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
    color: ${theme.textInverse};
    background-color: ${theme.main};
  `,
  hamburgerMenuArea: css`
    height: 100%;
    padding: 24px;
  `,
  hambergerIcon: (value?: boolean) =>
    css`
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
      top: ${value ? 22 : 20}px;
      left: ${value ? 0 : 16}px;
      width: ${value ? 50 : 35}%;
      transform: translateY(${value ? 0 : 6}px) rotate(${value ? 0 : -45}deg);
    }

    span:nth-of-type(2) {
      top: ${value ? 29 : 32}px;
      left: ${value ? 0 : 16}px;
      width: ${value ? 50 : 35}%;
      transform: translateY(${value ? 0 : -6}px) rotate(${value ? 0 : 45}deg);
    }
      
      
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
