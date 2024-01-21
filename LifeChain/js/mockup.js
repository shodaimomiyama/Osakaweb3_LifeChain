// import { ethers } from "./ethers.js";


function main() {

    // HTML要素の取得
    const connectMetamaskButton = document.getElementById('connectMetamaskButton');
    const fundNodeButton = document.getElementById('fundNodeButton');
    const checkIrysNodeBalanceButton = document.getElementById('checkIrysNodeBalanceButton');
    const fileInput = document.getElementById('fileInput');
    const makeArchiveIdButton = document.getElementById('makeArchiveIdButton');
    const ethereumAddressInput = document.getElementById('ethereumAddressInput');
    // const permitAccessControlButton = document.getElementById('permitAccessControlButton');
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



    connectMetamaskButton.addEventListener('click', async () => {
        console.log("#onClickConnect");
        try {
            const newAccounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            account = newAccounts[0];

        } catch (error) {
            console.error(error);
        }

    });

    const checkMetaMaskClient = async () => {
        console.log("#checkMetaMaskClient");
        console.log("window.ethereum", window.ethereum);

    };
    checkMetaMaskClient();

};


// fundNodeButton.addEventListener('click', async () => {
//     console.log("connectMetamaskButton")
//     window.location.href = '料金支払いページのURL';
//     makeArchiveIdButton.disabled = false;
// });

// checkIrysNodeBalanceButton.addEventListener('click', async () => {
//     console.log("connectMetamaskButton")
//     alert('あなたの残高は十分です。');
// });

// fileInput.addEventListener('change', event => {
//     var file = event.target.files[0];
//     var reader = new FileReader();
//     reader.onload = function (e) {
//         var fileContent = e.target.result;
//         document.getElementById('fileContent').textContent = fileContent;
//     };
//     reader.readAsText(file);
// });


// makeArchiveIdButton.addEventListener('click', async () => {
//     console.log("connectMetamaskButton")
//     alert('アップロードするファイルを決定しました。');
//     confirmAccessControlButton.disabled = false;
// });

// // permitAccessControlButton.addEventListener('click', () => {
// //     console.log("connectMetamaskButton")
// //     var address = document.getElementById('ethereumAddressInput').value;
// //     document.getElementById('addressDisplay').textContent = address;
// // });

// confirmAccessControlButton.addEventListener('click', async () => {
//     console.log("connectMetamaskButton")
//     alert('閲覧権を付与するユーザーを確定しました。');
//     mintNFTButton.disabled = false;
// });

// mintNFTButton.addEventListener('click', async () => {
//     console.log("connectMetamaskButton")
//     alert('tokenIDは、5007199254740990です。');
//     encryptAndUploadButton.disabled = false;
// });

// encryptAndUploadButton.addEventListener('click', async () => {
//     console.log("connectMetamaskButton")
//     alert('デジタルアーカイブをアップロードしました。TransactionIDは CO9EpX0lekJEfXUOeXncUmMuG8eEp5WJHXl9U9yZUYA です。ファイルタイプは jpeg です。');
// });

// decryptFileButton.addEventListener('click', async () => {
//     console.log("connectMetamaskButton")
//     var archiveId = document.getElementById('archiveIdInput').value;
//     var fileType = document.getElementById('encryptedFileTypeInput').value;
//     alert(`Data URLは、 https://arweave.net/${archiveId} です。ファイルタイプは ${fileType} です。`);
// });



window.addEventListener("DOMContentLoaded", main);





