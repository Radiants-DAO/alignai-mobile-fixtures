# Expected A6 results

Every app is its own component (platform `expo`). Each component produces exactly one action (`action-1`), one
source-check record per rule, rule version `mobile-wiring@1/<rule>`, and one `not-run` record for the protocol package
its lock resolves transitively (rule version `mobile-wiring@1`, no rule suffix). The machine-readable version is
[`expected.json`](expected.json). Source-check ids and receipt digests depend on the audited commit, so they are not listed.

Repository totals: 11 components, 66 source checks — 36 pass, 9 fail, 7 inconclusive, 3 not-applicable, 11 not-run.

Repository-level expectations: discovery `complete` with no reason codes or unexpected omissions; Solana program detection finds no program crates; every component inventory check is `completed`.

## Summary

| App | SDK | Intended defect | setup-connect | account-network-session | signing-completion | rejection-recovery | platform-configuration |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [`direct-web3js-good`](apps/direct-web3js-good) | `@solana-mobile/mobile-wallet-adapter-protocol-web3js@2.3.0` | none | pass | pass | pass | pass | not-applicable |
| [`direct-web3js-hardcoded-address`](apps/direct-web3js-hardcoded-address) | `@solana-mobile/mobile-wallet-adapter-protocol-web3js@2.3.0` | `account-network-session` | pass | **fail** | pass | pass | not-applicable |
| [`direct-web3js-missing-authorize`](apps/direct-web3js-missing-authorize) | `@solana-mobile/mobile-wallet-adapter-protocol-web3js@2.3.0` | `setup-connect` | **fail** | inconclusive | inconclusive | inconclusive | not-applicable |
| [`kit-cluster-mismatch`](apps/kit-cluster-mismatch) | `@wallet-ui/react-native-kit@4.3.0` | `account-network-session` | pass | **fail** | pass | pass | pass |
| [`kit-discarded-signature`](apps/kit-discarded-signature) | `@wallet-ui/react-native-kit@4.3.0` | `signing-completion` | pass | pass | **fail** | pass | pass |
| [`kit-expo-go-only`](apps/kit-expo-go-only) | `@wallet-ui/react-native-kit@4.3.0` | `platform-configuration` | pass | pass | pass | pass | **fail** |
| [`kit-good`](apps/kit-good) | `@wallet-ui/react-native-kit@4.3.0` | none | pass | pass | pass | pass | pass |
| [`kit-invalid-identity-uri`](apps/kit-invalid-identity-uri) | `@wallet-ui/react-native-kit@4.3.0` | `platform-configuration` | pass | pass | pass | pass | **fail** |
| [`kit-no-provider`](apps/kit-no-provider) | `@wallet-ui/react-native-kit@4.3.0` | `setup-connect` | **fail** | inconclusive | inconclusive | inconclusive | inconclusive |
| [`kit-polyfill-after-sdk`](apps/kit-polyfill-after-sdk) | `@wallet-ui/react-native-kit@4.3.0` | `platform-configuration` | pass | pass | pass | pass | **fail** |
| [`kit-stuck-busy-on-reject`](apps/kit-stuck-busy-on-reject) | `@wallet-ui/react-native-kit@4.3.0` | `rejection-recovery` | pass | pass | pass | **fail** | pass |

Why some records are not decisive:

- When `setup-connect` fails, the other capability rules for that action are reported `inconclusive` with `unsupported-shape`; the analyzer does not judge network, signing or recovery behaviour on an unestablished session. Those two apps carry `unsupported-shape` on their component-level `solana-mobile-wiring` coverage check as well.
- `platform-configuration` is `not-applicable` for direct `transact` apps; it applies only to the `@wallet-ui` provider SDKs.
- The analyzer reports a *missing* crypto polyfill as `inconclusive`, not `fail`, so the crypto-polyfill defect is modelled as a polyfill imported after the SDK.
- Every profiled SDK depends on `@solana-mobile/mobile-wallet-adapter-protocol` by caret, and the modelled `authorize` surface lives there, so each lock resolves it transitively at `2.3.0`. It has no source profile of its own, so it is never evaluated: every component reports it once as `not-run` (`not-executed`) and gets a skipped `solana-mobile-wiring` coverage check alongside its five rule records.

