import { Contract, ethers } from '@ethersproject/contracts';
import Web3 from 'web3';

const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

const deTrashCertificateAbi = [/* ABI of DeTrashCertificate contract */];
const deTrashCertificateAddress = '0xbc68c4ec4182e1d2c73b5e58bd92be9871db2230';
const deTrashCertificateContract = new ethers.Contract(deTrashCertificateAddress, deTrashCertificateAbi, web3);

const celoAbi = [/* ABI of Celo contract */];
const celoAddress = '0x34C11A932853Ae24E845Ad4B633E3cEf91afE583';
const celoContract = new ethers.Contract(celoAddress, celoAbi, web3);

async function interactWithDeTrashCertificate() {
  // Example interaction with DeTrashCertificate contract
  const totalSupply = await deTrashCertificateContract.totalSupply();
  console.log(`Total Supply: ${totalSupply}`);
}

async function interactWithCelo() {
  // Example interaction with Celo contract
  const balance = await celoContract.balanceOf('0xYourAddress');
  console.log(`Balance: ${balance}`);
}

async function sendTransaction(to: string, value: string) {
  const accounts = await web3.eth.getAccounts();
  const receipt = await web3.eth.sendTransaction({
    from: accounts[0],
    to,
    value: web3.utils.toWei(value, 'ether'),
  });
  console.log(`Transaction receipt: ${receipt}`);
}

interactWithDeTrashCertificate();
interactWithCelo();
sendTransaction('0xRecipientAddress', '0.1');
