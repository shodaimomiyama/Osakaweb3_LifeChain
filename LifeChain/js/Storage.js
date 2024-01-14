import ViewControl from './ViewControl.js';

class Storage extends ViewControl {
    constructor() {
        super();
    }

    async encryptFile() {
        const file = this.currentFile; // ViewControl から受け取ったファイル
        const archiveId = this.makeArchiveId(file);
        const accessControlConditions = this.accessControlConditionsByArchive[archiveId];
        const authSig = this.authSig;
        const litNodeClient = this.litNodeClient; // Initialization classでgetAuthSig()を実行した際のlitNodeClientを利用

        const zipBlob = await litNodeClient.encryptFileAndZipWithMetadata({
            accessControlConditions: accessControlConditions,
            authSig: authSig,
            chain: 'sepolia',
            dataToEncrypt: file,
            litNodeClient,
            readme: "This file was encrypted using LitProtocol and the Irys Provenance Toolkit.",
        });

        return zipBlob;
    }

    async uploadFile() {
        const file = this.archiveFile; // ViewControl classでmakeArchiveId()を実行した際に保存されたファイルを利用
        const irys = await this.getWebIrys();

        try {
            const price = await irys.getPrice(file?.size);
            const balance = await irys.getLoadedBalance();

            if (price.isGreaterThanOrEqualTo(balance)) {
                console.log("Funding node.");
                await irys.fund(price);
            } else {
                console.log("Funding not needed, balance sufficient.");
            }

            const receipt = await irys.uploadFile(file, { tags });
            console.log(`Uploaded successfully. ${process.env.GATEWAY_BASE || 'https://gateway.irys.xyz/'}${receipt.id}`);

            return receipt.id;
        } catch (e) {
            console.error("Error uploading file ", e);
            return null;
        }
    }

    async encryptAndUploadFile(file) {
        // ... 省略（ファイルの暗号化とアップロード処理）
        const encryptedData = await this.encryptFile(file);
        return await this.uploadFile(encryptedData);
    }
}

export default Storage;























// import ViewControl from './ViewControl.js';
// import { WebIrys } from "@irys/sdk";
// import { providers } from "ethers";

// class Storage extends ViewControl {
//     constructor() {
//         super();
//     }

//     async encryptFile(file) {
//         const accessControlConditions = this.accessControlConditionsByArchive[this.archiveId];
//         const authSig = this.authSig;
//         // Implement encryption logic here
//         const zipBlob = await LitJsSdk_litNodeClient_litNodeClient.encryptFileAndZipWithMetadata({
//             accessControlConditions: this.accessControlConditions,
//             authSig: this.authSig,
//             chain: 'sepolia',
//             dataToEncrypt: file,
//             litNodeClient,
//             readme: "This file was encrypted using LitProtocol and the Irys Provenance Toolkit.",
//         });

//         return zipBlob;
//     }

//     async uploadFile(file) {
//         // Implement upload logic here
//         const irys = await WebIrys();

// try {
//     const price = await irys.getPrice(file?.size);
//     const balance = await irys.getLoadedBalance();

//     if (price.isGreaterThanOrEqualTo(balance)) {
//         console.log("Funding node.");
//         await irys.fund(price);
//     } else {
//         console.log("Funding not needed, balance sufficient.");
//     }

// Tag the upload marking it as
// - Binary file
// - Containing a file of type file.type (used when displaying)
// - Encrypted (used by our display code)
// const tags: Tag[] = [
//     {
//         name: "Content-Type",
//         value: "application/octet-stream",
//     },
//     {
//         name: "Encrypted-File-Content-Type",
//         value: file.type,
//     },
//     {
//         name: "Irys-Encrypted",
//         value: "true",
//     },
// ];

// const receipt = await irys.uploadFile(file, {
//     tags,
// });
// console.log(`Uploaded successfully. ${GATEWAY_BASE}${receipt.id}`);

// return receipt.id;
//         } catch (e) {
//             console.log("Error uploading single file ", e);
//         }
//         return "";
//     }

// async encryptAndUploadFile(file) {
//     const encryptedData = await this.encryptFile(file);
//     return await this.uploadFile(encryptedData);
// }
// }

// export default Storage;



// import ViewControl from './ViewControl.js';
// import { WebIrys } from "@irys/sdk";
// import { providers } from "../node_modules/ethers"

// class Storage extends ViewControl {
//     constructor() {
//         console.log("Storage Constructor");
//         super(); // 親クラスのコンストラクタを呼び出す
//         this.cid = null; // CIDを保持するためのプロパティ
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


