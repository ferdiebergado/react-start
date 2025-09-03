import type { JSX } from 'react';

export type ContextProviderFactory<T> = (props: T) => JSX.Element;
