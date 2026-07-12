import { ImageSourcePropType } from 'react-native';

/** Bundled photos — no network dependency for core imagery. */
export const images: Record<string, ImageSourcePropType> = {
  dzire: require('./images/dzire.png'),
  tigor: require('./images/tigor.png'),
  fronx: require('./images/fronx.png'),
  innova: require('./images/innova.png'),
  ertiga: require('./images/ertiga.png'),
  traveller: require('./images/traveller.png'),
  cityTour: require('./images/city-tour.png'),
  outstation: require('./images/outstation.png'),
  airport: require('./images/airport.png'),
};
