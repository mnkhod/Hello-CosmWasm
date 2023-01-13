/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.24.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { InstantiateMsg, ExecuteMsg, QueryMsg, GetHelloResponse } from "./HelloCosmwasm.types";
export interface HelloCosmwasmReadOnlyInterface {
  contractAddress: string;
  getHelloWorld: () => Promise<GetHelloResponse>;
}
export class HelloCosmwasmQueryClient implements HelloCosmwasmReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.getHelloWorld = this.getHelloWorld.bind(this);
  }

  getHelloWorld = async (): Promise<GetHelloResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_hello_world: {}
    });
  };
}