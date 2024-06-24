import {Children, createElement, FC, isValidElement, PropsWithChildren, ReactElement} from 'react';

export const ComposeChildren: FC<PropsWithChildren> = ({children}): ReactElement => {
  const array = Children.toArray(children);
  const last = array.pop();

  return <>{array.reduceRight((child, element) => (isValidElement(element) ? createElement(element.type, element.props, child) : child), last)}</>;
};
