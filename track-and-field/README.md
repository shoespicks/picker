# Picker for Track and Field

## 初回のみ
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew update
brew install nvm
```

以下を~/.zshrcにコピペ

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

以下のファイルの中身をコピペし、~/.zshenvの中身に貼り付け
（.zshenvファイルがなかった場合、ファイルごと置いてもOK）
https://drive.google.com/file/d/1aAdBYKBp6PELols2RopVaJv74CY-FmFU/view?usp=sharing

## Build Setup

```bash
cd shoespicks

# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
