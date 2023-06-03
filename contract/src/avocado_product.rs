use near_sdk::borsh::{self, BorshSerialize, BorshDeserialize};
use near_sdk::serde::{Serialize, Deserialize};
use near_sdk::AccountId;
use near_sdk::{near_bindgen};

#[near_bindgen]
#[derive(Debug, BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct AvocadoProduct {
    pub price: u64,
    pub quantity: u64,
    pub expiration: String,
    pub value_addition: String,
    pub location: String,
    pub variety: String,
    pub farmer: AccountId,
}

#[near_bindgen]
impl AvocadoProduct {
    pub fn new(
        price: u64,
        quantity: u64,
        expiration: String,
        value_addition: String,
        location: String,
        variety: String,
        farmer: AccountId,
    ) -> Self {
        Self {
            price,
            quantity,
            expiration,
            value_addition,
            location,
            variety,
            farmer,
        }
    }
}
