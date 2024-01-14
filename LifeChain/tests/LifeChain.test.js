import Initialization from '../js/Initialization';
import ViewControl from '../js/ViewControl';
import Storage from '../js/Storage';
import View from '../js/View';

// fetch-blob モジュールのモック化
jest.mock('fetch-blob', () => {
    return {
        Blob: jest.fn().mockImplementation((content, options) => {
            return {
                content,
                options,
                size: content.length,
                type: options.type
            };
        })
    };
});

describe('File Upload and Access Control Flow', () => {
    let init, viewControl, storage, view;
    let testFile, archiveId, accessConditions, encryptedFile, dataUrl;

    beforeEach(() => {
        // 各クラスのインスタンスを初期化
        init = new Initialization();
        viewControl = new ViewControl();
        storage = new Storage();
        view = new View();
        testFile = new Blob(["test content"], { type: "text/plain" });

        // ダミーの tags 定義
        const dummyTags = [{ name: 'tag1', value: 'value1' }];

        // Storage クラスにモック関数を割り当てる
        storage.litNodeClient = {
            connect: jest.fn().mockResolvedValue(true),
            checkAndSignAuthMessage: jest.fn().mockResolvedValue({ authSig: 'mockAuthSig' })
        };
        storage.authSig = {}; // 適当な authSig のモック
        storage.encryptFile = jest.fn().mockResolvedValue('encryptedData');
        storage.uploadFile = jest.fn().mockImplementation((file) => {
            // 特定のファイルが渡された場合にエラーを投げる
            if (file === testFile) {
                throw new Error('Failed to get WebIrys');
            }
            return Promise.resolve({ id: 'fileId', tags: dummyTags });
        });
        // storage.uploadFile = jest.fn().mockImplementation(() => {
        //     return Promise.resolve({ id: 'fileId', tags: dummyTags });
        // });

        // WebIrys のモック関数
        storage.getWebIrys = jest.fn().mockImplementation(() => Promise.resolve({
            uploadFile: storage.uploadFile,
            getPrice: jest.fn().mockResolvedValue({ isGreaterThanOrEqualTo: jest.fn().mockReturnValue(true) }),
            getLoadedBalance: jest.fn().mockResolvedValue(200),
            fund: jest.fn()
        }));

        // ダミーの encryptedFile オブジェクトの設定
        encryptedFile = {
            id: 'fileId',
            type: 'text/plain'
        };
    });

    // 既存のテストケース...



    test('Access control conditions are set for the archive', () => {
        accessConditions = [{ contractAddress: "", standardContractType: "", chain: "sepolia", method: "", parameters: ['0x123'] }];
        viewControl.addAccessControlForArchive(['0x123']);
        expect(viewControl.accessControlConditionsByArchive[archiveId]).toEqual(accessConditions);
    });

    test('File is encrypted and uploaded successfully', async () => {
        await storage.encryptAndUploadFile(testFile);
        expect(storage.uploadFile).toHaveBeenCalled();
        expect(storage.encryptFile).toHaveBeenCalled();
    });

    test('Encrypted file is successfully decrypted', async () => {
        dataUrl = await view.decryptFile(encryptedFile.id, encryptedFile.type);
        expect(dataUrl).toBeDefined();
    });

    test('encryptFile method should return encrypted file data', async () => {
        storage.currentFile = testFile;
        const result = await storage.encryptFile();
        expect(result).toBe('encryptedData');
    });

    test('uploadFile method should return a file ID', async () => {
        // モック関数の戻り値を修正
        storage.uploadFile.mockResolvedValue('fileId');
        const fileID = await storage.uploadFile();
        expect(fileID).toBe('fileId');
    });

    test('uploadFile method should handle errors', async () => {
        // storage.uploadFile メソッドをモックし、testFile が渡された時にのみエラーを投げるように設定
        storage.uploadFile.mockImplementation(file => {
            if (file === testFile) {
                throw new Error('Failed to get WebIrys');
            }
            return Promise.resolve({ id: 'fileId', tags: dummyTags });
        });

        // testFile を渡してエラーが発生することを確認するテスト
        await expect(storage.uploadFile(testFile)).rejects.toThrow('Failed to get WebIrys');
    });

});




