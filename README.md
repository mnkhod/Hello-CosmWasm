# Hello-CosmWasm
---
Code-Id : 4150
Contract-Address : juno1sc9jk03atg2urgedenc5h4363804cwaqqt2qk7mervp5qgf99zhsxw9dt0

### Smart Contract Code Upload
```
junod tx wasm store artifacts/hello_cosmwasm.wasm --from dev --node https://rpc.uni.juno.deuslabs.fi:443 --chain-id u
ni-5 --gas-prices 0.1ujunox --gas auto --gas-adjustment 1.3 -y --output json -b block | jq
```

### Contract Instantiated List
```
junod query wasm list-contract-by-code 4150 --node https://rpc.uni.juno.deuslabs.fi:443 --output json | jq
```

### Smart Contract Instantiate
Scan Link : https://testnet.mintscan.io/juno-testnet/txs/1C01CE6C8020F65F8B2A0E6F941F169BDC92218DA945EB5BB2B2A28032BCD1E8

```
junod tx wasm instantiate 4150 '{}' --from dev --label "helloCosmWasm" --node https://rpc.uni.juno.deuslabs.fi:443 --c
hain-id uni-5 --gas-prices 0.1ujunox --gas auto --gas-adjustment 1.3 --output json -y --no-admin | jq
```

### Smart Contract Query

#### get_hello_world
```
junod query wasm contract-state smart juno1sc9jk03atg2urgedenc5h4363804cwaqqt2qk7mervp5qgf99zhsxw9dt0 '{"get_hello_wor
ld":{}}' --node https://rpc.uni.juno.deuslabs.fi:443 --output json | jq
```
