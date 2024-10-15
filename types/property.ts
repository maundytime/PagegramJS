type Weight =
  | 'unspecified'
  | 'ultraLight' | '100'
  | 'thin' | '200'
  | 'light' | '300'
  | 'regular' | '400'
  | 'medium' | '500'
  | 'semibold' | '600'
  | 'bold' | '700'
  | 'heavy' | '800'
  | 'black' | '900';

type Design =
  | 'monospaced'
  | 'rounded' | '100'
  | 'serif' | '200'
  | 'default' | '300';

type PageTextProperty = {
  color?: string;
  weight?: Weight;
  size?: number;
  design?: Design;
};
export type PageTextComponent = PageTextProperty & {
  content: string;
};
export type PageText = PageTextProperty & {
  content?: string | PageTextComponent[];
  lines?: number;
  inset?: number | {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  alignment?: 'left' | 'right' | 'center' | 'justified';
  lineHeightMultiple?: number;
};
export type Direction = 'vertical' | 'horizontal';
export type PageSymbol = {
  name?: string;
  size?: number;
  weight?: Weight;
  color?: string;
};
export type Dimension = {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  centerX?: number | string;
  centerY?: number | string;
  width?: number | string;
  height?: number | string;
  topSafe?: number | string;
  rightSafe?: number | string;
  bottomSafe?: number | string;
  leftSafe?: number | string;
  centerXSafe?: number | string;
  centerYSafe?: number | string;
  widthSafe?: number | string;
  heightSafe?: number | string;
  vertical?: number | 'auto';
  horizontal?: number | 'auto';
  ratio?: number | string;
  unsafeAt?: 'top' | 'right' | 'bottom' | 'left';
};
type Range = {
  max: number | string;
  min: number | string;
};
export type ItemSize = {
  width?: number | string | Range;
  height?: number | string | Range;
  ratio?: number;
};
export type Inset =
| number
| {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};
export type Style = {
  interactive?: boolean;
  overflow?: 'hidden' | 'auto';
  opacity?: number;
  background?: string;
  zPosition?: number;
  border?: {
    width?: number;
    color?: string;
    radius?: number;
  };
  transform?: {
    scaleX?: number;
    scaleY?: number;
    translateX?: number;
    translateXOffset?: number;
    translateY?: number;
    translateYOffset?: number;
    rotate?: number;
    rotateOffset?: number;
  };
  shadow?: {
    opacity?: number;
    color?: string;
    radius?: number;
    offsetX?: number;
    offsetY?: number;
  };
};
