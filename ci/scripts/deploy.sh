#!/usr/bin/env bash

TRAVIS_COMMIT_MESSAGE="test"
TRAVIS_BRANCH="feature/deploy"

if [[ $TRAVIS_COMMIT_MESSAGE != *"ci(release): generate CHANGELOG.md for version"* && $TRAVIS_COMMIT_MESSAGE != "build(react-winjs): transpile and minify library" ]]; then    
    # Generate CHANGELOG.md and increment version
    yarn run release 
    yarn run build
    git add .
    git commit -m "build(react-winjs): transpile and minify library"
    git push origin $TRAVIS_BRANCH
fi
