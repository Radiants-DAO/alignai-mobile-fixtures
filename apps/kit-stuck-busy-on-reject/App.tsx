import './polyfills';
import { MobileWalletProvider, useMobileWallet } from '@wallet-ui/react-native-kit';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { useCallback, useState } from 'react';

function SignMessageScreen() {
  const { signMessages } = useMobileWallet();
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSign = useCallback(async () => {
    setBusy(true);
    const signed = await signMessages(new Uint8Array([1, 2]));
    setBusy(false);
    return signed;
  }, []);

  return (
    <View>
      <Button onPress={onSign} />
      <Text>{result}</Text>
      <ActivityIndicator animating={busy} />
      <Text>{success ? 'Success' : ''}</Text>
    </View>
  );
}

export default function App() {
  return (
    <MobileWalletProvider
      identity={{ uri: 'kitstuckbusy:wallet', name: 'Kit Stuck Busy' }}
      cluster={{ id: 'solana:devnet', url: 'https://api.devnet.solana.com' }}
    >
      <SignMessageScreen />
    </MobileWalletProvider>
  );
}
