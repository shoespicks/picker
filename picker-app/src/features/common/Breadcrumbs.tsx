import React, { FC } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";

export const Breadcrumbs: FC = () => {
    const routes = [
        {
            path: `/`,
            breadcrumb: `top`,
            props: {
                pageName: `/`,
                
            },
        },
        {
            path: `/`,
            breadcrumb: `top2`,
            props: {
                pageName: `/`,
                
            },
        },
        {
            path: `/`,
            breadcrumb: `top3`,
            props: {
                pageName: `/`,
                
            },
        },
    ];
    const breadcrumbs = useBreadcrumbs(routes);

  return (
    <React.Fragment>
      {breadcrumbs.map(({ breadcrumb }) => breadcrumb)}
    </React.Fragment>
  );
};