## `direct-web3js-good`

- Path: `apps/direct-web3js-good`
- Component id: `mobile-component-fef4679751ba6701946c9638aedc77d29beda7da857e7d9c8e249016f20c9236`
- Platform: `expo`
- SDK: `@solana-mobile/mobile-wallet-adapter-protocol`, declared `null`, resolved `2.3.0`, presence `transitive`
- SDK: `@solana-mobile/mobile-wallet-adapter-protocol-web3js`, declared `2.3.0`, resolved `2.3.0`, presence `imported`
- Inventory check: `completed`
- Component wiring coverage check: `skipped` (`not-executed`)
- Unprofiled SDK record: `@solana-mobile/mobile-wallet-adapter-protocol@2.3.0` — `not-run` (`not-executed`), anchor `apps/direct-web3js-good/package.json:1`
- Correct wiring: `transact` session authorizes on devnet and signs with `auth.accounts[0].address`; rejection handled with `catch`/`finally`.

| Rule | Result | Applicability | Source shape | Reason codes | Anchors |
| --- | --- | --- | --- | --- | --- |
| `setup-connect` | pass | applicable | supported | — | `apps/direct-web3js-good/App.tsx:17` |
| `account-network-session` | pass | applicable | supported | — | `apps/direct-web3js-good/App.tsx:17` |
| `signing-completion` | pass | applicable | supported | — | `apps/direct-web3js-good/App.tsx:17` |
| `rejection-recovery` | pass | applicable | supported | — | `apps/direct-web3js-good/App.tsx:17` |
| `platform-configuration` | not-applicable | not-applicable | supported | `not-applicable` | `apps/direct-web3js-good/App.tsx:17` |

## `direct-web3js-hardcoded-address`

- Path: `apps/direct-web3js-hardcoded-address`
- Component id: `mobile-component-547943844986a7f9398afae3bb3f5bc8782cf087c70c0d38a5f5ea79f5a6339b`
- Platform: `expo`
- SDK: `@solana-mobile/mobile-wallet-adapter-protocol`, declared `null`, resolved `2.3.0`, presence `transitive`
- SDK: `@solana-mobile/mobile-wallet-adapter-protocol-web3js`, declared `2.3.0`, resolved `2.3.0`, presence `imported`
- Inventory check: `completed`
- Component wiring coverage check: `skipped` (`not-executed`)
- Unprofiled SDK record: `@solana-mobile/mobile-wallet-adapter-protocol@2.3.0` — `not-run` (`not-executed`), anchor `apps/direct-web3js-hardcoded-address/package.json:1`
- Intended defect (`account-network-session`): Authorizes, then signs for a hard-coded saved address instead of the authorized account.

| Rule | Result | Applicability | Source shape | Reason codes | Anchors |
| --- | --- | --- | --- | --- | --- |
| `setup-connect` | pass | applicable | supported | — | `apps/direct-web3js-hardcoded-address/App.tsx:19` |
| `account-network-session` | **fail** | applicable | supported | `source-check-failed` | `apps/direct-web3js-hardcoded-address/App.tsx:19` |
| `signing-completion` | pass | applicable | supported | — | `apps/direct-web3js-hardcoded-address/App.tsx:19` |
| `rejection-recovery` | pass | applicable | supported | — | `apps/direct-web3js-hardcoded-address/App.tsx:19` |
| `platform-configuration` | not-applicable | not-applicable | supported | `not-applicable` | `apps/direct-web3js-hardcoded-address/App.tsx:19` |

## `direct-web3js-missing-authorize`

- Path: `apps/direct-web3js-missing-authorize`
- Component id: `mobile-component-df0e63d1f8ba78445dc1a7a9f0f7e4fce512c54975306d6a872f6e4c271639a9`
- Platform: `expo`
- SDK: `@solana-mobile/mobile-wallet-adapter-protocol`, declared `null`, resolved `2.3.0`, presence `transitive`
- SDK: `@solana-mobile/mobile-wallet-adapter-protocol-web3js`, declared `2.3.0`, resolved `2.3.0`, presence `imported`
- Inventory check: `completed`
- Component wiring coverage check: `skipped` (`not-executed`, `unsupported-shape`)
- Unprofiled SDK record: `@solana-mobile/mobile-wallet-adapter-protocol@2.3.0` — `not-run` (`not-executed`, `unsupported-shape`), anchor `apps/direct-web3js-missing-authorize/package.json:1`
- Intended defect (`setup-connect`): Calls `wallet.signMessages` inside `transact` without authorizing the session.

