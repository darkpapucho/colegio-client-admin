import tinycolor from 'tinycolor2';

export function darkenColor(color: string, amount: number) {
  if (tinycolor(color).isValid()) {
    return tinycolor(color).darken(amount).toString();
  }
  return color;
}
