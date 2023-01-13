use cosmwasm_schema::{cw_serde, QueryResponses};

#[cw_serde]
pub struct InstantiateMsg {}

#[cw_serde]
pub enum ExecuteMsg {}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {

    #[returns(GetHelloResponse)]
    GetHelloWorld {},
}

#[cw_serde]
pub struct GetHelloResponse {
    pub msg: String
}