| Rule | Result | Applicability | Source shape | Reason codes | Anchors |
| --- | --- | --- | --- | --- | --- |
| `setup-connect` | **fail** | applicable | supported | `source-check-failed` | `apps/direct-web3js-missing-authorize/App.tsx:15` |
| `account-network-session` | inconclusive | applicable | unknown | `unsupported-shape` | `apps/direct-web3js-missing-authorize/App.tsx:15` |
| `signing-completion` | inconclusive | applicable | unknown | `unsupported-shape` | `apps/direct-web3js-missing-authorize/App.tsx:15` |
| `rejection-recovery` | inconclusive | applicable | unknown | `unsupported-shape` | `apps/direct-web3js-missing-authorize/App.tsx:15` |
| `platform-configuration` | not-applicable | not-applicable | supported | `not-applicable` | `apps/direct-web3js-missing-authorize/App.tsx:15` |

## `kit-cluster-mismatch`

- Path: `apps/kit-cluster-mismatch`
- Component id: `mobile-component-10f419b5fde5d0d459cdd4b3c164eee777820153018983e614fa9a0208037ba3`
- Platform: `expo`
- SDK: `@solana-mobile/mobile-wallet-adapter-protocol`, declared `null`, resolved `2.3.0`, presence `transitive`
- SDK: `@wallet-ui/react-native-kit`, declared `4.3.0`, resolved `4.3.0`, presence `imported`
- Inventory check: `completed`
- Component wiring coverage check: `skipped` (`not-executed`)
- Unprofiled SDK record: `@solana-mobile/mobile-wallet-adapter-protocol@2.3.0` — `not-run` (`not-executed`), anchor `apps/kit-cluster-mismatch/package.json:1`
- Intended defect (`account-network-session`): Provider cluster id is `solana:devnet` but its RPC url is the mainnet-beta endpoint.

| Rule | Result | Applicability | Source shape | Reason codes | Anchors |
| --- | --- | --- | --- | --- | --- |
| `setup-connect` | pass | applicable | supported | — | `apps/kit-cluster-mismatch/App.tsx:15`, `apps/kit-cluster-mismatch/App.tsx:35` |
| `account-network-session` | **fail** | applicable | supported | `source-check-failed` | `apps/kit-cluster-mismatch/App.tsx:15`, `apps/kit-cluster-mismatch/App.tsx:35` |
| `signing-completion` | pass | applicable | supported | — | `apps/kit-cluster-mismatch/App.tsx:15`, `apps/kit-cluster-mismatch/App.tsx:35` |
| `rejection-recovery` | pass | applicable | supported | — | `apps/kit-cluster-mismatch/App.tsx:15`, `apps/kit-cluster-mismatch/App.tsx:35` |
| `platform-configuration` | pass | applicable | supported | — | `apps/kit-cluster-mismatch/App.tsx:15`, `apps/kit-cluster-mismatch/App.tsx:35` |

## `kit-discarded-signature`

- Path: `apps/kit-discarded-signature`
- Component id: `mobile-component-7a85a2c25b7cf64b2cbb3cce130a5bdd8ead8063e82c78c303a5183b7d910f15`
- Platform: `expo`
- SDK: `@solana-mobile/mobile-wallet-adapter-protocol`, declared `null`, resolved `2.3.0`, presence `transitive`
- SDK: `@wallet-ui/react-native-kit`, declared `4.3.0`, resolved `4.3.0`, presence `imported`
- Inventory check: `completed`
- Component wiring coverage check: `skipped` (`not-executed`)
- Unprofiled SDK record: `@solana-mobile/mobile-wallet-adapter-protocol@2.3.0` — `not-run` (`not-executed`), anchor `apps/kit-discarded-signature/package.json:1`
- Intended defect (`signing-completion`): The signature is awaited but never returned or rendered; the screen shows Success regardless.

