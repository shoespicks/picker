// 横から出てくるコンポーネントとして作成（天野）
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
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center" onClick={openModal}>
        {buttonElement}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className={styles.humbergerArea} onClose={closeModal}>
          ここは中４
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            ここは中３
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              ここは中２
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  ここは中
                  <Dialog.Title as="h3">×</Dialog.Title>
                  <div className="mt-4">
                    <button type="button" onClick={closeModal}>
                      ＞＜（ここに2本線）
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
    width: calc(375px - 24px * 2);
    height: 100%;
    padding: 24px;
    color: ${theme.textInverse};
    background-color: ${theme.main};
  `,
});
