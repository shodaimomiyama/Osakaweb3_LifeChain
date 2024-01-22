# About LifeChain platform

## 概要

「LifeChain platform」は、個人の精神的資産をデジタル化し、分散型ストレージと暗号化で安全に継承するシステムです。物理的資産と異なり、時間と共に失われる精神的資産を保存し、限定された人々へアクセスを許可。将来的には、データエコノミクスとスマートコントラクトを統合し、自らの人生が死後も価値を生み出すシステムを目指します。



## 解決したい課題
・先祖から伝わるアルバムや書物などの資産が、有形であるがゆえに次の世代に引き継ぐためのコストや労力が大きく、相続先がおらず捨てるしか無くなっている現状がある。

・自らの人生を通して培った精神的資産を確かに遺す文化や方法が確立されておらず、媒体の多くが人の記憶であるため、資産が蓄積されず時間と共に失われていく現状がある。
物理的資産ばかり重視され、精神的資産の相続がきちんと行われていないこの現状は、顕在化し始めている社会問題である。


## 課題の解決方法

人生を通して培った精神的資産（デジタルアーカイブ）を
①半永久的に遺し、
②大切な人だけに届ける
システムを実現する。

①の実現

分散型ストレージ技術(Arweave)の利用により、データの保存とアクセスを分散化し、中央集権的なコントロールを避けることで、安全で効率的なデータ管理を可能にする。


②の実現

データの暗号化を行うプロトコル(Lit Protocol)の利用により、データへのアクセス後、特定の人（ウォレットアドレスの保持者）のみが暗号化されたデータの復号化をできるようにすることで、閲覧者をコントロールする。


## 利用している技術

#### Lit protocol: 
デジタルアーカイブの暗号化、所有権を示すためのNFT発行

#### Irys:　
Arweaveにアップロードしたデジタルアーカイブの出自の管理

#### Arweave:　
デジタルアーカイブを半永久的に保存


## システム概念図

![image](https://github.com/shodaimomiyama/Osakaweb3_LifeChain/assets/138434427/91a5faa9-70d0-4189-90e0-d771064869cd)



## システム設計図

クラス図

<img width="707" alt="スクリーンショット 2024-01-15 3 55 47" src="https://github.com/shodaimomiyama/Osakaweb3_LifeChain/assets/138434427/8e679820-3213-4d41-bb6a-ec5f3c24da29">

シーケンス図

<img width="707" alt="スクリーンショット 2024-01-15 3 58 43" src="https://github.com/shodaimomiyama/Osakaweb3_LifeChain/assets/138434427/10cba503-e581-4e85-b752-e7ca5efa0d30">




## 行き詰まりポイント

Initialization classのimport { providers, ethers } from "ethers";について、htmlファイルをブラウザで表示させてjsファイルと繋ごうとすると、consoleにUncaught TypeError: Failed to resolve module specifier "ethers". Relative references must start with either "/", "./", or "../".のエラー。

最新のJavaScriptでは、バンドラーを使用せずにimport文をフロントエンドで直接動作させることが可能とのことなので、import { ethers } from 'https://cdn.ethers.io/lib/ethers-5.2.esm.min.js'; に変更してみたが、

ccess to script at 'https://cdn.ethers.io/lib/ethers-5.2.esm.min.js' from origin 'http://127.0.0.1:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

GET https://cdn.ethers.io/lib/ethers-5.2.esm.min.js net::ERR_FAILED 200 (OK)

のconsole出力。

Initialization classのjsファイルをブラウザで使用するには、どうすれば？


