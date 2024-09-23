import {type Argument} from 'types/event';
import {NativeModule} from 'types/native';
import type {Page} from 'types/page';

export async function onLoad(_: Argument) {
  console.log('to save');
  return NativeModule.saveData('key1', '113')
    .then(x => {
      console.log('saved', x);
    });
}

export async function onLoad2(_: Argument) {
  console.log('to get');
  return NativeModule.data('key1')
    .then(x => {
      console.log('got', x);
    });
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
    },
    dimension: {
      centerX: 0,
      centerY: 0,
    },
  },
};
