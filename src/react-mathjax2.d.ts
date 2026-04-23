declare module 'react-mathjax2' {
  import { ComponentType, ReactNode } from 'react'

  export const Context: ComponentType<{ input: string; children: ReactNode }>
  export const Node: ComponentType<{ inline?: boolean; children: string }>
}
