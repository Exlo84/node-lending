$(document).ready(function() {
    const statusDiv = $('#status');
    const loginAccountDiv = $('#login-account');

    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        $('#metamask-status').text('MetaMask is installed. Click the button to connect.');

        // Connect to MetaMask
        $('#connect-metamask').on('click', async function() {
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                $('#metamask-status').text(`Connected as: ${account}`);
                loginAccountDiv.text(`Logged in as: ${account}`); // Update the login account display
                console.log(`MetaMask connected: ${account}`);

                // Initialize Ethers provider and signer
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                console.log('Ethers provider and signer initialized.');

                // Now you can interact with your smart contracts
                const contractAddress = '0x7eE5B10cad23D36F8Ba9AD30aD1B67A741f39769';
                const contractABI = JSON.parse('[{"constant":false,"inputs":[{"name":"contractAddress","type":"address"},{"name":"contractMessage","type":"string"},{"name":"messageSide","type":"string"}],"name":"addContractMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"}],"name":"borrowerContractSelection","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"contractBorrowerTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"split","type":"uint256"},{"name":"nodeType","type":"string"},{"name":"fee","type":"uint256"},{"name":"contractText","type":"string"}],"name":"createLendingContract","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"}],"name":"removeContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"}],"name":"resetContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"setGnCollateralAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"setMnCollateralAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"setSnCollateralAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"borrowerCountMapping","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"getContractCollateralAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"getContractLastPaid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"getContractLastReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"gnCollateralRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"lenderContractMessaging","outputs":[{"name":"lendingContractAddress","type":"address"},{"name":"message","type":"string"},{"name":"blockHeight","type":"uint256"},{"name":"side","type":"string"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lenderCountMapping","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lendingContractCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"lendingContractCountMapping","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lendingContractMapping","outputs":[{"name":"nodeType","type":"string"},{"name":"index","type":"uint256"},{"name":"lenderIndex","type":"uint256"},{"name":"borrowerIndex","type":"uint256"},{"name":"lenderAddress","type":"address"},{"name":"borrowerAddress","type":"address"},{"name":"lendingContractAddress","type":"address"},{"name":"originationFee","type":"uint256"},{"name":"available","type":"bool"},{"name":"lenderSplit","type":"uint256"},{"name":"text","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"lendingContractsMappingByBorrower","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"lendingContractsMappingByLender","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"messageCountMapping","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minOriginationFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"mnCollateralRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"snCollateralRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"totalContractMessages","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]');
                const contract = new ethers.Contract(contractAddress, contractABI, signer);

                // Call a function from the contract
                const result = await contract.yourFunction(); // Replace with the actual function you want to call
                console.log(result);
            } catch (error) {
                $('#metamask-status').text('Connection failed. Please try again.');
                console.error('User denied account access or error occurred:', error);
                console.error(error);
            }
        });
    } else {
        $('#metamask-status').text('MetaMask is not installed. Please install it to use this application.');
        $('#connect-metamask').prop('disabled', true);
        console.warn('MetaMask is not installed.');
    }
});