# Next.js の App Router でクリーンアーキテクチャを実装する

色々調べた結果の検討段階なので、結局はオニオンアーキテクチャに近い形で検討中

```
/app
├── domain # ドメイン層
├── usecase # アプリケーション層（わかりにくいのでユースケースにする）
├── infrastructure # （インフラ層）
└── app # プレゼンテーション層（コントローラーの役割としてそのまま使う）
    └── page.tsx
```

## 考えたこと
クリーンアーキテクチャをフロントエンドでやろうとすると合わないと思う。  
クリーンアーキテクチャ自体はビジネスロジックの依存関係を整理し、入力、出力、DB（外部接続）などを変更する際にビジネスロジックに影響がない形にするのが目的のはず。  

なので React などのフロントエンドフレームワーク上で実現しようとするとそれは少しイメージが違う気がしている。  

むしろ React などは置き換えられる可能性を残しておくべきでバックエンドの処理を良い感じに分離をするのが良いと思っている。

バックエンドを完全に分離させて API として実装し、それを Next.js で実行して使うこともできるが、せっかくサーバーコンポーネントだったり TypeScript でまとめてかけたりするメリットを損なってほどやるべきかどうかは検討が必要。  

Next.js を Rails や Laravel などのように MVC フレームワークのように認識し、バックエンド側をクリーンアーキテクチャを元に綺麗に分離してコントローラーやプレゼンターの部分が app/page.tsx になるという理解でやると良い気がする。  

Next.js から Remix に変えたり、Vue.js にしたりとかを考慮し、コントローラではユースケース（アプリケーション層）を呼ぶだけにする。

認証はコントローラー扱いの page.tsx で行う

ちなみに zenn にあったこれはだいぶ自分の理想に近く、出力も複数あったり置き換えがしやすい形にできていると思う。  
https://zenn.dev/panda_program/articles/clean-architecture-application#web-%E3%81%8B%E3%82%89%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99

## Taskを実装

### ドメイン層
ビジネスロジックを持たせたドメインオブジェクトを作る（DDD的な感じ）  
リポジトリで使うインターフェースもここで定義して依存をドメイン側に持たせる  

https://github.com/Yuki-Sakaguchi/nextjs-app-router-clean-architecture/blob/main/src/domain/Task/index.ts


### インフラ層
リポジトリを作る  
ドメイン層で定義したインターフェースを使って実装する  
置き換えが可能なものにしたいので RDB や インメモリ など複数の置き換え後のものはそれぞれ実装する（DIで環境ごとに出しわけたい）  
本当は static なメソッドで実装したかったが、 TypeScript のインターフェースだとそれができなくて tips 的な回避をしないといけないぽかったのでインスタンスを作って実行する形にしてある

https://github.com/Yuki-Sakaguchi/nextjs-app-router-clean-architecture/blob/main/src/infrastructure/repository/Task/TaskInMemoryRepository.ts


### ユースケース層
画面から呼ばれるユースケースを実装する  
本当は static なメソッドにしたかったが、リポジトリの初期化ができなくていい感じにならなかったのでインスタンスを作って実行する形にしてある（改善できたらしたい）  

https://github.com/Yuki-Sakaguchi/nextjs-app-router-clean-architecture/blob/main/src/usecase/Task/index.ts


### プレゼンテーション層
Next.js のルーティングがあるのでそれをそのまま使う  
コントローラー兼プレゼンターなので、ユースケースを呼んで必要なデータを組み立てて画面を表示する  

https://github.com/Yuki-Sakaguchi/nextjs-app-router-clean-architecture/blob/main/src/app/page.tsx


## TODO
- [ ] テストを実装する
- [ ] DIを導入する
- [ ] Server Actions で CRUD を実装する
- [ ] リポジトリをDBに繋げるのとインメモリを実装する
- [ ] ビューを変えてみる（Next.jsからRemixとか）
