import {type Tasks} from './event';
import type {
  PageSymbol, Direction, Style, Dimension, PageText, ItemSize,
  Weight,
  Design,
} from './property';

type ViewProperties = {
  id?: string;
  style?: Style;
  dimension?: Dimension;
};
type TouchViewProperties = {
  onTap?: Tasks;
  onLongPress?: Tasks;
  onMove?: Tasks;
  onMoveEnd?: Tasks;
  userInfo?: unknown;
};
// container
export type MeasureView = ViewProperties & {
  type?: 'measure';
  subviews?: View | View[];
  onMeasure?: Tasks;
};
export type TouchFadeView = ViewProperties & TouchViewProperties & {
  type?: 'touchFade';
  subviews?: View | View[];
};
export type TouchView = ViewProperties & TouchViewProperties & {
  type?: 'touch';
  subviews?: View | View[];
};
export type ScrollView = ViewProperties & {
  type?: 'scroll';
  subviews?: View | View[];
  alwaysBounceVertical?: boolean;
  alwaysBounceHorizontal?: boolean;
};
export type BlurView = ViewProperties & {
  type?: 'blur';
  subviews?: View | View[];
};
export type StackView = ViewProperties & {
  type?: 'stack';
  subviews?: View | View[];
  stack?: {
    direction?: Direction;
    distribution?: 'fill' | 'fillEqually' | 'fillProportionally' | 'equalSpacing' | 'equalCentering';
    alignment?: 'fill' | 'leading' | 'top' | 'trailing' | 'bottom' | 'center' | 'firstBaseline' | 'lastBaseline';
    spacing?: number;
  };
};
export type BasicView = ViewProperties & {
  subviews?: View | View[];
};
// content
export type LabelView = ViewProperties & {
  type?: 'label';
  text?: PageText;
  color?: string;
  weight?: Weight;
  size?: number;
  design?: Design;
  lines?: number;
  alignment?: 'left' | 'right' | 'center' | 'justified';
  lineHeightMultiple?: number;

};
type Spacer = {
  type: 'spacer';
};
export type TextView = ViewProperties & {
  type?: 'text';
  text?: PageText;
  color?: string;
  weight?: Weight;
  size?: number;
  design?: Design;
  onInput?: Tasks;
  editable?: boolean;
  scrollable?: boolean;
  selectable?: boolean;
  alwaysBounceVertical?: boolean;
  alwaysBounceHorizontal?: boolean;

  lines?: number;
  inset?: Inset;
  alignment?: 'left' | 'right' | 'center' | 'justified';
  lineHeightMultiple?: number;

};
type Inset = number | {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};
export type SymbolView = ViewProperties & {
  type?: 'symbol';
  symbol?: PageSymbol;
};
export type ImageView = ViewProperties & {
  type?: 'image';
  image?: {
    url?: string;
    svg?: string;
    base64?: string;
    path?: string;
    mode?: 'cover' | 'contain' | 'stretch' | 'center';
  };
};
export type MatrixView = ViewProperties & {
  type?: 'matrix';
  matrix?: {
    content?: View[];
    itemSize?: ItemSize;
    direction?: Direction;
  };
};
export type AudioViewCommand = {
  play?: 'current' | 'pause' | 'next' | 'previous';
  time?: number | string;
  timeOffset?: number | string;
  rate?: number;
};
type Audio = {
  ur?: string;
  path?: string;
  image?: string;
  title?: string;
  channelTitle?: string;
  author?: string;
};
export type AudioView = ViewProperties & {
  type?: 'audio';
  audio?: Audio | Audio[];
  onPlayingEnable?: boolean;
  loop?: 'all' | 'single' | 'off' | 'random';
  systemControl?: {
    skipForward?: number | boolean;
    skipBackward?: number | boolean;
    previousTrack?: boolean;
    nextTrack?: boolean;
  };
  onPlaying?: Tasks;
  onPlayingStart?: Tasks;
  onPlayingEnd?: Tasks;
  command?: AudioViewCommand;
};

export type View =
| BasicView
| BlurView
| TextView
| SymbolView
| TouchFadeView
| TouchView
| StackView
| LabelView
| ScrollView
| ImageView
| MatrixView
| Spacer
| AudioView
| MeasureView;
