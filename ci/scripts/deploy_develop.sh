#!/usr/bin/env bash

if [[ $TRAVIS_COMMIT_MESSAGE != *"ci(release): generate CHANGELOG.md for version"* && $TRAVIS_COMMIT_MESSAGE != "build(react-winjs): transpile and minify library" ]]; then    
    yarn run build
    git add .
    git commit -m "build(react-winjs): transpile and minify library"

    # # Generate CHANGELOG.md and increment version
    # yarn run release
    
    # push commits to develop
    git push origin $TRAVIS_BRANCH
fi
