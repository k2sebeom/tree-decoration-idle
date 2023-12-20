import cane1Img from '../assets/props/cane1.png'
// import cane2Img from '../assets/props/cane2.png'

import bell1Img from '../assets/props/bell1.png'
import bell2Img from '../assets/props/bell2.png'
import bell3Img from '../assets/props/bell3.png'
import bell4Img from '../assets/props/bell4.png'
import bell5Img from '../assets/props/bell5.png'
import bell6Img from '../assets/props/bell6.png'
import bell7Img from '../assets/props/bell7.png'
import bell8Img from '../assets/props/bell8.png'
import bell9Img from '../assets/props/bell9.png'

import snowman1 from '../assets/props/snowman1.png'
import snowman2 from '../assets/props/snowman2.png'
import snowman3 from '../assets/props/snowman3.png'
import snowman4 from '../assets/props/snowman4.png'
import snowman5 from '../assets/props/snowman5.png'

import candle1 from '../assets/props/candle1.png'

import star1 from '../assets/props/star1.png';
import star2 from '../assets/props/star2.png'


interface OrnamentType {
    source: string;
    width: number;
  }

export const NAME_MAPPING: Record<string, OrnamentType> = {
    'cane1': {
      source: cane1Img,
      width: 50,
    },

    'candle1': {
      source: candle1,
      width: 20,
    },

    'bell1': {
      source: bell1Img,
      width: 30,
    },
    'bell2': {
      source: bell2Img,
      width: 35,
    },
    'bell3': {
      source: bell3Img,
      width: 35,
    },
    'bell4': {
      source: bell4Img,
      width: 30,
    },
    'bell5': {
      source: bell5Img,
      width: 30,
    },
    'bell6': {
      source: bell6Img,
      width: 30,
    },
    'bell7': {
      source: bell7Img,
      width: 30,
    },
    'bell8': {
      source: bell8Img,
      width: 30,
    },
    'bell9': {
      source: bell9Img,
      width: 30,
    },

    'snowman1': {
      source: snowman1,
      width: 30,
    },
    'snowman2': {
      source: snowman2,
      width: 30,
    },
    'snowman3': {
      source: snowman3,
      width: 30,
    },
    'snowman4': {
      source: snowman4,
      width: 30,
    },
    'snowman5': {
      source: snowman5,
      width: 30,
    },

    'star1': {
      source: star1,
      width: 30,
    },
    'star2': {
      source: star2,
      width: 30,
    },
}
