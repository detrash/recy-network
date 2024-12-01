import { Injectable } from '@nestjs/common';
import { Contract, ethers } from '@ethersproject/contracts';
import Web3 from 'web3';

@Injectable()
export class AppService {
  private web3: Web3;
  private deTrashCertificateContract: Contract;
  private celoContract: Contract;

  constructor() {
    this.web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
    const deTrashCertificateAbi = [/* ABI of DeTrashCertificate contract */];
    const deTrashCertificateAddress = '0xbc68c4ec4182e1d2c73b5e58bd92be9871db2230';
    this.deTrashCertificateContract = new ethers.Contract(deTrashCertificateAddress, deTrashCertificateAbi, this.web3);

    const celoAbi = [/* ABI of Celo contract */];
    const celoAddress = '0x34C11A932853Ae24E845Ad4B633E3cEf91afE583';
    this.celoContract = new ethers.Contract(celoAddress, celoAbi, this.web3);
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async interactWithDeTrashCertificate() {
    // Example interaction with DeTrashCertificate contract
    const totalSupply = await this.deTrashCertificateContract.totalSupply();
    return totalSupply;
  }

  async interactWithCelo() {
    // Example interaction with Celo contract
    const balance = await this.celoContract.balanceOf('0xYourAddress');
    return balance;
  }

  async sendTransaction(to: string, value: string) {
    const accounts = await this.web3.eth.getAccounts();
    const receipt = await this.web3.eth.sendTransaction({
      from: accounts[0],
      to,
      value: this.web3.utils.toWei(value, 'ether'),
    });
    return receipt;
  }
}
