const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || 'https://rpc.ethoprotocol.com');
const CONTRACT_ADDRESS = '0x7eE5B10cad23D36F8Ba9AD30aD1B67A741f39769';
const CONTROLLER_ADDRESS = '0x921b2bcEE3e6e413A81150bda671b2b47c6EF944';
const CONTRACT_ABI = JSON.parse('[{"constant":false,"inputs":[{"name":"contractAddress","type":"address"}],"name":"borrowerContractSelection","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"contractBorrowerTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"},{"name":"newLender","type":"address"}],"name":"contractUpdateLender","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"contractAddress","type":"address"}],"name":"lenderContractSelection","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"getContractAvailability","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"getContractBorrower","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"getContractFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"getContractLender","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"getContractLenderRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"getContractLastPaid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"contractAddress","type":"address"}],"name":"getContractType","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"}]');

let userAccount;

async function initiateLogin() {
  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    userAccount = window.ethereum.selectedAddress;
    document.getElementById('login-account').innerText = `Logged in as ${userAccount}`;
  } else {
    alert('MetaMask is not installed. Please install it to use this application.');
  }
}

async function borrowerContractSelection(contractAddress) {
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  await contract.methods.borrowerContractSelection(contractAddress).send({ from: userAccount, value: web3.utils.toWei('0.01', 'ether') });
}

async function contractBorrowerTransfer(contractAddress, to, value) {
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  await contract.methods.contractBorrowerTransfer(contractAddress, to, value).send({ from: userAccount });
}

async function contractUpdateLender(contractAddress, newLender) {
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  await contract.methods.contractUpdateLender(contractAddress, newLender).send({ from: userAccount });
}

async function lenderContractSelection(contractAddress) {
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  await contract.methods.lenderContractSelection(contractAddress).send({ from: userAccount, value: web3.utils.toWei('0.01', 'ether') });
}

async function getContractAvailability(contractAddress) {
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  return await contract.methods.getContractAvailability(contractAddress).call();
}

async function getContractBorrower(contractAddress) {
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  return await contract.methods.getContractBorrower(contractAddress).call();
}

async function getContractFee(contractAddress) {
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  return await contract.methods.getContractFee(contractAddress).call();
}

async function getContractLender(contractAddress) {
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  return await contract.methods.getContractLender(contractAddress).call();
}

async function getContractLenderRate(contractAddress) {
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  return await contract.methods.getContractLenderRate(contractAddress).call();
}

async function getContractLastPaid(contractAddress) {
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  return await contract.methods.getContractLastPaid(contractAddress).call();
}

async function getContractType(contractAddress) {
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  return await contract.methods.getContractType(contractAddress).call();
}

module.exports = {
  initiateLogin,
  borrowerContractSelection,
  contractBorrowerTransfer,
  contractUpdateLender,
  lenderContractSelection,
  getContractAvailability,
  getContractBorrower,
  getContractFee,
  getContractLender,
  getContractLenderRate,
  getContractLastPaid,
  getContractType
};
