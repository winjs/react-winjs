#!/usr/bin/env bash

# Deploy in develop
if [[ $TRAVIS_BRANCH == 'develop' && $TRAVIS_PULL_REQUEST = false ]]; then
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
fi

# Deploy in master
if [[ $TRAVIS_BRANCH == 'master' && $TRAVIS_PULL_REQUEST = false ]]; then
    if [[ $TRAVIS_COMMIT_MESSAGE != *"ci(release): generate CHANGELOG.md for version"* && $TRAVIS_COMMIT_MESSAGE != "build(react-winjs): transpile and minify library" ]]; then    
        # Generate CHANGELOG.md and increment version
        yarn run release -- -m 'ci(release): generate CHANGELOG.md for version %s'
        # Get version number from package.json
        export GIT_TAG=$(jq -r ".version" package.json)
        yarn run build
        git add react-winjs.min.js
        git commit -m "build(react-winjs): transpile and minify library for version $GIT_TAG"
        # push commits to master
        git push origin $TRAVIS_BRANCH
    fi
fi
