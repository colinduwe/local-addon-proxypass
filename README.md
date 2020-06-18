# Local Add-on Proxy Images • [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/colinduwe/local-addon-proxypass/pulls/)

This plugin allows nginx to serve images missing from your local site from your production server. 

For example, if your local site is serving a page with a reference to an image:  
https://www.example.local/wp-content/uploads/2020/01/cat.jpg.  
and that file is not in your local site's file system it will try to serve the image from the production server (www.example.com). 
https://www.example.com/wp-content/uploads/2020/01/cat.jpg  

## Installation

### Clone

Clone the repository into the following directory depending on your platform:

- macOS: `~/Library/Application Support/Local by Flywheel/addons`

### Install Dependencies and transpile files
1. `yarn install`
2. `yarn build`
3. Restart Local
4. Navigate to Add-ons -> Installed and enable Proxy Images

## Usage

1. Choose on of your sites in Local
2. Navigate to Utilities
3. Enter the URL of your production server
4. Toggle the switch to ON.
5. Restart your site.

## Development

### Folder Structure
All files in `/src` will be transpiled to `/lib` using [Babel](https://github.com/babel/babel/). Anything in `/lib` will be overwritten.


## License

MIT
