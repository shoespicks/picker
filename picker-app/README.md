# Picker

## 初回のみ

```
git -C /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core fetch --unshallow
brew update
brew install nvm
curl -sL https://aws-amplify.github.io/amplify-cli/install | bash && $SHELL
```

以下を~/.zshrc にコピペ

```
nvmrc() {
  [ -n "$(command -v load_nvm)" ] && load_nvm

  local nvmrc_path="$(nvm_find_nvmrc)"
  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")
    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$(nvm version)" ]; then
      nvm use
    fi
  fi
}

load_nvm() {
  unalias nvm node npm yarn
  unset -f load_nvm

  if [ -s "$NVM_DIR/nvm.sh" ]; then
    source "$NVM_DIR/nvm.sh"
  elif [ -s "$(brew --prefix nvm)/nvm.sh" ]; then
    source "$(brew --prefix nvm)/nvm.sh"
  else
    echo "[nvm.sh] not found"
  fi
}

alias nvm='nvmrc && nvm'
alias node='nvmrc && node'
alias npm='nvmrc && npm'
alias yarn='nvmrc && yarn'
```

## ローカル環境実行

```bash
cd picker-app

# 初回のみ実行
$ nvm install

# 2回目から
$ nvm use

# install dependencies
$ yarn install

# 下記を実行後、localhost:3000にアクセスすると画面を確認できる
$ yarn dev
```
