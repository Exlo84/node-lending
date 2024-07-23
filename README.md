```markdown
# Node Lending

Node Lending is a decentralized lending platform built on the Ethereum blockchain, allowing users to create and manage lending contracts through smart contracts. The platform facilitates secure and transparent lending transactions, enabling lenders to offer loans with specific collateral requirements and origination fees, while borrowers can select contracts that suit their needs.

## Overview

The application architecture consists of a decentralized lending platform utilizing Solidity for smart contract development. It features three main smart contracts: `LenderManagement`, `NodeLender`, and `LendingController`. The frontend is developed using HTML, CSS, and JavaScript, specifically leveraging jQuery for DOM manipulation and Bootstrap for responsive design. The application interacts with the Ethereum blockchain through Web3.js, enabling users to create and manage lending contracts securely. Data is stored on the blockchain, ensuring immutability and transparency without the need for traditional database persistence. The user interface is designed to be responsive and user-friendly, featuring modals for user interactions and a straightforward layout for managing contracts and communication between lenders and borrowers.

## Features

- **Lending Contract Creation**: Lenders can create new contracts by specifying parameters such as node type, collateral amount, and origination fee.
- **Contract Management**: Lenders can manage contracts, including viewing details, adding messages, and resetting contracts. Borrowers can select available contracts.
- **Messaging System**: Lenders and borrowers can communicate through messages related to specific contracts.
- **Contract Reset and Deletion**: Contracts can be reset or deleted under certain conditions, allowing for effective contract management.
- **Data Retrieval**: The platform provides an interface for retrieving data about all lending contracts, including collateral amounts and last paid dates.
- **Responsive User Interface**: The application features a user-friendly interface that is responsive across various devices.

## Getting started

### Requirements

To run the project, ensure you have the following technologies installed on your computer:

- Node.js
- An Ethereum client (remote RPC)
- MetaMask browser extension

### Quickstart

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies using npm:
   ```
   npm install
   ```
4. Start the application:
   ```
   node app.js
   ```
5. Open your browser and navigate to `http://localhost:PORT` to access the application (replace `PORT` with the appropriate port number).

### License

Copyright (c) 2024.
```