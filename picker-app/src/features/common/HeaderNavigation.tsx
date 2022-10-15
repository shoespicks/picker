import React, { PropsWithChildren, useState, type FC } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { Drawer } from 'components/molecules/Drawer';

export const HeaderNavigation: FC<PropsWithChildren> = ({ children }) => {
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
    <Drawer
      buttonElement={
        <button type="button">
          <div className={styles.openbtn2}>
            <span></span>
            <span></span>
          </div>
        </button>
      }
    >
      {children}
    </Drawer>
  );
};

const getStyles = (theme: Theme) => ({
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
