import Initialization from './Initialization.js';
import { AuthMethodScope, AuthMethodType } from '../node_modules/@lit-protocol/constants';
import crypto from '../node_modules/@types/node/crypto.d.ts';

class ViewControl extends Initialization {
    constructor() {
        super();
        this.tokenId = null;
        this.publicKey = null;
        this.ethAddress = null;
        this.currentArchiveId = null; // 現在のアーカイブIDを保存するためのプロパティ
        this.accessControlConditionsByArchive = {};
    }

    async makeArchiveId(file) {
        const archiveId = crypto.randomUUID();
        this.currentFile = file; // 現在のファイルを保存
        this.currentArchiveId = archiveId; // アーカイブIDをプロパティに保存
        return archiveId;
    }

    async addAccessControlForArchive(addresses) {
        if (!this.currentArchiveId) {
            console.log("アーカイブIDが設定されていません。");
            return;
        }
        this.accessControlConditionsByArchive[this.currentArchiveId] = addresses.map(address => ({
            contractAddress: "",
            standardContractType: "",
            chain: "sepolia",
            method: "",
            parameters: [address],
        }));
    }

    async mintpkp() {
        if (!this.currentArchiveId) {
            console.log("アーカイブIDが設定されていません。");
            return;
        }
        const accessControlConditions = this.accessControlConditionsByArchive[this.currentArchiveId];
        if (!accessControlConditions) {
            console.log("アクセス制御条件が設定されていません。");
            return;
        }

        const contractClient = new LitContracts({ signer: this.authSig });
        await contractClient.connect();
        const authMethod = {
            authMethodType: AuthMethodType.EthWallet,
            accessToken: 'YOUR_ACCESS_TOKEN',
        };

        const mintInfo = await contractClient.mintWithAuth({
            authMethod: authMethod,
            scopes: [1], //AuthMethodScope.SignAnything
            accessControlConditions: accessControlConditions
        });

        this.tokenId = mintInfo.pkp.tokenId;
        this.publicKey = mintInfo.pkp.publicKey;
        this.ethAddress = mintInfo.pkp.ethAddress;
        console.log(`PKP NFT Minted for Archive ID: ${this.currentArchiveId}`, mintInfo);
    }
}

export default ViewControl;















//archiveIdの引き継ぎうまくいかなかったら下のやつに戻す。ユーザーには入力してもらう。

// import Initialization from './Initialization.js';
// import { AuthMethodScope, AuthMethodType } from '@lit-protocol/constants';
// import crypto from 'crypto';

// class ViewControl extends Initialization {
//     constructor() {
//         super();
//         this.tokenId = null;
//         this.publicKey = null;
//         this.ethAddress = null;
//         this.accessControlConditionsByArchive = {};
//     }

//     async makeArchiveId(file) {
//         const archiveId = crypto.randomUUID();
//         this.currentFile = file;  // 現在のファイルを保存
//         return archiveId;
//     }

//     async addAccessControlForArchive(archiveId, addresses) {
//         this.accessControlConditionsByArchive[archiveId] = addresses.map(address => ({
//             contractAddress: "",
//             standardContractType: "",
//             chain: "sepolia",
//             method: "",
//             parameters: [address],
//         }));
//     }

//     async mintpkp(archiveId) {
//         const accessControlConditions = this.accessControlConditionsByArchive[archiveId];
//         if (!accessControlConditions) {
//             console.log("アクセス制御条件が設定されていません。");
//             return;
//         }

//         const contractClient = new LitContracts({ signer: this.authSig });
//         await contractClient.connect();
//         const authMethod = {
//             authMethodType: AuthMethodType.EthWallet,
//             accessToken: 'YOUR_ACCESS_TOKEN',
//         };

//         const mintInfo = await contractClient.mintWithAuth({
//             authMethod: authMethod,
//             scopes: [1], //AuthMethodScope.SignAnything
//             accessControlConditions: accessControlConditions
//         });

//         this.tokenId = mintInfo.pkp.tokenId;
//         this.publicKey = mintInfo.pkp.publicKey;
//         this.ethAddress = mintInfo.pkp.ethAddress;
//         console.log(`PKP NFT Minted for Archive ID: ${archiveId}`, mintInfo);
//     }
// }

// export default ViewControl;










