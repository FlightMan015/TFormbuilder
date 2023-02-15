import {nativeDarkColors, nativeLightColors, trivergenceDarkColors, trivergenceLightColors} from './colors';
import {nativeDarkFonts, nativeLightFonts, trivergenceDarkFonts, trivergenceLightFonts} from './fonts';
import {size} from './size';
import {radioButton} from '../constant';

export const darkTheme = {
  Native: {
    colors: nativeDarkColors,
    fonts: nativeDarkFonts,
    size,
    patternUri: '',
  },
  Trivergence: {
    colors: trivergenceDarkColors,
    fonts: trivergenceDarkFonts,
    size,
    patternUri: '',
  }
};

export const lightTheme = {
  Native: {
    colors: nativeLightColors,
    fonts: nativeLightFonts,
    size,
    patternUri: '',
  },
  Trivergence: {
    colors: trivergenceLightColors,
    fonts: trivergenceLightFonts,
    size,
    patternUri: '',
  }
};
