# Picker

## 初回のみ

ターミナルで以下を実行

```
curl https://get.volta.sh | bash
```

以下を~/.zshrc にコピペ

```
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
```

ターミナルで以下を実行

```bash
cd picker-app
volta install node
volta install yarn
```

## ローカル環境実行

```bash
cd picker-app

# install dependencies
$ yarn install

# 下記を実行後、localhost:3000にアクセスすると画面を確認できる
$ yarn dev
```

## vscode セットアップ

- ESLint
- Prettier
- stylelint

の VSCode 拡張機能を検索して入れる
