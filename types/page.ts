import type {View} from './view';
import type {EventMap} from './event';
import {type Direction} from './property';

type State = {
  type: 'state';
  value: unknown;
  onChange?: string | string[];
} | {
  type: 'bind';
  value?: undefined; // debug用，应该是没有的，todo移除
  onChange?: string | string[];
};

export type StateMap = Record<string, State>;

type BasicPage = {
  stateMap?: StateMap;
  eventMap?: EventMap;
  onLoad?: string | string[];
  onUnload?: string | string[];
  subviews?: View | View[];
  direction?: Direction;
};

type TabPage = BasicPage & {
  type: 'tab';
  subpages: string[];
};

export type NavPage = BasicPage & {
  type: 'nav';
  subpages: string[];
  onPush?: string | string[];
  onPop?: string | string[];
};

export type Page = BasicPage | TabPage | NavPage;
