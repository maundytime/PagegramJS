import {type Tasks, type Argument} from 'types/event';
import {NativeModule} from 'types/native';
import {AIToken} from 'ignore/token';

export async function worldTimeTest() {
  return NativeModule.fetch('https://worldtimeapi.org/api/timezone/Etc/UTC')
    .then(text => {
      console.log(text);
    });
}

export async function openaiTest() {
  return NativeModule.fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AIToken as string,
    },
    body: JSON.stringify({
      messages: [
        {
          content: '今天',
          role: 'user',
        },
      ],
      model: 'gpt-3.5-turbo',
    }),
  })
    .then(data => JSON.parse(data) as unknown);
}

export async function timeoutTest(): Promise<string> {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve('Hello from JS async');
    }, 500);
  });
}

export async function asyncFunctionError(): Promise<Tasks> {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      try {
        throw new Error('Something went wrong!');
      } catch (error) {
        if (error instanceof Error) {
          reject(error);
        } else {
          reject(new Error('Non-error object thrown'));
        }
      }
    }, 500);
  });
}

export function greet(argument: Argument) {
  const a = argument.stateInfo['a'] as string;
  const b = argument.stateInfo['b'] as string;
  return 'Hello, ' + a + b + '!';
}
