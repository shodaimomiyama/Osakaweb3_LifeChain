import Storage from './Storage.js';

class View extends Storage {
    constructor() {
        super();
    }

    arrayBufferToBlob(buffer, type) {
        return new Blob([buffer], { type: type });
    }

    blobToDataURL(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = event => {
                if (event.target?.result) {
                    resolve(event.target.result);
                } else {
                    reject(new Error("Failed to read blob as Data URL"));
                }
            };
            reader.readAsDataURL(blob);
        });
    }

    async decryptFile(id, encryptedFileType) {
        const gatewayBase = process.env.GATEWAY_BASE || 'https://gateway.irys.xyz/';
        const chain = process.env.CHAIN || 'ethereum';

        try {
            const response = await fetch(`${gatewayBase}${id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch encrypted file from gateway with ID: ${id}`);
            }

            const zipBlob = await response.blob();
            const litNodeClient = this.litNodeClient;
            const authSig = this.authSig;

            const result = await LitJsSdk.decryptZipFileWithMetadata({
                file: zipBlob,
                litNodeClient: litNodeClient,
                authSig: authSig,
            });

            const decryptedFile = result.decryptedFile;
            const blob = this.arrayBufferToBlob(decryptedFile, encryptedFileType);
            const dataUrl = await this.blobToDataURL(blob);

            return dataUrl;
        } catch (e) {
            console.error("Error decrypting file:", e);
            return "";
        }
    }
}

export default View;





















// import Storage from './Storage.js';

// class View extends Storage {
//     constructor() {
//         super();
//     }

//     arrayBufferToBlob(buffer, type) {
//         return new Blob([buffer], { type: type });
//     }

//     blobToDataURL(blob) {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onload = event => {
//                 if (event.target?.result) {
//                     resolve(event.target.result);
//                 } else {
//                     reject(new Error("Failed to read blob as Data URL"));
//                 }
//             };
//             reader.readAsDataURL(blob);
//         });
//     }

//     async decryptFile(id, encryptedFileType) {
//         try {
//             const response = await fetch(`${process.env.GATEWAY_BASE}${id}`);
//             if (!response.ok) {
//                 throw new Error(`Failed to fetch encrypted file from gateway with ID: ${id}`);
//             }

//             const zipBlob = await response.blob();
//             const litNodeClient = new LitJsSdk_litNodeClient.LitNodeClient({ litNetwork: "cayenne" });
//             await litNodeClient.connect();
//             const authSig = await LitJsSdk_litNodeClient.checkAndSignAuthMessage({ chain: "ethereum" });

//             const result = await LitJsSdk_litNodeClient.decryptZipFileWithMetadata({
//                 file: zipBlob,
//                 litNodeClient: litNodeClient,
//                 authSig: authSig,
//             });

//             const decryptedFile = result.decryptedFile;
//             const blob = this.arrayBufferToBlob(decryptedFile, encryptedFileType);
//             const dataUrl = await this.blobToDataURL(blob);

//             return dataUrl;
//         } catch (e) {
//             console.error("Error decrypting file:", e);
//         }
//         return "";
//     }
// }

// export default View;

// import Storage from './Storage.js';

// class View extends Storage {

//     constructor() {
//         super(); // 親クラスのコンストラクタを呼び出す
//         // このクラス特有のプロパティがあればここで初期化
//     }

//     // Helper functions for use in showing decrypted images
//     function arrayBufferToBlob(buffer: ArrayBuffer, type: string): Blob {
//     return new Blob([buffer], { type: type });
// }

// function blobToDataURL(blob: Blob): Promise<string> {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//             if (event.target?.result) {
//                 resolve(event.target.result as string);
//             } else {
//                 reject(new Error("Failed to read blob as Data URL"));
//             }
//         };
//         reader.readAsDataURL(blob);
//     });
// }

// async function decryptFile(id: string, encryptedFileType: string): Promise<string> {
//     try {
//         // 1. Retrieve the file from https://gateway.irys.xyz/${id}
//         const response = await fetch(`${GATEWAY_BASE}${id}`);
//         if (!response.ok) {
//             throw new Error(`Failed to fetch encrypted file from gateway with ID: ${id}`);
//         }

//         // 2. Extract the zipBlob
//         const zipBlob = await response.blob();

//         // 3. Connect to a Lit node
//         const litNodeClient = new LitJsSdk_litNodeClient.LitNodeClient({
//             litNetwork: "cayenne",
//         });
//         await litNodeClient.connect();

//         // 3.5 Get a reference to an AuthSig (if in local storage that will be used instead of prompting the user to sign)
//         const authSig = await LitJsSdk.checkAndSignAuthMessage({
//             chain: process.env.NEXT_PUBLIC_LIT_CHAIN || "polygon",
//         });

//         // 4. Decrypt the zipBlob
//         const result = await LitJsSdk.decryptZipFileWithMetadata({
//             file: zipBlob,
//             litNodeClient: litNodeClient,
//             authSig: authSig, // Include this only if necessary
//         });
//         const decryptedFile = result.decryptedFile;
//         // 5. Convert to a blob
//         const blob = arrayBufferToBlob(decryptedFile, encryptedFileType);
//         // 6. Build a dynamic URL
//         const dataUrl = await blobToDataURL(blob);

//         return dataUrl;
//     } catch (e) {
//         console.error("Error decrypting file:", e);
//     }
//     return "";
// }

// }

// export default View;


// Storageクラスをインポート（ファイルパスは適宜調整してください）
// import { createHelia } from '../node_modules/helia';
// import { strings } from '../node_modules/@helia';
//import LitJsSdk from 'lit-js-sdk';
// IPFSからデータを取得し、復号化して表示するメソッド
// async dataRetrieve(cid) {
//     // IPFSインスタンスを作成
//     // const helia = await createHelia()
//     // const s = strings(helia)

//     // // CIDを使用してデータを取得
//     // const encryptedData = await s.get(cid);

//     // 復号化処理（条件に応じて）
//     let decryptedData;
//     if (this.authSig && this.accessControlConditions) {
//         decryptedData = await LitJsSdk_litNodeClient.decryptString({
//             encryptedString: encryptedData,
//             accessControlConditions: this.accessControlConditions,
//             authSig: this.authSig, //コンテンツ追加者がViewする分にはこれで良いが、閲覧者がViewするときには、authSigの条件は不適な可能性ある？
//             chain: 'sepolia'
//         });
//     } else {
//         // 復号化不要または不可能な場合はそのまま使用→エラー返した方がいい？
//         decryptedData = encryptedData;
//     }

//     // 復号化されたデータを表示する処理（例: コンソールに出力、UIに表示など）
//     console.log(decryptedData);

//     // 必要に応じて復号化されたデータを返却
//     return decryptedData;
// }





