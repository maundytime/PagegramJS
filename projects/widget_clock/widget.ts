import {type Argument} from 'types/event';
import {NativeModule} from 'types/native';
import {spacer} from 'types/util';
import {type Widget} from 'types/widget';

export function test(argument: Argument) {
  console.log(JSON.stringify(argument));
  return 'test1 func called';
}

// padding类似insets，在uikit中并没有完全对应的属性

function getWeekday() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayIndex = NativeModule.date.getDay();
  return daysOfWeek[dayIndex];
}

function getAMPM() {
  const hours = NativeModule.date.getHours();
  return hours >= 12 ? 'PM' : 'AM';
}

function getHours() {
  let hours = NativeModule.date.getHours();
  hours = hours % 12 || 12;
  return hours;
}

function getMinutes() {
  const minutes = NativeModule.date.getMinutes();
  const formattedMinutes = String(minutes).padStart(2, '0');
  return formattedMinutes;
}

function getYear() {
  const year = NativeModule.date.getFullYear();
  return year;
}

function getDate() {
  const month = NativeModule.date.getMonth() + 1;
  const day = NativeModule.date.getDate();
  return `${month}/${day}`;
}

export const WidgetClock: Widget = {
  size: 'small',
  subviews: {
    type: 'zstack',
    style: {
      background: '232322',
    },
    dimension: {
      padding: 22,
      maxWidth: 'infinity',
      maxHeight: 'infinity',
    },
    subviews: [
      {
        type: 'vstack',
        style: {
          background: '969991',
        },
        dimension: {
          maxWidth: 'infinity',
          maxHeight: 'infinity',
        },
        subviews: [
          {
            type: 'hstack',
            subviews: [
              {
                type: 'text',
                text: getWeekday(),
              },
              spacer,
              {
                type: 'text',
                text: getAMPM(),
              },
            ],
          },
          spacer,
          {
            type: 'hstack',
            subviews: [
              {
                type: 'text',
                text: getHours(),
              },
              {
                type: 'vstack',
                mask: true,
                subviews: [
                  {
                    type: 'rectangle',
                    style: {
                      background: '232322',
                    },
                    dimension: {
                      width: 4,
                      height: 4,
                    },
                  },
                  {
                    type: 'spacer',
                    dimension: {
                      width: 4,
                      height: 4,
                    },
                  },
                  {
                    type: 'rectangle',
                    style: {
                      background: '232322',
                    },
                    dimension: {
                      width: 4,
                      height: 4,
                    },
                  },
                ],
              },
              {
                type: 'text',
                text: getMinutes(),
              },
            ],
          },
          spacer,
          {
            type: 'hstack',
            subviews: [
              {
                type: 'text',
                text: getYear(),
              },
              spacer,
              {
                type: 'text',
                text: getDate(),
              },
            ],
          },
        ],
      },
    ],
  },
};
