import View from "./View.js"

document.addEventListener('DOMContentLoaded', function () {
    // HTML要素の取得
    const connectMetamaskButton = document.getElementById('connectMetamaskButton');
    const fundNodeButton = document.getElementById('fundNodeButton');
    const checkIrysNodeBalanceButton = document.getElementById('checkIrysNodeBalanceButton');
    const fileInput = document.getElementById('fileInput');
    const makeArchiveIdButton = document.getElementById('makeArchiveIdButton');
    const ethereumAddressInput = document.getElementById('ethereumAddressInput');
    const permitAccessControlButton = document.getElementById('permitAccessControlButton');
    const confirmAccessControlButton = document.getElementById('confirmAccessControlButton');
    const mintNFTButton = document.getElementById('mintNFTButton');
    const encryptAndUploadButton = document.getElementById('encryptAndUploadButton');

    const archiveIdInput = document.getElementById('archiveIdInput');
    const encryptedFileTypeInput = document.getElementById('encryptedFileTypeInput');
    const decryptFileButton = document.getElementById('decryptFileButton');
    const viewUrl = document.getElementById('viewUrl');

    // 初期状態のボタンを非活性化
    fundNodeButton.disabled = true;
    checkIrysNodeBalanceButton.disabled = true;
    makeArchiveIdButton.disabled = true;
    confirmAccessControlButton.disabled = true;
    mintNFTButton.disabled = true;
    encryptAndUploadButton.disabled = true;
    decryptFileButton.disabled = true;

    let view = new View();
    let selectedFile;


    // Event Listeners for Buttons
    connectMetamaskButton.addEventListener('click', async () => {
        await view.getAuthSig();
        fundNodeButton.disabled = false;
        checkIrysNodeBalanceButton.disabled = false;
    });

    fundNodeButton.addEventListener('click', async () => {
        await view.fundNode();
        makeArchiveIdButton.disabled = false;
    });

    checkIrysNodeBalanceButton.addEventListener('click', async () => {
        await view.checkIrysNodeBalance();
    });

    fileInput.addEventListener('change', event => {
        selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const fileContent = e.target.result;
            // ここでfileContentをHTMLに表示
            document.getElementById('fileContentDisplay').textContent = fileContent;
        };
        reader.readAsText(selectedFile); // テキストファイルの場合
    });


    makeArchiveIdButton.addEventListener('click', async () => {
        await view.makeArchiveId(selectedFile);
        confirmAccessControlButton.disabled = false;
    });

    permitAccessControlButton.addEventListener('click', () => {
        let address = ethereumAddressInput.value;
        document.getElementById('addressDisplay').textContent = address;
    });

    confirmAccessControlButton.addEventListener('click', async () => {
        let addresses = [ethereumAddressInput.value]; // または複数のアドレスを取得
        await view.addAccessControlForArchive(addresses);
        mintNFTButton.disabled = false;
    });

    mintNFTButton.addEventListener('click', async () => {
        let mintInfo = await view.mintpkp();
        document.getElementById('mintInfoDisplay').textContent = JSON.stringify(mintInfo);
        encryptAndUploadButton.disabled = false;
    });

    encryptAndUploadButton.addEventListener('click', async () => {
        let receipt = await view.encryptAndUploadFile(selectedFile);
        document.getElementById('receiptDisplay').textContent = JSON.stringify(receipt);
        document.getElementById('fileTypeDisplay').textContent = selectedFile.type;
    });

    decryptFileButton.addEventListener('click', async () => {
        let id = archiveIdInput.value;
        let encryptedFileType = encryptedFileTypeInput.value;
        let dataUrl = await view.decryptFile(id, encryptedFileType);
        document.getElementById('decryptedFileDisplay').src = dataUrl;
    });


    // ... [他のイベントリスナーや関数]
});




//どうやって使う？
// server.sendHeader("Access-Control-Allow-Origin", "*");
// server.sendHeader("Access-Control-Allow-Headers", "Content-Type");

//     let view = new View();

//     // MetaMaskとの接続
//     connectMetamaskButton.addEventListener('click', async function () {
//         try {
//             // getAuthSigメソッドを使用してMetaMaskに接続
//             await view.getAuthSig();

//             // 接続成功後、checkIrysNodeBalanceメソッドを実行して残高を確認
//             const balance = await view.checkIrysNodeBalance();
//             document.getElementById('balanceMessage').innerText = `現在の残高: ${balance}`;

//             // 次のステップへ進むためのボタンを活性化
//             fundNodeButton.disabled = false;
//         } catch (error) {
//             console.error('MetaMaskの接続に失敗しました。', error);
//             document.getElementById('balanceMessage').innerText = 'MetaMaskの接続に失敗しました。';
//         }
//     });