// import Initialization from './Initialization.js';
// import { AuthMethodScope, AuthMethodType } from '../node_modules/@lit-protocol/constants';

// class ViewControl extends Initialization {
//     constructor() {
//         super(); // 親クラスのコンストラクタを呼び出す
//         // トークンID、公開鍵、Ethereumアドレスをnullで初期化
//         this.tokenId = null;
//         this.publicKey = null;
//         this.ethAddress = null;
//     }

//     async makeArchiveId(file) {
//         const archiveId = crypto.randomUUID(file);
//         return archiveId;
//     }

//     async addAccessControlForArchive(archiveId, addresses) {
//         this.accessControlConditionsByArchive[archiveId] = addresses.map(address => ({
//             contractAddress: "", // 適切なアドレスを設定
//             standardContractType: "", // 必要に応じて設定
//             chain: "sepolia", // テストネット「sepolia」を使用
//             method: "", // 特定のメソッドは使用しない
//             parameters: [address], // ユーザーのアドレスをパラメータとして使用
//         }));
//     }

//     async mintpkp(archiveId) {
//         const accessControlConditions = this.accessControlConditionsByArchive[archiveId];

//         if (!accessControlConditions) {
//             console.log("アクセス制御条件が設定されていません。");
//             return;
//         }
//         // Litプロトコルのスマートコントラクトとの接続を確立
//         const contractClient = new LitContracts({ signer: this.authSig });
//         await contractClient.connect();
//         // 認証方法の定義
//         const authMethod = {
//             authMethodType: AuthMethodType.EthWallet,
//             accessToken: '...', // 実際のアクセストークンを設定する
//         };
//         // スマートコントラクトを利用してNFTをミント
//         const mintInfo = await contractClient.mintWithAuth({
//             authMethod: authMethod,
//             scopes: [
//                 AuthMethodScope.SignAnything,
//                 // AuthMethodScope.OnlySignMessages
//             ],
//             accessControlConditions: accessControlConditions
//         });
//         // ミント結果からトークンID、公開鍵、Ethereumアドレスをインスタンスプロパティに保存
//         this.tokenId = mintInfo.pkp.tokenId;
//         this.publicKey = mintInfo.pkp.publicKey;
//         this.ethAddress = mintInfo.pkp.ethAddress;
//         // ミント結果の出力
//         console.log(`PKP NFT Minted for Archive ID: ${archiveId}`, mintInfo);

//     }
// }

// export default ViewControl;

// Initializationクラスのインポート
// 必要なLitプロトコルのクラスや関数のインポート
// アクセス制御条件を設定するメソッド
// async accessControl(addresses) {
//     // アドレスのリストに基づいてアクセス制御条件を設定
//     const accessControlConditions = addresses.map(address => ({
//         contractAddress: "", // 適切なアドレスを設定
//         standardContractType: "", // 必要に応じて設定
//         chain: "sepolia", // テストネット「sepolia」を使用
//         method: "", // この例では特定のメソッドは使用しない
//         parameters: [address], // ユーザーのアドレスをパラメータとして使用
//     }));

//     // ここでアクセス制御条件に基づく処理を実装
// }

// const myId = crypto.randomUUID();

// PKP NFTをミントするメソッド
// async mintpkp() {
//     // Litプロトコルのスマートコントラクトとの接続を確立
//     const contractClient = new LitContracts({ signer: this.authSig });
//     await contractClient.connect();

//     // 認証方法を定義
//     const authMethod = {
//         authMethodType: AuthMethodType.EthWallet,
//         accessToken: '...', // 実際のアクセストークンを設定する
//     };

//     // スマートコントラクトを利用してNFTをミント
//     const mintInfo = await contractClient.mintWithAuth({
//         authMethod,
//         scopes: [
//             // ...必要なスコープを設定する
//         ],
//         accessControlConditions: [
//             // ...アクセス制御条件を設定する
//         ],
//     });

//     // ミント結果からトークンID、公開鍵、Ethereumアドレスをインスタンスプロパティに保存
//     this.tokenId = mintInfo.pkp.tokenId;
//     this.publicKey = mintInfo.pkp.publicKey;
//     this.ethAddress = mintInfo.pkp.ethAddress;

//     //console.log()でフロントエンドにインスタンスプロパティを表示した方がいい？
// }


// ViewControlクラスのエクスポート
// export default ViewControl;
