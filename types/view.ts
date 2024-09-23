import type {
  PageSymbol, Direction, Style, Dimension, PageText, ItemSize,
} from './property';

type ViewProperties = {
  id?: number | string;
  style?: Style;
  dimension?: Dimension;
};
type TouchViewProperties = {
  onTap?: string | string[];
  onLongPress?: string | string[];
  onMove?: string | string[];
  onMoveEnd?: string | string[];
  userInfo?: unknown;
};
// container
export type MeasureView = ViewProperties & {
  type?: 'measure';
  subviews?: View | View[];
  onMeasure?: string | string[];
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
};
type Spacer = {
  type: 'spacer';
};
export type TextView = ViewProperties & {
  type?: 'text';
  text?: PageText & {
    editable?: boolean;
    scrollable?: boolean;
    selectable?: boolean;
  };
  onInput: string | string[];
};
export type SymbolView = ViewProperties & {
  type?: 'symbol';
  symbol?: PageSymbol;
};
export type ImageView = ViewProperties & {
  type?: 'image';
  image?: {
    url?: string;
    mode?: 'present' | 'contain' | 'stretch' | 'center';
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
export type AudioViewAction = {
  play?: 'current' | 'pause' | 'next' | 'previous';
  time?: number | string;
  timeDiff?: number | string;
  rate?: number;
};
type Audio = {
  url: string;
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
  onPlaying?: string | string[];
  onPlayingStart?: string | string[];
  onPlayingEnd?: string | string[];
  action?: AudioViewAction;
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