| Rule | Result | Applicability | Source shape | Reason codes | Anchors |
| --- | --- | --- | --- | --- | --- |
| `setup-connect` | pass | applicable | supported | — | `apps/kit-discarded-signature/App.tsx:15`, `apps/kit-discarded-signature/App.tsx:36` |
| `account-network-session` | pass | applicable | supported | — | `apps/kit-discarded-signature/App.tsx:15`, `apps/kit-discarded-signature/App.tsx:36` |
| `signing-completion` | **fail** | applicable | supported | `source-check-failed` | `apps/kit-discarded-signature/App.tsx:15`, `apps/kit-discarded-signature/App.tsx:36` |
| `rejection-recovery` | pass | applicable | supported | — | `apps/kit-discarded-signature/App.tsx:15`, `apps/kit-discarded-signature/App.tsx:36` |
| `platform-configuration` | pass | applicable | supported | — | `apps/kit-discarded-signature/App.tsx:15`, `apps/kit-discarded-signature/App.tsx:36` |

## `kit-expo-go-only`

- Path: `apps/kit-expo-go-only`
- Component id: `mobile-component-72b31abf50bd3d0edff151c08b5de49301d48ea62b33a7ef79eaadfb9d7d7ef9`
- Platform: `expo`
- SDK: `@solana-mobile/mobile-wallet-adapter-protocol`, declared `null`, resolved `2.3.0`, presence `transitive`
- SDK: `@wallet-ui/react-native-kit`, declared `4.3.0`, resolved `4.3.0`, presence `imported`
- Inventory check: `completed`
- Component wiring coverage check: `skipped` (`not-executed`)
- Unprofiled SDK record: `@solana-mobile/mobile-wallet-adapter-protocol@2.3.0` — `not-run` (`not-executed`), anchor `apps/kit-expo-go-only/package.json:1`
- Intended defect (`platform-configuration`): The only package script is `expo start --go`; there is no native Android build path.

| Rule | Result | Applicability | Source shape | Reason codes | Anchors |
| --- | --- | --- | --- | --- | --- |
| `setup-connect` | pass | applicable | supported | — | `apps/kit-expo-go-only/App.tsx:15`, `apps/kit-expo-go-only/App.tsx:35` |
| `account-network-session` | pass | applicable | supported | — | `apps/kit-expo-go-only/App.tsx:15`, `apps/kit-expo-go-only/App.tsx:35` |
| `signing-completion` | pass | applicable | supported | — | `apps/kit-expo-go-only/App.tsx:15`, `apps/kit-expo-go-only/App.tsx:35` |
| `rejection-recovery` | pass | applicable | supported | — | `apps/kit-expo-go-only/App.tsx:15`, `apps/kit-expo-go-only/App.tsx:35` |
| `platform-configuration` | **fail** | applicable | supported | `source-check-failed` | `apps/kit-expo-go-only/App.tsx:15`, `apps/kit-expo-go-only/App.tsx:35` |

## `kit-good`

- Path: `apps/kit-good`
- Component id: `mobile-component-ef6851bed406e3487f641b2758ef73135bf9563419145a283eecf1b85ad3aca6`
- Platform: `expo`
- SDK: `@solana-mobile/mobile-wallet-adapter-protocol`, declared `null`, resolved `2.3.0`, presence `transitive`
- SDK: `@wallet-ui/react-native-kit`, declared `4.3.0`, resolved `4.3.0`, presence `imported`
- Inventory check: `completed`
- Component wiring coverage check: `skipped` (`not-executed`)
- Unprofiled SDK record: `@solana-mobile/mobile-wallet-adapter-protocol@2.3.0` — `not-run` (`not-executed`), anchor `apps/kit-good/package.json:1`
- Correct wiring: Provider with a matching devnet cluster, crypto polyfill installed before the SDK import, awaited signature returned from the handler, busy state reset in `finally`, native `expo run:android` build script.

