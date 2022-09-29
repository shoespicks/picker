import { ReactElement } from 'react';

type LayoutProps = Required<{
  readonly children: ReactElement
}>

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <p>layout.header</p>
      <main>{children}</main>
      <p>layout.footer</p>
    </>
  )
}


export default DefaultLayout
