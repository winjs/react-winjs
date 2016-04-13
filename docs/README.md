# React-WinJS Component Documentation (see it live [here](https://brandai.com/styleguide/WinJS))

This folder contains configuration required to build documentation for react-winjs using [Brand AI](https://brand.ai).

## Flow
### Build
Use gulp to build a distribution folder containing:
* library version of react-winjs
* WinJS core scripts and stylesheets.

See [webpack.config.json](https://github.com/winjs/react-winjs/blob/master/docs/webpack.config.js) and [gulpfile.json](https://github.com/winjs/react-winjs/blob/master/docs/gulpfile.js) for more info on that.

```sh
$ cd react-winjs/docs
$ npm install
$ gulp build
```

### Deploy
Deploying to Brand.ai is done through [brandai-tools](https://github.com/brandai/brandai-tools).
```sh
$ npm install -g brandai-tools
$ brandai login
$ brandai deploy
```

### Config
[brandai.json](https://github.com/brandai/react-winjs/blob/master/docs/brandai.json) contains all the component extraction and deployment information.

* `name` - the component library name in Brand.ai - each documentation project is associated with one or more component libraries
* `libraryPath` - relative path for the component library project root (used to read library package.json)
* `dist` - name of the dist folder containing the library and its dependencies - used both for rendering examples and for dynamic analysis of components and their properties
* `libraryObjectName` - name of the library on the global object (we set it to `ReactWinJS` in `webpack.config.js`.
* `reactVersion` - the version of React required for running this library (automatically gets pulled when rendering the components)
* `dynamicExtraction` - this tells Brand.ai to dynamically extract components - run the files in the `dist` folder and extract the required info from live components, rather than statically parse .jsx files.
* `fileOrder` - when loading dependencies, file names appearing here will be loaded first (we can't load react-winjs until the winjs core files are there).

#### Example package.json
```json
{
  "name": "react-winjs",
  "libraryPath": "../",
  "dist": "dist",
  "libraryObjectName": "ReactWinJS",
  "reactVersion": "15.0.1",
  "dynamicExtraction": true,
  "fileOrder": ["base.min.js", "ui.min.js"]
}
