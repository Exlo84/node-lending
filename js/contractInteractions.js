const contractAddress = '0x7eE5B10cad23D36F8Ba9AD30aD1B67A741f39769';
const contractABI = JSON.parse('[{"constant":false,"inputs":[{"name":"contractAddress","type":"address"},{"name":"contractMessage","type":"string"},{"name":"messageSide","type":"string"}],"name":"addContractMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"}],"name":"borrowerContractSelection","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}]');
let contract;

async function initializeContract(signer) {
    try {
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log('Contract initialized:', contract);
    } catch (error) {
        console.error('Error initializing contract:', error);
    }
}

async function sendMessage(contractAddress, message, side) {
    try {
        const tx = await contract.addContractMessage(contractAddress, message, side);
        await tx.wait();
        console.log('Message sent:', tx);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Ensure that the sendMessage function is called appropriately
$(document).ready(function() {
    $('#sendMessageModalButton').on('click', async function() {
        const message = $('#new-message').val(); // Get the message from the textarea
        const side = "user"; // Example side
        const account = $('#login-account').text(); // Get the connected account
        try {
            await sendMessage(account, message, side); // Send a message to the contract
            console.log('Message sent to contract:', message);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });
});

// Export functions for external usage
export { initializeContract, sendMessage };