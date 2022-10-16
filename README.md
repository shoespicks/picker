# Picker

## 初回のみ 環境構築

- ターミナルで以下を実行

```
curl https://get.volta.sh | bash
```

- 以下を~/.zshrc にコピペ

```
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
```

- ターミナルで以下を実行（ホームで大丈夫）

```bash
volta install node
volta install yarn
```

- 以下ファイルをダウンロードしてプロジェクト直下に配置し、ファイル名を.env.local に変更する
- セキュリティ上このファイルはコミットしないこと
https://drive.google.com/file/d/1SB2rSU_6UhY9xWHdPFcC_Sg4pk0tmey2/view?usp=sharing

## ローカル環境実行

```bash
# install dependencies
yarn install

# 下記を実行後、localhost:3000にアクセスすると画面を確認できる
yarn dev
```

## vscode セットアップ

- ESLint
- Prettier
- stylelint
- vscode-styled-components

の VSCode 拡張機能を検索して入れる
