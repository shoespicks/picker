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
    let elements = document.getElementsByClassName(styles.openbtn2);
    elements[0].classList.remove(styles.active);
  };

  const openModal = () => {
    setIsOpen(true);
    let elements = document.getElementsByClassName(styles.openbtn2);
    elements[0].classList.add(styles.active);
  };
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <>
      <div onClick={openModal}>{buttonElement}</div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className={styles.humbergerArea} onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div />
          </Transition.Child>
          <div>
            <div>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel>
                  <div>
                    <button type="button" onClick={closeModal}>
                      <div className={styles.active} onClick={closeModal}>
                        <span></span>
                        <span></span>
                      </div>
                    </button>
                  </div>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const getStyles = (theme: Theme) => ({
  humbergerArea: css`
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
    position: relative; /* ボタン内側の基点となるためrelativeを指定 */
    width: 50px;
    height: 50px;
    cursor: pointer;
    background: #fff;

    /* ボタン内側 */

    span {
      position: absolute;
      left: 13px;
      display: inline-block;
      height: 2px;
      background-color: #666;
      transition: all 0.4s; /* アニメーションの設定 */
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
    position: relative; /* ボタン内側の基点となるためrelativeを指定 */
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
      transition: all 0.4s; /* アニメーションの設定 */
    }

    /* activeクラスが付与されると線が回転して×に */

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
