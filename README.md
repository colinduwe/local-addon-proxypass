# Local Add-on Proxy Images • [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/colinduwe/local-addon-proxypass/pulls/)

## Installation

### Clone

Clone the repository into the following directory depending on your platform:

- macOS: `~/Library/Application Support/Local by Flywheel/addons`

### Install Dependencies and transpile files
1. `yarn install`
2. `yarn build`

## Development

### Folder Structure
All files in `/src` will be transpiled to `/lib` using [Babel](https://github.com/babel/babel/). Anything in `/lib` will be overwritten.


## License

MIT
