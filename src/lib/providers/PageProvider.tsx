/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, FunctionComponent, MutableRefObject, PropsWithChildren, useContext } from 'react';

type PageState = {
  pageRef: MutableRefObject<any>;
};

const PageContext = createContext({} as PageState);

export const PageProvider: FunctionComponent<PropsWithChildren & PageState> = ({ children, pageRef }) => {
  return <PageContext.Provider value={{ pageRef }}>{children}</PageContext.Provider>;
};

export const usePageContext = () => {
  const { pageRef } = useContext(PageContext);

  return { pageRef };
};
