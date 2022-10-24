import { FC } from "react";
import { css } from "@emotion/css";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { A } from "components/atoms/A";
import { IconText } from "components/atoms/IconText";
import { Breadcrumbs } from "features/common/Breadcrumbs";
import { $spacing } from "shared/constants/styles/spacing";
import { Link } from 'shared/constants/type';

type Props = {
    links: Link[];
};

export const TAFBreadcrumbs: FC<Props> = ({ links }) => {
    const styles = getStyles();
        
    return (
    <Breadcrumbs>
            <li>
                <A href="/track-and-field" className={styles.hoge2}>
                <IconText icon={faChevronRight} text="SHOWS PICKS" gap="md"></IconText>
                </A>
            </li>
            {links.map(l => (
            <li key={l.label}>
                <A href={l.href}>
                <IconText icon={faChevronRight} text={l.label} gap="md"></IconText>
                </A>
            </li>
            ))}
    </Breadcrumbs>
    );
};


const getStyles = () => ({
    hoge2: css`
        svg{
            margin-left: ${$spacing.md};
            font-size: 9px;
        }
        `,
});


