import type {View} from './view';
import type {EventMap, Tasks} from './event';
import {type Direction} from './property';

type State = {
  type: 'state';
  value: unknown;
  onChange?: Tasks;
} | {
  type: 'bind';
  value?: undefined; // debug用，应该是没有的，todo移除
  onChange?: Tasks;
};

export type StateMap = Record<string, State>;

type BasicPage = {
  stateMap?: StateMap;
  eventMap?: EventMap;
  onLoad?: Tasks;
  onUnload?: Tasks;
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
  onPush?: Tasks;
  onPop?: Tasks;
};

export type Page = BasicPage | TabPage | NavPage;
