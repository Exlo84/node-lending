import { initializeContract } from './contractInteractions.js';

$(document).ready(function() {
    const statusDiv = $('#metamask-status');
    const loginAccountDiv = $('#login-account');

    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        statusDiv.text('MetaMask is installed. Click the button to connect.');

        $('#connect-metamask').on('click', async function() {
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                statusDiv.text(`Connected as: ${account}`);
                loginAccountDiv.text(`Logged in as: ${account}`);
                console.log(`MetaMask connected: ${account}`);

                // Initialize Ethers provider and signer
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                await initializeContract(signer); // Initialize the contract with the signer

                // ABI for the contract
                const contractAddress = '0x7eE5B10cad23D36F8Ba9AD30aD1B67A741f39769';
                const contractABI = [
                    {
                        "constant": false,
                        "inputs": [
                            {"name": "contractAddress", "type": "address"},
                            {"name": "contractMessage", "type": "string"},
                            {"name": "messageSide", "type": "string"}
                        ],
                        "name": "addContractMessage",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "constant": false,
                        "inputs": [{"name": "contractAddress", "type": "address"}],
                        "name": "borrowerContractSelection",
                        "outputs": [],
                        "payable": true,
                        "stateMutability": "payable",
                        "type": "function"
                    },
                    // Add other functions from the ABI as needed
                ];
                const contract = new ethers.Contract(contractAddress, contractABI, signer);

                // Call a function from the contract if needed
                // const result = await contract.yourFunction(); // Replace with the actual function you want to call
            } catch (error) {
                statusDiv.text('Connection failed. Please try again.');
                console.error('User denied account access or error occurred:', error);
                console.error(error); // Log the entire error message and trace
            }
        });
    } else {
        statusDiv.text('MetaMask is not installed. Please install it to use this application.');
        $('#connect-metamask').prop('disabled', true);
    }
});