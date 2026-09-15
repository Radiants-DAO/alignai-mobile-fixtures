import { MobileWalletProvider, useMobileWallet } from '@wallet-ui/react-native-kit';
import './polyfills';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { useCallback, useState } from 'react';

function SignMessageScreen() {
  const { signMessages } = useMobileWallet();
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSign = useCallback(async () => {
    setBusy(true);
    try {
      return await signMessages(new Uint8Array([1, 2]));
    } catch (error) {
      setSuccess(false);
    } finally {
      setBusy(false);
    }
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
      identity={{ uri: 'kitpolyfillafter:wallet', name: 'Kit Polyfill After SDK' }}
      cluster={{ id: 'solana:devnet', url: 'https://api.devnet.solana.com' }}
    >
      <SignMessageScreen />
    </MobileWalletProvider>
  );
}
