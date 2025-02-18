import {type Argument} from 'types/event';
import {NativeWidget} from 'types/native';
import {spacer} from 'types/util';
import {type Widget} from 'types/widget';

export function test(argument: Argument) {
  console.log(JSON.stringify(argument));
  return `func called ${NativeWidget.date as any}`;
}

// padding类似insets，在uikit中并没有完全对应的属性

function getWeekday() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayIndex = NativeWidget.date.getDay();
  return daysOfWeek[dayIndex];
}

function getAMPM() {
  const hours = NativeWidget.date.getHours();
  return hours >= 12 ? 'PM' : 'AM';
}

function getHours() {
  let hours = NativeWidget.date.getHours();
  hours = hours % 12 || 12;
  return hours;
}

function getMinutes() {
  const minutes = NativeWidget.date.getMinutes();
  const formattedMinutes = String(minutes).padStart(2, '0');
  console.log(formattedMinutes);
  return formattedMinutes;
}

function getYear() {
  const year = NativeWidget.date.getFullYear();
  return year;
}

function getDate() {
  const month = NativeWidget.date.getMonth();
  const day = NativeWidget.date.getDate();
  return `${month + 1}/${day}`;
}

export const WidgetClock: Widget = {
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
          padding: 6,
        },
        subviews: [
          {
            type: 'hstack',
            subviews: [
              {
                type: 'text',
                text: getWeekday(),
                color: '232322',
                size: 14,
                design: 'monospaced',
                weight: 'bold',
              },
              spacer,
              {
                type: 'text',
                text: getAMPM(),
                color: '232322',
                size: 14,
                design: 'monospaced',
                weight: 'bold',
              },
            ],
          },
          spacer,
          {
            type: 'hstack',
            spacing: 4,
            subviews: [
              {
                type: 'text',
                text: getHours(),
                color: '232322',
                size: 28,
                design: 'monospaced',
                weight: 'bold',
              },
              // {
              //   type: 'button',
              // },
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
                color: '232322',
                size: 28,
                design: 'monospaced',
                weight: 'bold',
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
                color: '232322',
                size: 14,
                design: 'monospaced',
                weight: 'bold',
              },
              spacer,
              {
                type: 'text',
                text: getDate(),
                color: '232322',
                size: 14,
                design: 'monospaced',
                weight: 'bold',
              },
            ],
          },
        ],
      },
      {
        type: 'vstack',
        dimension: {
          maxWidth: 'infinity',
          maxHeight: 'infinity',
        },
        subviews: [
          {
            type: 'rectangle',
            dimension: {
              height: 2,
            },
            style: {
              background: '23232233',
            },
          },
          spacer,
        ],
      },
    ],
  },
};
