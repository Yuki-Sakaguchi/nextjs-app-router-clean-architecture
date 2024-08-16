# Next.js の App Router でクリーンアーキテクチャを実装する

色々調べた結果の検討段階なので、結局はオニオンアーキテクチャに近い形で検討中

```bash
/src
│
├── /app # プレゼンテーション層（コントローラーの役割としてそのまま使う）
│   └── page.tsx
│
├── /components # コンポーネント
│
├── /domain # ドメイン層
│   ├── /models # ドメインモデル
│   └── /services # ドメインサービス
│
├── /infrastructure # インフラ層
│   ├── /adapter # アダプタ
│   └── /repository # リポジトリ
│
├── /usecase # ユースケース（アプリケーション層だけどわかりづらいのでユースケースにする）
│
└── /tests # E2Eテスト
```

- ユニットテストは各ディレクトリに `tests` ディレクトリをおいてそこに書く
- e2e はトップレベルに置いてある `tests` ディレクトリにまとめて書く
- ユニットテストは `*.spec.(ts|tsx)` とし、E2Eなどの大きなテストを `*.test.ts` とする


## 考えたこと
クリーンアーキテクチャをフロントエンドだけでやろうとしたことがあったけど合わない感じがした。  
クリーンアーキテクチャ自体がビジネスロジックの依存関係を整理し、入力、出力、DB（外部接続）などを変更する際にビジネスロジックに影響がない形にするのが目的なので React などの UI フレームワーク上で実現しようとするとそれは少しイメージが違う気がしている。  

むしろ React などは置き換えられる可能性を残しておくべきでバックエンドの処理を良い感じに分離をするのが良いと思っている。

バックエンドを完全に分離させて API として実装し、それを Next.js で実行して使うこともできるが、せっかくサーバーコンポーネントだったり TypeScript でまとめてかけたりするメリットを損なってほどやるべきかどうかは検討が必要。  

Next.js を Rails や Laravel などのように MVC フレームワークのように使うイメージでバックエンド側をクリーンアーキテクチャを元に綺麗に分離してコントローラーやプレゼンターの部分が app/page.tsx になるという理解でやると良い気がする。  

その上で Next.js から Remix に変えたり、Vue.js にしたりとかをできるように意識をしておきたいので、コントローラではユースケース（アプリケーション層）を呼ぶだけにする。

認証はコントローラー扱いの page.tsx で行う

ちなみに zenn にあったこれはだいぶ自分の理想に近く、出力も複数あったり置き換えがしやすい形にできていると思う。  
https://zenn.dev/panda_program/articles/clean-architecture-application#web-%E3%81%8B%E3%82%89%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99

まだ悩んでいるのが、フロントエンドの分割方法  
基本的には処理はバックエンドに寄せるが、SPAや `use client` でユーザーの操作が結構ある場合にはそれ用の処理を書く場所とテストが欲しくなる  
置き換えの観点もあるので、外出しして書きたいが流石に React なら hooks とかは使いたいので完全に置き換えられるものにはならない  
ユースケースとサービスみたいな感じで呼び出しと処理が分かれてれば一応置き換えやすいから、 hooks でも十分だと思うけど...

## Taskを実装

### ドメイン層
ビジネスロジックを持たせたドメインオブジェクトを作る（DDD的な感じ）  
リポジトリで使うインターフェースもここで定義して依存をドメイン側に持たせる  

ドメインモデルとドメインサービスに分かれる  
ドメインモデルだけでは表現しきれなかったビジネスロジックをドメインサービスに入れる

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


## テストについて
テストは効果の高いところからやっていきたい  

- ドメイン配下が最優先。ドメインロジックのテストさえできていれば安心できる
- その次にインフラ層のテスト。外部との接続だったりでテストがしづらいかもだけどここも分離されているところなのでテストができると良い
- コンポーネントのテスト。フロントエンドのユニットテスト
- 次にフロントのE2E。ユースケースはその後
  - ユースケースはドメインを組み合わせて実行するので基本的にはテストをしなくても動くようにしておきたい（書いたとしてもドメインのテストとほぼ同じになる）
  - 通しのテストのことを考えるとE2Eはユースケースを呼んでいるだけなので、こっちでテストができればお得

### テストライブラリの使い分け

- ユニットテスト
  - `*.spec.ts` で実行とする(狭いテスト)
  - バックエンド
    - vitest
  - フロントエンドのコンポーネントテスト
    - vitest + Testing Library
- E2Eテスト
  - `*.test.ts` で実行とする（広いテスト）
  - Playwright

## DIの実装
以下で本番と開発で使うクラスを設定する  
https://github.com/Yuki-Sakaguchi/nextjs-app-router-clean-architecture/blob/main/src/di/config.ts#L9-L17

使うところで `container.resolve()` でクラスを呼び出す  
これで環境ごとに使われるクラスが変わる  
https://github.com/Yuki-Sakaguchi/nextjs-app-router-clean-architecture/blob/main/src/usecase/Task/Task.ts#L15-L17

サーバーのインスタンスが生成されるときに一度だけ設定を読み込ませるように `instrumentation.ts` を作る  
https://github.com/Yuki-Sakaguchi/nextjs-app-router-clean-architecture/blob/main/src/instrumentation.ts  
https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation  



## TODO
- [x] テストを実装する
- [x] DIを導入する
- [ ] Server Actions で CRUD を実装する
- [ ] リポジトリをDBに繋げるのとインメモリを実装する
- [ ] ビューを変えてみる（Next.jsからRemixとか）
