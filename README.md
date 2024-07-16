# Demo Video
- [Video Demo](https://youtu.be/ThBO5Olkha4)

## Documentation of the Smart Contract
- [Documentaion Link](https://drive.google.com/file/d/1D38QYmrl7dZZJjN71aJ_CHTX5qB4oLQ9/view?usp=sharing)
# WorkFlow of the app


```mermaid
sequenceDiagram
    participant User
    participant Owner
    participant LicenseFractions
    participant ERC1155Token

    Owner->>LicenseFractions: Deploy Contract
    Owner->>LicenseFractions: createLicense(_batchTotalPrice, _noOfBatches)
    LicenseFractions->>LicenseFractions: Increment licenseId
    LicenseFractions->>LicenseFractions: Set licenseBatchPrice
    LicenseFractions->>LicenseFractions: Set idToRemaining

    User->>LicenseFractions: buyLicenseFractions(_licenseId, _quantity)
    LicenseFractions->>LicenseFractions: Check availability
    LicenseFractions->>LicenseFractions: Verify payment
    LicenseFractions->>LicenseFractions: Update canMint, idToQuantityPurchased, idToRemaining

    User->>LicenseFractions: mintLicenseFractions(_licenseId)
    LicenseFractions->>LicenseFractions: Check eligibility
    LicenseFractions->>ERC1155Token: _mint(user, _licenseId, quantity, "")

    Owner->>LicenseFractions: grantBurnAccess(_rapidNode)
    LicenseFractions->>LicenseFractions: Set burnAccess

    Note over LicenseFractions: Assume _rapidNode is set

    LicenseFractions->>LicenseFractions: burn(_from, _id, _value)
    LicenseFractions->>ERC1155Token: _burn(_from, _id, _value)

    User->>LicenseFractions: getFractionBuyPrice(_licenseId, _quantity)
    LicenseFractions-->>User: Return price

    Owner->>LicenseFractions: withdraw(_beneficiary)
    LicenseFractions->>LicenseFractions: Check balance
    LicenseFractions-->>Owner: Transfer funds

    






