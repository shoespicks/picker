# Picker for Track and Field

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

以下のファイルの中身をコピペし、~/.zshenv の中身に貼り付け
（.zshenv ファイルがなかった場合、ファイルごと置いても OK）
https://drive.google.com/file/d/1aAdBYKBp6PELols2RopVaJv74CY-FmFU/view?usp=sharing

## Build Setup

```bash
cd track-and-field

# 初回
$ nvm install

# 2回目から
$ nvm use

# install dependencies
$ npm install

# amplify用のコードを取得
amplify pull --appId d6z6pv6b0acga --envName staging

# ↑の途中の選択肢
? Choose your default editor: Visual Studio Code
? Choose the type of app that you are building javascript
Please tell us about your project
? What javascript framework are you using vue
? Source Directory Path:  .
? Distribution Directory Path: dist
? Build Command:  npm run-script build
? Start Command: npm run-script serve
? Do you plan on modifying this backend? Yes

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
