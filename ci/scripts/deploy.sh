#!/usr/bin/env bash

if [[ $TRAVIS_COMMIT_MESSAGE != "build(react-winjs): transpile and minify library" ]]; then    
    yarn run build
    git add .
    git commit -m "build(react-winjs): transpile and minify library"
    git push origin $TRAVIS_BRANCH
fi