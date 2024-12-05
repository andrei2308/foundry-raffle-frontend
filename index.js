import { ethers } from './ethers-6.7.esm.min.js';
import { abi, address } from "./constants.js";
const connectButton = document.getElementById('connectButton');
const enterRaffle = document.getElementById('enterRaffle');
const pickWinner = document.getElementById('pickWinner');
console.log(abi);
connectButton.addEventListener('click', async () => {
    if (typeof window.ethereum != "undefined") {
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
        } catch (e) {
            console.log(e);
        }
        connectButton.innerHTML = "Connected";
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log(accounts);
    }
    else {
        connectButton.innerHTML = "Please install Metamask";
    }
});
enterRaffle.addEventListener('click', async () => {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer);
        try {
            console.log("Entering raffle...");
            const tx = await contract.enterRaffle({
                value: ethers.parseEther("0.001"),
                gasLimit: 1000000
            });
            await tx.wait(1);
            console.log("Raffle entered!");
        } catch (e) {
            console.log(e);
        }
    }
    else {
        console.log("Please install Metamask");
    }
});
pickWinner.addEventListener('click', async () => {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer);
        try {
            console.log("Picking winner...");
            const tx = await contract.performUpkeep("0x");
            await tx.wait(1);
            console.log("Winner picked!");
        } catch (e) {
            console.log(e);
        }
    }
});