//     // const uploadData = async (dataToUpload) => {
//     //     const webIrys = await getWebIrys();
//     //     //const dataToUpload = ciphertext;
//     //     try {
//     //         const receipt = await webIrys.upload(dataToUpload);
//     //         console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
//     //     } catch (e) {
//     //         console.log("Error uploading data ", e);
//     //     }
//     // };

// async function encryptFile(file: File) {
//     // 1. Connect to a Lit node
//     // 2. Ensure we have a wallet signature
//     // 3. Define access control conditions.
//     // 4. Create a zip blob containing the encrypted file and associated metadata
//     const zipBlob = await LitJsSdk_litNodeClient.encryptFileAndZipWithMetadata({
//         accessControlConditions: this.accessControlConditions,
//         authSig: this.authSig,
//         chain: 'sepolia',
//         dataToEncrypt: file,
//         litNodeClient,
//         readme: "This file was encrypted using LitProtocol and the Irys Provenance Toolkit.",
//     });

//     return zipBlob;
// }
// // Uploads the encrypted File (with metadata) to Irys
// async function uploadFile(file: File): Promise<string> {
//     const irys = await WebIrys();

//     try {
//         const price = await irys.getPrice(file?.size);
//         const balance = await irys.getLoadedBalance();

//         if (price.isGreaterThanOrEqualTo(balance)) {
//             console.log("Funding node.");
//             await irys.fund(price);
//         } else {
//             console.log("Funding not needed, balance sufficient.");
//         }

//         // Tag the upload marking it as
//         // - Binary file
//         // - Containing a file of type file.type (used when displaying)
//         // - Encrypted (used by our display code)
//         const tags: Tag[] = [
//             {
//                 name: "Content-Type",
//                 value: "application/octet-stream",
//             },
//             {
//                 name: "Encrypted-File-Content-Type",
//                 value: file.type,
//             },
//             {
//                 name: "Irys-Encrypted",
//                 value: "true",
//             },
//         ];

//         const receipt = await irys.uploadFile(file, {
//             tags,
//         });
//         console.log(`Uploaded successfully. ${GATEWAY_BASE}${receipt.id}`);

//         return receipt.id;
//     } catch (e) {
//         console.log("Error uploading single file ", e);
//     }
//     return "";
// }

// // Encrypts and then uploads a File
// async function encryptAndUploadFile(file: File): Promise<string> {
//     const encryptedData = await encryptFile(file);
//     return await uploadFile(encryptedData);
// }

// };

// export default Storage;




// ViewControlクラスをインポート
// import * as LitJsSdk from "../nodo_modules/@lit-protocol/lit-node-client";
// import { createHelia } from '../node_modules/helia'
// import { strings } from '../node_modules/@helia/strings'
//import { json } from '@helia/json'

//         let viewcontrol = new ViewControl();

// const accessControlConditions = this.viewcontrol.accessControlConditionsByArchive[archiveId];

// Create a zip blob containing the encrypted file and associated metadata
// const zipBlob = await LitJsSdk_litNodeClient.encryptFileAndZipWithMetadata({
//     accessControlConditions: this.accessControlConditions,
//     authSig: this.authSig,
//     chain: 'sepolia',
//     dataToEncrypt: file,
//     litNodeClient,
//     readme: "This file was encrypted using LitProtocol and the Irys Provenance Toolkit.",
// });

// async dataStore(file) {
// // ファイルが文字列の場合とバイナリデータの場合で処理を分岐
// let ciphertext, dataToEncryptHash;
// if (typeof file === 'string') {
//     // 文字列データの場合は encryptString を使用
//     ({ ciphertext, dataToEncryptHash } = await LitJsSdk_litNodeClient.encryptString({
//         accessControlConditions: this.accessControlConditions,
//         authSig: this.authSig,
//         chain: 'sepolia',
//         dataToEncrypt: file,
//     }));
// } else {
//     // ファイル（バイナリデータ）の場合は encryptFile を使用
//     ({ ciphertext, dataToEncryptHash } = await LitJsSdk_litNodeClient.encryptFile({
//         accessControlConditions: this.accessControlConditions,
//         authSig: this.authSig,
//         chain: 'sepolia',
//         file: file,
//     }));
// }

// console.log(ciphertext);

// const dataToEncrypt = ciphertext
// uploadData(dataToEncrypt);





// 暗号化されたデータをIPFSに保存
// const ipfs = new IPFS();
// const result = await ipfs.add(ciphertext);
// this.cid = result.path; // IPFSから得られたCIDをクラスのプロパティに保存
// const helia = await createHelia()
// const s = strings(helia)
// const myImmutableContent = await s.add(ciphertext)

// console.log(myImmutableContent);

//Storage クラスを他のファイルからインポート可能にするために使用されます
