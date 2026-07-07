import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Screen } from '../components/ui/Screen';
import { ScreenHeader } from '../components/ui/ScreenHeader';
import { AppText } from '../components/ui/AppText';
import { ListRow } from '../components/ui/ListRow';
import { TextField } from '../components/ui/TextField';
import { PremiumButton } from '../components/ui/PremiumButton';
import { links } from '../services/links';
import { company } from '../data/company';

export function ContactScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const sendInquiry = () => {
    if (!message.trim()) {
      setError('Tell us a little about your trip.');
      return;
    }
    setError(undefined);
    links.whatsapp(
      `Hi, I have an inquiry.\nName: ${name || '—'}\nPhone: ${phone || '—'}\n\n${message}`,
    );
  };

  return (
    <Screen scroll>
      <ScreenHeader title="Contact us" subtitle="We answer fast — day or night" />

      <Animated.View entering={FadeInDown.springify()}>
        <ListRow
          icon="call-outline"
          title={company.phonePrimaryDisplay}
          subtitle="Primary · call anytime"
          onPress={() => links.call()}
        />
        <ListRow
          icon="call-outline"
          title={company.phoneSecondaryDisplay}
          subtitle="Alternate"
          onPress={() => links.call(company.phoneSecondary)}
        />
        <ListRow
          icon="logo-whatsapp"
          title="WhatsApp us"
          subtitle="Fastest way to book"
          onPress={() => links.whatsapp("Hi, I'd like to book a cab with Sharma Cab Services.")}
        />
        <ListRow
          icon="mail-outline"
          title="Email"
          subtitle={company.email}
          onPress={links.email}
        />
        <ListRow
          icon="location-outline"
          title="Find us in Deoghar"
          subtitle="Open in Google Maps"
          onPress={links.maps}
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(140).springify()}>
        <AppText variant="heading" style={styles.formTitle}>
          Send an inquiry
        </AppText>
        <TextField
          label="Your name"
          icon="person-outline"
          value={name}
          onChangeText={setName}
          placeholder="Full name"
          autoComplete="name"
        />
        <TextField
          label="Phone"
          icon="call-outline"
          value={phone}
          onChangeText={setPhone}
          placeholder="+91 …"
          keyboardType="phone-pad"
          autoComplete="tel"
        />
        <TextField
          label="Message"
          icon="chatbubble-ellipses-outline"
          value={message}
          onChangeText={t => {
            setMessage(t);
            if (error) {
              setError(undefined);
            }
          }}
          placeholder="Pickup, date, destination…"
          multiline
          numberOfLines={4}
          style={styles.messageInput}
          error={error}
        />
        <PremiumButton
          label="Send via WhatsApp"
          variant="whatsapp"
          icon="logo-whatsapp"
          onPress={sendInquiry}
        />
        <AppText variant="caption" muted center style={styles.note}>
          Your inquiry opens in WhatsApp — nothing is sent without you tapping send.
        </AppText>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  formTitle: { marginTop: 24, marginBottom: 14 },
  messageInput: { minHeight: 90, textAlignVertical: 'top' },
  note: { marginTop: 12 },
});
