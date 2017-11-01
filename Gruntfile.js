// Copyright (c) Microsoft Corp.  All Rights Reserved. Licensed under the MIT License. See License.txt in the project root for license information.

"use strict";

// var exec = require('child_process').exec;
import { exec } from 'child_process';
// var { execSync } = require('child_process').execSync;
import { execSync } from 'child_process';

module.exports = function(grunt) {
    
    let publishRoot = 'dist/';
    let npmPublishRoot = publishRoot + 'npm/';
    
    // All version number information is derived from package.json. This includes the version
    // info used with npm, bower, NuGet, and the GitHub release.
    let pkg = grunt.file.readJSON('package.json');
    let fullWinjsVersion = pkg.peerDependencies.winjs;
    if (!fullWinjsVersion) {
        grunt.fail.fatal('Unable to determine WinJS version required by react-winjs');
    }
    // package.json version contains <major>.<minor>.<patch>. We just want <major>.<minor>
    let winjsVersion = fullWinjsVersion.split(".").slice(0, 2).join(".");
    
    let currentGitCommitHash = execSync('git rev-parse HEAD').toString().trim();
    
    let bomGlob = "**/*.+(js|css|htm|html)";
    
    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        
        clean: {
            publish: [publishRoot]
        },
        
        copy: {
            publish: {
                files: [{
                    expand: true,
                    src: [
                        'react-winjs.js',
                        'LICENSE.txt',
                        'package.json',
                        'README.md'
                    ],
                    dest: npmPublishRoot
                }]
            }
        },
        
        compress: {
            publish: {
                options: {
                    archive: publishRoot + 'react-winjs.zip'
                },
                files: [{
                    expand: true,
                    cwd: npmPublishRoot,
                    src: ["**"]
                }]
            }
        },
        
        "check-bom": {
            publish: {
                files: [{
                    src: "react-winjs.js",
                    expand: true,
                    nocase: true
                }, {
                    cwd: publishRoot,
                    src: bomGlob,
                    expand: true,
                    nocase: true
                }]
            }
        },
        
        nugetpack: {
            publish: {
                src: 'React.WinJS.nuspec',
                dest: publishRoot,
                options: {
                    version: '<%= pkg.version %>'
                }
            }
        },
        
        // Publishes nuget package
        nugetpush: {
            // Requires NuGet API key to be set. You can do this with:
            //   grunt nugetkey --key=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
            publish: {
                src: publishRoot + '*.nupkg',
            }
        },
        
        // Publishes GitHub release and bower package (bower consumes GitHub tags/releases)
        'github-release': {
            // Requires this environment variable to be set: GITHUB_ACCESS_TOKEN
            // GITHUB_ACCESS_TOKEN can be generated from https://help.github.com/articles/creating-an-access-token-for-command-line-use/
            publish: {
                options: {
                    repository: 'winjs/react-winjs',
                    auth: {
                        user: process.env.GITHUB_ACCESS_TOKEN
                    },
                    release: {
                        tag_name: 'v<%= pkg.version %>', // Must follow semver syntax in order for bower to pick it up
                        target_commitish: currentGitCommitHash,
                        name: '<%= pkg.version %>',
                        body:
                            'Release of react-winjs <%= pkg.version %>.\n' +
                            '\n' +
                            'Compatible with WinJS ' + winjsVersion + '.\n'
                    }
                },
                files: {
                    src: [publishRoot + 'react-winjs.zip']
                }
            }
        }
    });
    
    grunt.loadTasks('tasks/');
    
    let plugins = [
        'grunt-contrib-clean',
        'grunt-contrib-compress',
        'grunt-contrib-copy',
        'grunt-nuget',
        'grunt-github-releaser'
    ];
    plugins.forEach(function (plugin) {
        grunt.loadNpmTasks(plugin);
    });
    
    // Publishes npm package
    grunt.registerTask('npm-release', function (mode) {
        let done = this.async();
        let cmd = 'npm publish ' + npmPublishRoot;
        
        exec(cmd, function (err, stdout) {
            if (err) {
                grunt.fatal('npm publish failed using command: ' + cmd);
            }
            done();
        });
    });
    
    // Sets up all of the state necessary to do a publish but doesn't actually publish
    // to any of the package managers.
    grunt.registerTask('prepare-publish', [
        'clean:publish',
        'copy:publish',
        'compress:publish',
        'nugetpack:publish',
        'check-bom:publish',
    ]);
    
    grunt.registerTask('finished-publish', function (mode) {
        grunt.log.writeln('');
        grunt.log.writeln('Publish complete. Hand tweak the GitHub release description if necessary (https://github.com/winjs/react-winjs/releases)');
        grunt.log.writeln('');
    });
    
    //
    // Public tasks designed to be run from the command line
    //
    
    // Populates the 'dist' folder and then uses it to:
    //  - Create a GitHub release
    //  - Publish to npm
    //  - Publish to bower
    //  - Publish to NuGet
    // When debugging publish, it's helpful to run just the 'prepare-publish'
    // task which puts all of the publication data into the 'dist' folder but
    // doesn't actually send the data to the package managers.
    grunt.registerTask('publish', function (mode) {
        if (!process.env.GITHUB_ACCESS_TOKEN) {
            grunt.fail.fatal('The GITHUB_ACCESS_TOKEN environment variable must be set in order to create GitHub releases');
        }
        
        if (!mode) {
            grunt.log.writeln('');
            grunt.log.writeln('Will publish version ' + pkg.version + ' of react-winjs to npm, NuGet, etc. Double check that:');
            grunt.log.writeln('  * You are on the branch you\'d like to publish');
            grunt.log.writeln('  * The branch has been pushed to GitHub');
            grunt.log.writeln('  * You don\'t have any local edits');
            grunt.log.writeln('');
            grunt.log.writeln('If everything is in order, run "grunt publish:force" to proceed');
        } else if (mode === 'force') {
            grunt.task.run([
                'prepare-publish',
                'nugetpush:publish',
                'github-release:publish',
                'npm-release',
                'finished-publish',
            ]);
        }
    });  
};
