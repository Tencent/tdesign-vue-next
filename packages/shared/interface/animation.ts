// ! 之前写在公共 utils 里面，但看起来是公共 ts
export interface Gradients {
  [percent: string]: string;
}
export interface FromTo {
  from: string;
  to: string;
}
export type LinearGradient = { direction?: string } & (Gradients | FromTo);
