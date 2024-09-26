import {type Argument} from 'types/event';
import {NativeModule} from 'types/native';
import type {Page} from 'types/page';
import {edge} from 'types/util';

export async function onLoad(_: Argument) {
  const x = 113;
  console.log('to save', x, (typeof x));
  NativeModule.saveData('key1', x);
}

export async function onLoad2(_: Argument) {
  const x = NativeModule.data('key1');
  console.log('got', x, (typeof x));
}

export const PageTest: Page = {
  onLoad: ['onLoad', 'onLoad2'],
  eventMap: {
    onLoad: 'onLoad',
    onLoad2: 'onLoad2',
  },
  subviews: {
    type: 'label',
    text: {
      content: '你好',
      alignment: 'center',
    },
    dimension: edge,
    style: {
      background: '#fff',
    },
  },
};
