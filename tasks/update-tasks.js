// Copyright (c) Microsoft Corporation.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.
(function () {
    "use strict";

    module.exports = function (grunt) {

        var fs = require('fs');
        var extend = require('util')._extend;

        // Verifies that files begin with a UTF8 BOM. Files without one will not be able to pass the
        // Windows App Certification Kit test.

        grunt.registerMultiTask("update-controls-api", function () {

            var fileApis = this.filesSrc.map(function(file) {

/// ****** WARNING ********
///
/// The winjs-controls-apis leverages tscore.js which apparently doesn't process multiple files well
/// The below cache invalidation works around errors that are raised if we try to process multiple
/// .d.ts files at a time.

              var tscoreKey = Object.keys(require.cache).filter(function(key){
                return key.indexOf("tscore.js") >= 0;
              });
              delete require.cache[require.resolve('winjs-control-apis')]
              delete require.cache[tscoreKey]
              var winjsControlApis = require('winjs-control-apis');
/// ****** WARNING ********

              var result = winjsControlApis.getRawControlApi(file);
              return result;
            });

            var resultingApis = {};
            fileApis.forEach(function(fileApi) {
              extend(resultingApis, fileApi);
            });

            var winjsControlApis = require('winjs-control-apis');
            var rawControlApisCode = winjsControlApis.sortedPrint(resultingApis);

            var reactWinJSCode = fs.readFileSync('./react-winjs.js').toString();

            // ugly search/replace templating :)
            rawControlApisCode = "//*** RawControlApis start\n" +
                                  "var RawControlApis = " + rawControlApisCode + ";\n\n" +
                                  "/// DO NOT DELETE COMMENT\n" +
                                  "//*** RawControlApis end";

            var newReactWinJSCode = reactWinJSCode.replace(/\/\/\*\*\* RawControlApis start(.*)[\s\S]+RawControlApis end/gm, rawControlApisCode);
            fs.writeFile('./react-winjs.js', newReactWinJSCode);

        });

    };
})();
