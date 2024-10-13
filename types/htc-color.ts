import {Hct, hexFromArgb} from '@material/material-color-utilities';

export function hctColor(hue: number, chroma: number, tone: number): string {
  const argb = Hct.from(hue, chroma, tone).toInt();
  const hex = hexFromArgb(argb);
  console.log(hex);
  return hex;
}