| Rule | Result | Applicability | Source shape | Reason codes | Anchors |
| --- | --- | --- | --- | --- | --- |
| `setup-connect` | pass | applicable | supported | — | `apps/kit-good/App.tsx:15`, `apps/kit-good/App.tsx:35` |
| `account-network-session` | pass | applicable | supported | — | `apps/kit-good/App.tsx:15`, `apps/kit-good/App.tsx:35` |
| `signing-completion` | pass | applicable | supported | — | `apps/kit-good/App.tsx:15`, `apps/kit-good/App.tsx:35` |
| `rejection-recovery` | pass | applicable | supported | — | `apps/kit-good/App.tsx:15`, `apps/kit-good/App.tsx:35` |
| `platform-configuration` | pass | applicable | supported | — | `apps/kit-good/App.tsx:15`, `apps/kit-good/App.tsx:35` |

## `kit-invalid-identity-uri`

- Path: `apps/kit-invalid-identity-uri`
- Component id: `mobile-component-40acb115e274d6388c1ad472b7f0553dd18b5d552848fc30f2f31250ce47652d`
- Platform: `expo`
- SDK: `@solana-mobile/mobile-wallet-adapter-protocol`, declared `null`, resolved `2.3.0`, presence `transitive`
- SDK: `@wallet-ui/react-native-kit`, declared `4.3.0`, resolved `4.3.0`, presence `imported`
- Inventory check: `completed`
- Component wiring coverage check: `skipped` (`not-executed`)
- Unprofiled SDK record: `@solana-mobile/mobile-wallet-adapter-protocol@2.3.0` — `not-run` (`not-executed`), anchor `apps/kit-invalid-identity-uri/package.json:1`
- Intended defect (`platform-configuration`): Provider identity `uri` has no URI scheme.

| Rule | Result | Applicability | Source shape | Reason codes | Anchors |
| --- | --- | --- | --- | --- | --- |
| `setup-connect` | pass | applicable | supported | — | `apps/kit-invalid-identity-uri/App.tsx:15`, `apps/kit-invalid-identity-uri/App.tsx:35` |
| `account-network-session` | pass | applicable | supported | — | `apps/kit-invalid-identity-uri/App.tsx:15`, `apps/kit-invalid-identity-uri/App.tsx:35` |
| `signing-completion` | pass | applicable | supported | — | `apps/kit-invalid-identity-uri/App.tsx:15`, `apps/kit-invalid-identity-uri/App.tsx:35` |
| `rejection-recovery` | pass | applicable | supported | — | `apps/kit-invalid-identity-uri/App.tsx:15`, `apps/kit-invalid-identity-uri/App.tsx:35` |
| `platform-configuration` | **fail** | applicable | supported | `source-check-failed` | `apps/kit-invalid-identity-uri/App.tsx:15`, `apps/kit-invalid-identity-uri/App.tsx:35` |

## `kit-no-provider`

- Path: `apps/kit-no-provider`
- Component id: `mobile-component-ff834250d5adeea7ea833bea7fcff03ec222e2b3e4552608113ae37ed9422cff`
- Platform: `expo`
- SDK: `@solana-mobile/mobile-wallet-adapter-protocol`, declared `null`, resolved `2.3.0`, presence `transitive`
- SDK: `@wallet-ui/react-native-kit`, declared `4.3.0`, resolved `4.3.0`, presence `imported`
- Inventory check: `completed`
- Component wiring coverage check: `skipped` (`not-executed`, `unsupported-shape`)
- Unprofiled SDK record: `@solana-mobile/mobile-wallet-adapter-protocol@2.3.0` — `not-run` (`not-executed`, `unsupported-shape`), anchor `apps/kit-no-provider/package.json:1`
- Intended defect (`setup-connect`): `useMobileWallet()` is called but the screen is never rendered inside `MobileWalletProvider`.

| Rule | Result | Applicability | Source shape | Reason codes | Anchors |
| --- | --- | --- | --- | --- | --- |
| `setup-connect` | **fail** | applicable | supported | `source-check-failed` | `apps/kit-no-provider/App.tsx:15` |
| `account-network-session` | inconclusive | applicable | unknown | `unsupported-shape` | `apps/kit-no-provider/App.tsx:15` |
| `signing-completion` | inconclusive | applicable | unknown | `unsupported-shape` | `apps/kit-no-provider/App.tsx:15` |
| `rejection-recovery` | inconclusive | applicable | unknown | `unsupported-shape` | `apps/kit-no-provider/App.tsx:15` |
| `platform-configuration` | inconclusive | applicable | unknown | `unsupported-shape` | `apps/kit-no-provider/App.tsx:15` |

