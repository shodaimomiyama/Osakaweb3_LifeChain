import { WebIrys } from "@irys/sdk";
import { providers, ethers } from "ethers";

class Initialization {
    constructor() {
        console.log("Initialization Constructor");
        this.litNodeClient = null;
        this.authSig = null;
        this.webIrys = null;
    }

    async getAuthSig() {
        console.log("getAuthSig");
        this.litNodeClient = new LitJsSdk_litNodeClient.LitNodeClient({ litNetwork: "cayenne" });
        await this.litNodeClient.connect();
        this.authSig = await this.LitJsSdk_litNodeClient.checkAndSignAuthMessage({ chain: "ethereum" });
        console.log("LitNode Client connected and AuthSig obtained");
    }

    async getWebIrys() {
        console.log("Getting WebIrys client");
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new providers.Web3Provider(ethereum);
        const url = process.env.IRYS_URL || "https://devnet.irys.xyz";
        const token = "ethereum";
        const rpcURL = process.env.ETH_RPC_URL || "https://chainlist.org";
        const wallet = { rpcUrl: rpcURL, name: "ethersv5", provider: provider };
        this.webIrys = new WebIrys({ url, token, wallet });
        await this.webIrys.ready();
    }

    async checkIrysNodeBalance() {
        console.log("Checking Irys Node balance and funding if necessary");
        await this.getWebIrys();
        const atomicBalance = await this.webIrys.getLoadedBalance();
        const balance = this.webIrys.utils.fromAtomic(atomicBalance);
        console.log(`Current balance: ${balance} ${this.webIrys.token}`);

        const threshold = 0.1;
        if (balance <= threshold) {
            console.log("Balance is low, funding node...");
            await this.fundNode();
        } else {
            console.log("Balance is sufficient, no funding needed.");
        }
    }

    async fundNode() {
        console.log("Funding Irys Node");
        try {
            const fundTx = await this.webIrys.fund(this.webIrys.utils.toAtomic(0.05));
            console.log(`Successfully funded ${this.webIrys.utils.fromAtomic(fundTx.quantity)} ${this.webIrys.token}`);
        } catch (e) {
            console.error("Error funding node", e);
        }
    }
}

export default Initialization;


























// import { WebIrys } from "@irys/sdk";
// import { providers, ethers } from "ethers";

// class Initialization {
//     constructor() {
//         console.log("Initialization Constructor");
//         this.litNodeClient = null; // LitNodeクライアントを初期化
//         this.authSig = null; // 認証シグネチャを初期化
//         this.webIrys = null; // WebIrysクライアントを初期化
//     }

//     async getAuthSig() {
//         console.log("getAuthSig");
//         this.litNodeClient = new LitJsSdk.LitNodeClient({ litNetwork: "cayenne" });
//         await this.litNodeClient.connect();
//         this.authSig = await this.litNodeClient.checkAndSignAuthMessage({ chain: "ethereum" });
//         console.log("LitNode Client connected and AuthSig obtained");
//     }

//     async getWebIrys() {
//         console.log("Getting WebIrys client");
//         await window.ethereum.enable();
//         const provider = new providers.Web3Provider(window.ethereum);
//         const url = "https://devnet.irys.xyz";
//         const token = "ethereum"; // or "sepolia"
//         const rpcURL = "https://chainlist.org"; // Use an updated RPC URL
//         const wallet = { rpcUrl: rpcURL, name: "ethersv5", provider: provider };
//         this.webIrys = new WebIrys({ url, token, wallet });
//         await this.webIrys.ready();
//     }

//     async checkIrysNodeBalance() {
//         console.log("Checking Irys Node balance and funding if necessary");
//         await this.getWebIrys();
//         const atomicBalance = await this.webIrys.getLoadedBalance();
//         const balance = this.webIrys.utils.fromAtomic(atomicBalance);
//         console.log(`Current balance: ${balance} ${this.webIrys.token}`);

//         const threshold = 0.1; // Threshold for balance
//         if (balance <= threshold) {
//             console.log("Balance is low, funding node...");
//             await this.fundNode();
//         } else {
//             console.log("Balance is sufficient, no funding needed.");
//         }
//     }