//     // データ保存料金の支払い
//     fundNodeButton.addEventListener('click', function () {
//         // ここに料金支払い処理を実装
//         console.log("fundNode");
//         view.fundNode();
//         // 成功した場合、次のステップへ進むためのボタンを活性化
//         makeArchiveIdButton.disabled = false;
//     });

//     // アーカイブIDの生成
//     makeArchiveIdButton.addEventListener('click', function () {
//         const file = fileInput.files[0];
//         if (file) {
//             view.makeArchiveId(file).then(archiveId => {
//                 // ここにアーカイブIDを表示する処理
//             });
//         } else {
//             alert('ファイルを選択してください。');
//         }

//         addAccessControlButton.disabled = false;
//         confirmAccessControlButton.disabled = false;
//     });
//     // 閲覧権の追加
//     addAccessControlButton.addEventListener('click', function () {
//         const address = ethereumAddressInput.value;
//         if (address) {
//             view.addAccessControlForArchive(address).then(() => {
//                 // ここにアクセス制御の追加が成功した場合の処理
//             });
//         } else {
//             alert('Ethereumアドレスを入力してください。');
//         }
//     });

//     // 閲覧権の確定
//     confirmAccessControlButton.addEventListener('click', function () {
//         // 閲覧権の確定処理を実装
//         // 成功した場合、NFT発行およびアップロードのボタンを活性化
//         mintNFTButton.disabled = false;
//         encryptAndUploadButton.disabled = false;
//     });

//     // NFTの発行
//     mintNFTButton.addEventListener('click', function () {
//         const archiveId = // アーカイブIDを取得する処理
//             view.mintpkp(archiveId).then(() => {
//                 // ここにNFT発行成功時の処理
//             });
//     });


//     // デジタルアーカイブの暗号化とアップロード
//     encryptAndUploadButton.addEventListener('click', function () {
//         const file = fileInput.files[0];
//         if (file) {
//             view.encryptAndUploadFile(file).then(() => {
//                 // ここにアップロード成功時の処理
//             });
//         } else {
//             alert('ファイルを選択してください。');
//         }
//     });

//     // ファイルの復号化と閲覧
//     decryptFileButton.addEventListener('click', function () {
//         const id = archiveIdInput.value;
//         const encryptedFileType = encryptedFileTypeInput.value;
//         if (id && encryptedFileType) {
//             view.decryptFile(id, encryptedFileType).then(dataUrl => {
//                 viewUrl.innerText = dataUrl;
//             });
//         } else {
//             alert('アーカイブIDと暗号化ファイルタイプを入力してください。');
//         }
//     });



// });

// const connectMetamaskButton = document.getElementById('connectMetamask');
// const fundNodeButton = document.getElementById('fundNode');
// const fileInput = document.getElementById('fileInput');
// const archiveIdDisplay = document.getElementById('archiveId');
// const ethereumAddressInput = document.getElementById('ethereumAddressInput');
// const addAddressButton = document.getElementById('addAddress');
// const confirmAddressesButton = document.getElementById('confirmAddresses');
// const mintNFTButton = document.getElementById('mintNFT');
// const uploadArchiveButton = document.getElementById('uploadArchive');
// const idInput = document.getElementById('idInput');
// const fileTypeInput = document.getElementById('fileTypeInput');
// const viewArchiveButton = document.getElementById('viewArchive');
// const dataUrlDisplay = document.getElementById('dataUrl');

// // 各ボタンのイベントリスナーの設定
// connectMetamaskButton.addEventListener('click', connectMetamask);
// fundNodeButton.addEventListener('click', fundNode);
// addAddressButton.addEventListener('click', addAddress);
// confirmAddressesButton.addEventListener('click', confirmAddresses);
// mintNFTButton.addEventListener('click', mintNFT);
// uploadArchiveButton.addEventListener('click', uploadArchive);
// viewArchiveButton.addEventListener('click', viewArchive);



// let view = new View();

// //Initialization class
// //AuthSigの取得
// const onClickConnectMetamask = async () => {
//     console.log("#onClickConnectMetamask");
//     view.getAuthSig();

// }
// connectMetamaskButton.onclick = onClickConnectMetamask;
// //データ保存料の支払い
// const onClickFundNode = async () => {
//     console.log("#onClickFundNode");
//     view.fundNode();

// }
// fundNodeButton.onclick = onClickFundNode;



// //ViewControl Class

// let addresses = [];

