import {type Argument} from 'types/event';
import {Pagegram} from 'types/pagegram';
import {spacer} from 'types/util';
// import {type Widget} from 'types/widget';

export function test(argument: Argument) {
  console.log(JSON.stringify(argument));
  return 'func called';
}

// padding类似insets，在uikit中并没有完全对应的属性

function getWeekday(date: Date) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}

function getAMPM(date: Date) {
  const hours = date.getHours();
  return hours >= 12 ? 'PM' : 'AM';
}

function getHours(date: Date) {
  let hours = date.getHours();
  hours = hours % 12 || 12;
  return hours;
}

function getMinutes(date: Date) {
  const minutes = date.getMinutes();
  const formattedMinutes = String(minutes).padStart(2, '0');
  console.log(formattedMinutes);
  return formattedMinutes;
}

function getYear(date: Date) {
  const year = date.getFullYear();
  return year;
}

function getDate(date: Date) {
  const month = date.getMonth();
  const day = date.getDate();
  return `${month + 1}/${day}`;
}

export function WidgetClock(date: Date) {
  return {
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
                  text: getWeekday(date),
                  color: '232322',
                  size: 14,
                  design: 'monospaced',
                  weight: 'bold',
                },
                spacer,
                {
                  type: 'text',
                  text: getAMPM(date),
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
                  text: getHours(date),
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
                  text: getMinutes(date),
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
                  text: getYear(date),
                  color: '232322',
                  size: 14,
                  design: 'monospaced',
                  weight: 'bold',
                },
                spacer,
                {
                  type: 'text',
                  text: getDate(date),
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
}

Pagegram.present(WidgetClock);
