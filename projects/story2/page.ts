import {type Argument} from 'types/event';
import {NativeModule} from 'types/native';
import type {Page} from 'types/page';
import {edge} from 'types/util';

export async function onLoad(_: Argument) {
  console.log('to save');
  NativeModule.saveData('key1', '113');
  console.log('saved');
}

export async function onLoad2(_: Argument) {
  console.log('to get');
  const x = NativeModule.data('key1');
  console.log('got', x);
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
