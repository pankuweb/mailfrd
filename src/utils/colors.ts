export const neutral = {
  white: '#ffffff',
  s100: '#efeff6',
  s150: '#dfdfe6',
  s200: '#c7c7ce',
  s250: '#bbbbc2',
  s300: '#9f9ea4',
  s400: '#7c7c82',
  s500: '#515154',
  s600: '#38383a',
  s700: '#2d2c2e',
  s800: '#212123',
  s900: '#161617',
  black: '#000000',
};

export const primary = {
  brand: '#0047ab',
};

export const secondary = {
  brand: '#3a27f4',
};

export const button = {
  border: '#e02b20',
  text: '#e02b20',
};

export const textColor = {
  titleBlack: '#000',
  descriptionGrey: '#666',
};

export const danger = {
  light: '#cf6d6d',
  default: '#EF4D4D',
};

export const surface = {
  default: '#fff',
  light: '#FAFAFF',
  background: '#FFFFFF',
};

export const success = {
  default: '#008a09',
  light: '#044122',
};

export const warning = {
  light: '#B1751B',
  light100: '#F3EADD',
  default: '#cf9700',
};

export const info = {
  default: '#2373E0',
};

export const applyOpacity = (hexColor: string, opacity: number): string => {
  const red = parseInt(hexColor.slice(1, 3), 16);
  const green = parseInt(hexColor.slice(3, 5), 16);
  const blue = parseInt(hexColor.slice(5, 7), 16);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

export const transparent = {
  clear: 'rgba(255, 255, 255, 0)',
  lightGray: applyOpacity(neutral.s300, 0.4),
  darkGray: applyOpacity(neutral.s800, 0.8),
};
