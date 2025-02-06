import {type Argument} from 'types/event';
import {type Widget} from 'types/widget';

export function test(argument: Argument) {
  console.log(JSON.stringify(argument));
  return 'test1 func called';
}

export const WidgetClock: Widget = {
  subviews: {
    type: 'vstack',
    subviews: [
      {
        type: 'image',
        name: 'star.fill',
      },
      {
        type: 'text',
        name: '123',
      },
      {
        type: 'button',
      },
    ],
  },
};
