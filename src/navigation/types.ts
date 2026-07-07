import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type TabParamList = {
  Home: undefined;
  Fleet: undefined;
  Book: undefined;
  Packages: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  VehicleDetails: { vehicleId: string };
  BookingFlow: { vehicleId?: string; drop?: string } | undefined;
  BookingSuccess: { bookingId: string };
  Reviews: undefined;
  About: undefined;
  Contact: undefined;
  History: undefined;
  Settings: undefined;
};

export type RootScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type TabScreenProps<T extends keyof TabParamList> = BottomTabScreenProps<
  TabParamList,
  T
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
