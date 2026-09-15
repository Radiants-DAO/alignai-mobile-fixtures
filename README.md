# AlignAI A6 mobile wiring fixtures

> **Synthetic test fixture. Not real wallet code. Not for production use.**
>
> These apps exist only to exercise AlignAI's static mobile wallet wiring checks (A6). They have never been
> built, run, or reviewed as working software. Several are **deliberately broken**. Do not copy them into an app.

## What is here

Eleven small Expo apps, one per directory under [`apps/`](apps). Each app is a single screen with one button that
asks a Solana mobile wallet to sign a two-byte message. Each broken app has exactly one intended wiring defect.

| SDK | Apps |
| --- | --- |
| `@wallet-ui/react-native-kit@4.3.0` (provider + `useMobileWallet`) | `kit-good`, `kit-no-provider`, `kit-cluster-mismatch`, `kit-discarded-signature`, `kit-stuck-busy-on-reject`, `kit-polyfill-after-sdk`, `kit-invalid-identity-uri`, `kit-expo-go-only` |
| `@solana-mobile/mobile-wallet-adapter-protocol-web3js@2.3.0` (direct `transact`) | `direct-web3js-good`, `direct-web3js-hardcoded-address`, `direct-web3js-missing-authorize` |

Per-app expected results, rule by rule, are in [`EXPECTED.md`](EXPECTED.md) and [`expected.json`](expected.json).

## Fixture conventions

- Every app has its own `package.json` with exact dependency versions and its own `package-lock.json`
  (`lockfileVersion` 3). There is no root manifest or workspace.
- The lockfiles are **hand-written**, not produced by `npm install`. They list direct dependencies only, carry no
  `integrity` hashes, and are not meant to be installed. Versions other than the two wallet SDK pins are illustrative.
- Apps live under `apps/`, not under `examples/`, `samples/`, `test/` or `fixtures/`, because code in those
  directories is treated as example-only and is not analysed.
- There are no Solana programs, no `Cargo.toml`, no keys, no endpoints other than the public Solana devnet and
  mainnet-beta RPC URLs, and no network calls.

## License

[MIT](LICENSE).