## `kit-polyfill-after-sdk`

- Path: `apps/kit-polyfill-after-sdk`
- Component id: `mobile-component-bf0b4c3bd3af3fbe50c6efd5775d54cdae1d26cf003f077ece5b6ca9cd621f79`
- Platform: `expo`
- SDK: `@solana-mobile/mobile-wallet-adapter-protocol`, declared `null`, resolved `2.3.0`, presence `transitive`
- SDK: `@wallet-ui/react-native-kit`, declared `4.3.0`, resolved `4.3.0`, presence `imported`
- Inventory check: `completed`
- Component wiring coverage check: `skipped` (`not-executed`)
- Unprofiled SDK record: `@solana-mobile/mobile-wallet-adapter-protocol@2.3.0` — `not-run` (`not-executed`), anchor `apps/kit-polyfill-after-sdk/package.json:1`
- Intended defect (`platform-configuration`): `./polyfills` (react-native-quick-crypto `install()`) is imported after the wallet SDK import.

| Rule | Result | Applicability | Source shape | Reason codes | Anchors |
| --- | --- | --- | --- | --- | --- |
| `setup-connect` | pass | applicable | supported | — | `apps/kit-polyfill-after-sdk/App.tsx:15`, `apps/kit-polyfill-after-sdk/App.tsx:35` |
| `account-network-session` | pass | applicable | supported | — | `apps/kit-polyfill-after-sdk/App.tsx:15`, `apps/kit-polyfill-after-sdk/App.tsx:35` |
| `signing-completion` | pass | applicable | supported | — | `apps/kit-polyfill-after-sdk/App.tsx:15`, `apps/kit-polyfill-after-sdk/App.tsx:35` |
| `rejection-recovery` | pass | applicable | supported | — | `apps/kit-polyfill-after-sdk/App.tsx:15`, `apps/kit-polyfill-after-sdk/App.tsx:35` |
| `platform-configuration` | **fail** | applicable | supported | `source-check-failed` | `apps/kit-polyfill-after-sdk/App.tsx:15`, `apps/kit-polyfill-after-sdk/App.tsx:35` |

## `kit-stuck-busy-on-reject`

- Path: `apps/kit-stuck-busy-on-reject`
- Component id: `mobile-component-1c4c0f37dded1f855e89a0e2eff89097642ba0de193e6a0d186fa9542bf0cadf`
- Platform: `expo`
- SDK: `@solana-mobile/mobile-wallet-adapter-protocol`, declared `null`, resolved `2.3.0`, presence `transitive`
- SDK: `@wallet-ui/react-native-kit`, declared `4.3.0`, resolved `4.3.0`, presence `imported`
- Inventory check: `completed`
- Component wiring coverage check: `skipped` (`not-executed`)
- Unprofiled SDK record: `@solana-mobile/mobile-wallet-adapter-protocol@2.3.0` — `not-run` (`not-executed`), anchor `apps/kit-stuck-busy-on-reject/package.json:1`
- Intended defect (`rejection-recovery`): Busy state is set before signing with no `try/finally`, so a wallet rejection leaves the spinner running.

| Rule | Result | Applicability | Source shape | Reason codes | Anchors |
| --- | --- | --- | --- | --- | --- |
| `setup-connect` | pass | applicable | supported | — | `apps/kit-stuck-busy-on-reject/App.tsx:14`, `apps/kit-stuck-busy-on-reject/App.tsx:31` |
| `account-network-session` | pass | applicable | supported | — | `apps/kit-stuck-busy-on-reject/App.tsx:14`, `apps/kit-stuck-busy-on-reject/App.tsx:31` |
| `signing-completion` | pass | applicable | supported | — | `apps/kit-stuck-busy-on-reject/App.tsx:14`, `apps/kit-stuck-busy-on-reject/App.tsx:31` |
| `rejection-recovery` | **fail** | applicable | supported | `source-check-failed` | `apps/kit-stuck-busy-on-reject/App.tsx:14`, `apps/kit-stuck-busy-on-reject/App.tsx:31` |
| `platform-configuration` | pass | applicable | supported | — | `apps/kit-stuck-busy-on-reject/App.tsx:14`, `apps/kit-stuck-busy-on-reject/App.tsx:31` |
