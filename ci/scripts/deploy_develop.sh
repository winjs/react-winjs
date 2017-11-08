#!/usr/bin/env bash

if [[ $TRAVIS_COMMIT_MESSAGE != *"ci(release): generate CHANGELOG.md for version"* && $TRAVIS_COMMIT_MESSAGE != "build(react-winjs): transpile and minify library" ]]; then    
    # Generate CHANGELOG.md and increment version
    yarn run release
    # Get version number from package.json
    export GIT_TAG=$(jq -r ".version" package.json)
    # Revert last commit
    git reset --hard HEAD~1
    # Transpile and minify library
    yarn run build
    git add react-winjs.min.js
    git commit -m "build(react-winjs): transpile and minify library for version $GIT_TAG"    
    # push commits to develop
    git push origin $TRAVIS_BRANCH
fi