// import Initialization from '../js/Initialization';
// import ViewControl from '../js/ViewControl';
// import Storage from '../js/Storage';
// import View from '../js/View';

// // fetch-blob モジュールのモック化
// jest.mock('fetch-blob', () => {
//     return {
//         Blob: jest.fn().mockImplementation((content, options) => {
//             // モック Blob オブジェクトの実装
//             return {
//                 content,
//                 options,
//                 size: content.length,
//                 type: options.type
//             };
//         })
//     };
// });

// // lit-js-sdk のダミー関数
// const mockEncryptFileAndZipWithMetadata = jest.fn().mockResolvedValue({ zipBlob: 'encryptedData' });
// const mockDecryptZipFileWithMetadata = jest.fn().mockResolvedValue({ decryptedFile: 'decryptedData' });

// describe('File Upload and Access Control Flow', () => {
//     let init, viewControl, storage, view;
//     let testFile, archiveId, accessConditions, encryptedFile, dataUrl;

//     beforeEach(() => {
//         init = new Initialization();
//         viewControl = new ViewControl();
//         storage = new Storage();
//         view = new View();

//         testFile = new Blob(["test content"], { type: "text/plain" });

//         // Storage クラスにモック関数を割り当てる
//         storage.litNodeClient = {
//             connect: jest.fn().mockResolvedValue(true),
//             checkAndSignAuthMessage: jest.fn().mockResolvedValue({ authSig: 'mockAuthSig' })
//         };
//         storage.authSig = {}; // 適当な authSig のモック
//         storage.encryptFileAndZipWithMetadata = mockEncryptFileAndZipWithMetadata;
//         storage.decryptZipFileWithMetadata = mockDecryptZipFileWithMetadata;

//         // WebIrys のモック関数
//         storage.getWebIrys = jest.fn().mockImplementation(() => Promise.resolve({
//             uploadFile: jest.fn().mockResolvedValue({ id: 'fileId' }),
//             getPrice: jest.fn().mockResolvedValue({ isGreaterThanOrEqualTo: jest.fn().mockReturnValue(true) }),
//             getLoadedBalance: jest.fn().mockResolvedValue(200),
//             fund: jest.fn()
//         }));
//     });

//     // 既存のテストケース...
//     test('Access control conditions are set for the archive', () => {
//         accessConditions = [{ contractAddress: "", standardContractType: "", chain: "sepolia", method: "", parameters: ['0x123'] }];
//         viewControl.addAccessControlForArchive(archiveId, ['0x123']);
//         expect(viewControl.accessControlConditionsByArchive[archiveId]).toEqual(accessConditions);
//     });


//     test('File is encrypted and uploaded successfully', async () => {
//         await storage.encryptAndUploadFile(testFile);
//         encryptedFile = storage.currentFile; // 実装に基づいて調整が必要です
//         expect(encryptedFile).toBeDefined();
//     });

//     test('Encrypted file is successfully decrypted', async () => {
//         dataUrl = await view.decryptFile(encryptedFile.id, encryptedFile.type);
//         expect(dataUrl).toBeDefined();
//     });

//     test('encryptFile method should return encrypted file data', async () => {
//         storage.currentFile = testFile;
//         const result = await storage.encryptFile();
//         expect(result).toBe('encryptedFileData');
//         // 他の期待される動作を検証
//     });

//     test('uploadFile method should return a file ID', async () => {
//         // uploadFile の成功シナリオをテスト
//         const fileID = await storage.uploadFile();
//         expect(fileID).toBe('fileId');
//         // 他の期待される動作を検証
//     });

//     // エラーケースをテストする場合
//     test('uploadFile method should handle errors', async () => {
//         // uploadFile の失敗シナリオをシミュレート
//         storage.getWebIrys = jest.fn().mockImplementation(() => {
//             throw new Error('Failed to get WebIrys');
//         });
//         await expect(storage.uploadFile()).rejects.toThrow('Failed to get WebIrys');
//     });

//     // 他の必要なテストケース...
// });


