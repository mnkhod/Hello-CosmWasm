# Hello-CosmWasm
---
Code-Id : 4150

### Smart Contract Code Upload
```
junod tx wasm store artifacts/hello_cosmwasm.wasm --from dev --node https://rpc.uni.juno.deuslabs.fi:443 --chain-id u
ni-5 --gas-prices 0.1ujunox --gas auto --gas-adjustment 1.3 -y --output json -b block | jq
```
