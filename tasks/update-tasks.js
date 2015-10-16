var fs = require('fs');

// Copyright (c) Microsoft Corporation.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.
(function () {
    "use strict";

    module.exports = function (grunt) {

        // Verifies that files begin with a UTF8 BOM. Files without one will not be able to pass the
        // Windows App Certification Kit test.

        grunt.registerMultiTask("update-controls-api", function () {

            var execSync = require('child_process').execSync;

            execSync("./node_modules/winjs-control-apis/main.js ./typings/winjs.d.ts ./typings/MediaElement.d.ts > ./RawControlApis.js");

            var reactWinJSCode = fs.readFileSync('./react-winjs.js').toString();
            var rawControlApisCode = fs.readFileSync('./RawControlApis.js').toString();

            // ugly search/replace templating :)
            rawControlApisCode = "//*** RawControlApis start\n" +
                                  rawControlApisCode + "\n" +
                                  "/// DO NOT DELETE COMMENT\n" +
                                  "//*** RawControlApis end\n";
            fs.unlink("./RawControlApis.js");

            var newReactWinJSCode = "\uFEFF" + reactWinJSCode.replace(/\/\/\*\*\* RawControlApis start(.*)[\s\S]+RawControlApis end/gm, rawControlApisCode);
            fs.writeFile('./react-winjs.js', newReactWinJSCode);

        });

    };
})();
