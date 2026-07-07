import { Alert, Linking } from 'react-native';
import { company } from '../data/company';

async function open(url: string): Promise<void> {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert('Could not open', 'That app is not available on this device.');
  }
}

export const links = {
  whatsapp: (message: string) =>
    open(`https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`),
  call: (number: string = company.phonePrimary) => open(`tel:${number}`),
  email: () => open(`mailto:${company.email}`),
  maps: () =>
    open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        company.googleMapsQuery,
      )}`,
    ),
  website: () => open(company.website),
  justdial: () => open(company.justdialUrl),
};
