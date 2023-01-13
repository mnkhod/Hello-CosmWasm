#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult, to_binary};
use cw2::set_contract_version;

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg,GetHelloResponse};
use crate::state::{State, STATE};

const CONTRACT_NAME: &str = "crates.io:hello-cosmwasm";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    _msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let state = State { };
    set_contract_version(deps.storage,CONTRACT_NAME,CONTRACT_VERSION)?;
    STATE.save(deps.storage,&state)?;

    Ok(Response::new()
        .add_attribute("owner",info.sender)
    )
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg { }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(_deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetHelloWorld {} => to_binary(&query::hello()?),
    }
}

pub mod query {

    use super::*;

    pub fn hello() -> StdResult<GetHelloResponse> {
        Ok(GetHelloResponse { msg: "Hello World".to_string() })
    }
}

#[cfg(test)]
mod tests {
    use cosmwasm_std::{testing::{mock_dependencies, mock_info, mock_env}, coins, from_binary};

    use super::*;

    #[test]
    fn hello(){
        let mut deps = mock_dependencies();
        let msg = InstantiateMsg{};
        let info = mock_info("creator",&coins(2,"token"));

        let response = instantiate(deps.as_mut(),mock_env(),info,msg).unwrap();
        assert_eq!(0,response.messages.len());

        let response = query(deps.as_ref(),mock_env(),QueryMsg::GetHelloWorld {}).unwrap();
        let value: GetHelloResponse = from_binary(&response).unwrap();
        assert_eq!("Hello World",value.msg);
    }
}