// addAddressButton.addEventListener('click', () => {
//     if (addressInput.value) {
//         addresses.push(addressInput.value);
//         addressListDiv.innerHTML += `<p>${addressInput.value}</p>`;
//         addressInput.value = ''; // 入力フィールドをクリア
//     }
// });

// confirmAddressesButton.addEventListener('click', () => {
//     // 閲覧権を付与するユーザーを確定する処理
//     console.log("確定されたアドレス:", addresses);
//     // ここでaddresses配列をViewControlクラスに渡す
// });

// grantAccessButton.addEventListener('click', () => {
//     // mintpkp関数を実行
//     console.log("mintpkp関数を実行");
//     // ここでViewControlクラスのmintpkpメソッドを呼び出す
// });


// //Storage Class

// fileInput.addEventListener('change', (event) => {
//     fileInput.addEventListener('change', (event) => {
//         const files = event.target.files;
//         console.log("fileInput");
//         if (files.length > 0) {
//             const file = files[0];
//             console.log("アップロードされたファイル:", file.name, file.size, file.type);
//             fileDetails.innerHTML = `
//             <p>ファイル名: ${file.name}</p>
//             <p>ファイルサイズ: ${file.size} bytes</p>
//             <p>ファイルタイプ: ${file.type}</p>
//         `;
//             cancelUploadButton.style.display = 'block'; // キャンセルボタンを表示
//         } else {
//             fileDetails.innerHTML = ''; // ファイル詳細をクリア
//             cancelUploadButton.style.display = 'none'; // キャンセルボタンを隠す
//         }
//     });


//     // キャンセルボタンのイベントリスナー
//     cancelUploadButton.addEventListener('click', () => {
//         fileInput.value = ''; // ファイル入力をクリア
//         fileDetails.innerHTML = ''; // ファイル詳細をクリア
//         cancelUploadButton.style.display = 'none'; // キャンセルボタンを隠す
//     });

//     const onClickAddArchive = async () => {
//         console.log("#onClickAddArchive");
//         view.dataStore();

//     }
//     addArchiveButton.onclick = onClickAddArchive;

//     //console.log("object", buildLitNode);
//     // console.log("Hello World");


//     // let viewcontrol = new ViewControl();



// });

// const connectWalletButton = document.getElementById('connectWallet');

// // デジタルアーカイブの追加に関連する要素を取得
// const fileInput = document.getElementById('dropzone-file');
// const fileDetails = document.getElementById('fileDetails');
// const cancelUploadButton = document.getElementById('cancelUpload');
// const addArchiveButton = document.getElementById('addArchive');

// // 閲覧権を付与するアドレスの入力とボタンの要素を取得
// const addressInput = document.getElementById('addressInput');
// const addAddressButton = document.getElementById('addAddress');
// const confirmAddressesButton = document.getElementById('confirmAddresses');
// const grantAccessButton = document.getElementById('grantAccess');
// const addressListDiv = document.getElementById('addressList');

// // アーカイブの参照に関連する要素を取得
// const cidInput = document.getElementById('cidInput');
// const viewArchiveButton = document.getElementById('viewArchive');



// const buildLitNodeButton = document.getElementById('buildLitNode');
// const getAuthSigButton = document.getElementById('getAuthSig');
// const accessControlEOAInput = document.getElementById('accessControlEOA');
// const setAccessControlButton = document.getElementById('setAccessControl');
// const fileInput = document.getElementById('fileInput');
// const mintNFTButton = document.getElementById('mintNFT');
// const encryptAndSaveButton = document.getElementById('encryptAndSave');
// const retrieveArchiveButton = document.getElementById('retrieveArchive');
// const status = document.getElementById('status');
// const savedCid = document.getElementById('savedCid');
// const cidInput = document.getElementById('cidInput');

// 各ボタンに対するイベントリスナーと機能をここに実装
// 例: buildLitNodeButton.addEventListener('click', function() { /* LitNodeのBuild */ });
// 他の機能も同様に実装

//Initialization Class
//LitNodeのBuild
// const onClickBuildLitNode = async () => {
//     console.log("#buildLitNode");
//     view.buildLitNode();

// }
// buildLitNodeButton.onclick = onClickBuildLitNode;

//accesscontrolconditions
// const onClickSetAccessControl = async () => {
//     console.log("#setAccessControl");
//     view.accessControl(accessControlEOAInput.value);

// }
// setAccessControlButton.onclick = onClickSetAccessControl;
//mintpkp
// const onClickMintNFT = async () => {
//     console.log("#mintNFT");
//     view.mintpkp();


// }
// mintNFTButton.onclick = onClickMintNFT;
