use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{UnorderedMap, Vector};
use near_sdk::{env, near_bindgen, AccountId, Promise};

const SALES_EXPECTED_ERR: &str = "Out of stock";
const AMOUNT_EXPECTED_ERR: &str = "Not enough money";

mod avocado_product;

use crate::avocado_product::AvocadoProduct;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct AvocadoDisplay {
    ova: UnorderedMap<u64, AvocadoProduct>,
    buyer: UnorderedMap<u64, Vector<AccountId>>,
}

#[near_bindgen]
impl AvocadoDisplay {
    pub fn addova(
        &mut self,
        price: u64,
        quantity: u64,
        expiration: String,
        value_addition: String,
        location: String,
        variety: String,
    ) {
        let index: u64 = self.ova.len() as u64 + 1;
        let avo = AvocadoProduct::new(
            price,
            quantity,
            expiration,
            value_addition,
            location,
            variety,
            env::signer_account_id(),
        );
        self.ova.insert(&index, &avo);
    }

    pub fn getova(&self, id: u64) -> Option<AvocadoProduct> {
        self.ova.get(&id)
    }

    fn buyer_list(&self, id: u64) -> Vec<AccountId> {
        if let Some(i) = self.buyer.get(&id) {
            return i.to_vec();
        }
        Vec::new()
    }
    

    pub fn getovas(&self) -> Vec<(u64, AvocadoProduct, Vec<AccountId>)> {
        self.ova
            .iter()
            .map(|(id, avo)| (id, avo.clone(), self.buyer_list(id)))
            .collect()
    }

    #[payable]
    pub fn buy(&mut self, id: u64) {
        let ovas = self.ova.get(&id).expect("Invalid avocado product ID");
        let deposit = env::attached_deposit();
        if (ovas.price * ovas.quantity) as u128 <= deposit {
            let buyer = self.buyer_list(id);
            if (buyer.len() + 1) as u64 > ovas.quantity {
                env::panic_str(SALES_EXPECTED_ERR);
            } else {
                Promise::new(ovas.farmer.clone()).transfer(deposit);
                let mut buyers = self.buyer.get(&id).unwrap_or_else(|| Vector::new(b"b".to_vec()));
                buyers.push(&env::signer_account_id());
                self.buyer.insert(&id, &buyers);
            }
        } else {
            env::panic_str(AMOUNT_EXPECTED_ERR);
        }
    }
}

impl Default for AvocadoDisplay {
    fn default() -> Self {
        Self {
            ova: UnorderedMap::<u64, AvocadoProduct>::new(b'o'),
            buyer: UnorderedMap::<u64, Vector<AccountId>>::new(b'b'),
        }
    }
}
