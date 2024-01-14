import View from './View.js';

document.addEventListener('DOMContentLoaded', function () {

    const connectMetamaskButton = document.getElementById('connectMetamask');
    const fundNodeButton = document.getElementById('fundNode');
    const fileInput = document.getElementById('fileInput');
    const archiveIdDisplay = document.getElementById('archiveId');
    const ethereumAddressInput = document.getElementById('ethereumAddressInput');
    const addAddressButton = document.getElementById('addAddress');
    const confirmAddressesButton = document.getElementById('confirmAddresses');
    const mintNFTButton = document.getElementById('mintNFT');
    const uploadArchiveButton = document.getElementById('uploadArchive');
    const idInput = document.getElementById('idInput');
    const fileTypeInput = document.getElementById('fileTypeInput');
    const viewArchiveButton = document.getElementById('viewArchive');
    const dataUrlDisplay = document.getElementById('dataUrl');

    // 各ボタンのイベントリスナーの設定
    connectMetamaskButton.addEventListener('click', connectMetamask);
    fundNodeButton.addEventListener('click', fundNode);
    addAddressButton.addEventListener('click', addAddress);
    confirmAddressesButton.addEventListener('click', confirmAddresses);
    mintNFTButton.addEventListener('click', mintNFT);
    uploadArchiveButton.addEventListener('click', uploadArchive);
    viewArchiveButton.addEventListener('click', viewArchive);



    let view = new View();

    //Initialization class
    //AuthSigの取得
    const onClickConnectMetamask = async () => {
        console.log("#onClickConnectMetamask");
        view.getAuthSig();

    }
    connectMetamaskButton.onclick = onClickConnectMetamask;
    //データ保存料の支払い
    const onClickFundNode = async () => {
        console.log("#onClickFundNode");
        view.fundNode();

    }
    fundNodeButton.onclick = onClickFundNode;



    //ViewControl Class

    let addresses = [];

    addAddressButton.addEventListener('click', () => {
        if (addressInput.value) {
            addresses.push(addressInput.value);
            addressListDiv.innerHTML += `<p>${addressInput.value}</p>`;
            addressInput.value = ''; // 入力フィールドをクリア
        }
    });

    confirmAddressesButton.addEventListener('click', () => {
        // 閲覧権を付与するユーザーを確定する処理
        console.log("確定されたアドレス:", addresses);
        // ここでaddresses配列をViewControlクラスに渡す
    });

    grantAccessButton.addEventListener('click', () => {
        // mintpkp関数を実行
        console.log("mintpkp関数を実行");
        // ここでViewControlクラスのmintpkpメソッドを呼び出す
    });


    //Storage Class

    fileInput.addEventListener('change', (event) => {
        fileInput.addEventListener('change', (event) => {
            const files = event.target.files;
            console.log("fileInput");
            if (files.length > 0) {
                const file = files[0];
                console.log("アップロードされたファイル:", file.name, file.size, file.type);
                fileDetails.innerHTML = `
                <p>ファイル名: ${file.name}</p>
                <p>ファイルサイズ: ${file.size} bytes</p>
                <p>ファイルタイプ: ${file.type}</p>
            `;
                cancelUploadButton.style.display = 'block'; // キャンセルボタンを表示
            } else {
                fileDetails.innerHTML = ''; // ファイル詳細をクリア
                cancelUploadButton.style.display = 'none'; // キャンセルボタンを隠す
            }
        });


        // キャンセルボタンのイベントリスナー
        cancelUploadButton.addEventListener('click', () => {
            fileInput.value = ''; // ファイル入力をクリア
            fileDetails.innerHTML = ''; // ファイル詳細をクリア
            cancelUploadButton.style.display = 'none'; // キャンセルボタンを隠す
        });

        const onClickAddArchive = async () => {
            console.log("#onClickAddArchive");
            view.dataStore();

        }
        addArchiveButton.onclick = onClickAddArchive;

        //console.log("object", buildLitNode);
        // console.log("Hello World");


        // let viewcontrol = new ViewControl();



    });

});


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