//     async fundNode() {
//         console.log("Funding Irys Node");
//         try {
//             const fundTx = await this.webIrys.fund(this.webIrys.utils.toAtomic(0.05));
//             console.log(`Successfully funded ${this.webIrys.utils.fromAtomic(fundTx.quantity)} ${this.webIrys.token}`);
//         } catch (e) {
//             console.error("Error funding node", e);
//         }
//     }
// }

// export default Initialization;


// import { WebIrys } from "@irys/sdk";
// import { providers } from "../node_modules/ethers"

// class Initialization {
//     constructor() {
//         console.log("Initialization Constructor");
//         this.litNodeClient = null; // LitNodeクライアントを初期化
//         this.authSig = null; // 認証シグネチャを初期化
//     }

//     async getAuthSig() {
//         console.log("getAuthSig");

//         // LitNodeクライアントの構築と接続
//         const client = new LitJsSdk_litNodeClient.LitNodeClient({ litNetwork: "cayenne" });
//         await client.connect(); // LitNodeクライアントに接続
//         this.litNodeClient = client; // 接続したクライアントをインスタンス変数に格納

//         // 認証シグネチャの取得
//         this.authSig = await LitJsSdk_litNodeClient.checkAndSignAuthMessage({ chain: "ethereum" });
//     }

//     const getWebIrys = async () => {
//         // Ethers5 provider
//         await window.ethereum.enable();
//         const provider = new providers.Web3Provider(window.ethereum);

//         const url = "https://devnet.irys.xyz";
//         const token = "ethereum"; //sepolia
//         // Devnet RPC URLs change often, use a recent one from https://chainlist.org
//         const rpcURL = "https://chainlist.org";

//         // Create a wallet object
//         const wallet = { rpcUrl: rpcURL, name: "ethersv5", provider: provider };
//         // Use the wallet object
//         const webIrys = new WebIrys({ url, token, wallet });
//         await webIrys.ready();

//         return webIrys;
//     };

//     const checkBalance = async () => {
//         const irys = await getIrys();

//         // Get loaded balance in atomic units
//         const atomicBalance = await irys.getLoadedBalance();
//         // Convert balance to standard units
//         const convertedBalance = irys.utils.fromAtomic(atomicBalance);
//         return convertedBalance;
//     };

//     const checkAndPrintBalance = async () => {
//         const balance = await checkBalance();
//         const threshold = 0.1; // 10% threshold

//         if (Math.abs(balance) <= threshold) {
//             console.log(`Balance ${balance} is within 10% of 0, please fund.`);
//         } else {
//             console.log(`Balance ${balance} funding not yet needed.`);
//         }
//     };

//     const fundNode = async () => {
//         const webIrys = await getWebIrys();
//         try {
//             const fundTx = await webIrys.fund(webIrys.utils.toAtomic(0.05));
//             console.log(`Successfully funded ${webIrys.utils.fromAtomic(fundTx.quantity)} ${webIrys.token}`);
//         } catch (e) {
//             console.log("Error uploading data ", e);
//         }
//     };
// }

// export default Initialization;

// import * as LitJsSdk from "./nodo_modules/@lit-protocol/lit-node-client";
// class Initialization {
//     constructor() {
//         console.log("Initialization Constractor");
//         this.litNodeClient = null; // LitNodeクライアントを初期化
//         this.authSig = null; // 認証シグネチャを初期化
//     }

//     async buildLitNode() {
//         const client = new LitJsSdk_litNodeClient.LitNodeClient({ litNetwork: "cayenne" });
//         await client.connect(); // LitNodeクライアントに接続
//         this.litNodeClient = client; // 接続したクライアントをインスタンス変数に格納
//     }

//     async getAuthSig() {
//         console.log("getAuthSig");
//         this.authSig = await LitJsSdk_litNodeClient.checkAndSignAuthMessage({ chain: "ethereum" }); // 認証シグネチャを取得
//     }
// }

// export default Initialization;


//package.json
// "test": "echo \"Error: no test specified\" && exit 1"