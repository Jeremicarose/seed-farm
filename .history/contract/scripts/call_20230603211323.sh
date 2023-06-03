#!/bin/bash

source ./scripts/setting.conf

# View existing AvocadoProducts in the contract
near view $SUB_ACCOUNT getovas

# Add AvocadoProduct to the contract
#near call $SUB_ACCOUNT addova '{"price": 7, "quantity": 2, "expiration": "5/06/2022", "value_addition": "oil", "location": "Kenya", "variety": "Sweet"}' --accountId arose.testnet

# Get AvocadoProduct by ID
#near view $SUB_ACCOUNT getova '{"id": 0}'

# Buy AvocadoProduct
#near call $SUB_ACCOUNT buy '{"id": 0}' --accountId arose.testnet --amount 8

# Get updated AvocadoProduct by ID
#near view $SUB_ACCOUNT getova '{"id": 0}'

# Cleanup
#near delete $SUB_ACCOUNT arose.testnet
