import { initializeContract, sendMessage } from './contractInteractions.js';

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

                // Optionally send a message to the contract based on user action
                $('#send-message-button').on('click', async function() {
                    const message = "User has connected their wallet."; // Example message
                    const side = "user"; // Example side
                    try {
                        await sendMessage(account, message, side); // Send a message to the contract
                        console.log('Message sent to contract:', message);
                    } catch (error) {
                        console.error('Error sending message:', error);
                        console.error(error); // Log the entire error message and trace
                    }
                });
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