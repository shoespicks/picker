import {FC, PropsWithChildren } from "react";
import { css } from "@emotion/css";
import { Theme, useTheme } from "@emotion/react";
import { faHomeAlt } from "@fortawesome/free-solid-svg-icons";
import { A } from "components/atoms/A";
import { IconText } from "components/atoms/IconText";
import { $spacing } from "shared/constants/styles/spacing";


export const Breadcrumbs: FC<PropsWithChildren> = ({ children }) => {
    const styles = getStyles(useTheme());
        
    return (
    <ol aria-label="breadcrumb" className={styles.hoge}>
        <li>
            <A href="/track-and-field">
            <IconText icon={faHomeAlt} text=""></IconText>
            </A>
        </li>
        {children}
    </ol>
    );
};


const getStyles = (theme: Theme) => ({
    hoge: css`
        display: flex;
        align-items: center;
        padding: ${$spacing.md};
        background-color: ${theme.textDisable};

        span{
            font-size: 12px;
        }
        
        svg{
            margin-left: ${$spacing.md};
            font-size: 9px;
        }

        li:last-child span{
            color: ${theme.textLow};
        }

        li:first-child svg{
            margin-left: 0;
            font-size: 16px;
        }
        `,
});


