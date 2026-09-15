import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { useCallback, useState } from 'react';

function SignMessageScreen() {
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSign = useCallback(async () => {
    setBusy(true);
    try {
      return await transact(async (wallet) => {
        const auth = await wallet.authorize({
          chain: 'solana:devnet',
          identity: { uri: 'directgood:wallet', name: 'Direct Good' },
        });
        return await wallet.signMessages({
          addresses: [auth.accounts[0].address],
          payloads: [new Uint8Array([1, 2])],
        });
      });
    } catch (error) {
      setSuccess(false);
    } finally {
      setBusy(false);
    }
  }, []);

  return (
    <View>
      <Button onPress={onSign} />
      <ActivityIndicator animating={busy} />
      <Text>{success ? 'Success' : ''}</Text>
    </View>
  );
}

export default function App() {
  return <SignMessageScreen />;
}
