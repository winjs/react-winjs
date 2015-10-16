## How to contribute
There are many ways that you can contribute to the react-winjs project:

* Submit a bug
* Verify fixes for bugs
* Submit a code fix for a bug
* Submit a feature request
* Submit a unit test
* Tell others about the WinJS project
* Tell the developers how much you appreciate the project
* Other...

## Contributing Code
Note that all code submissions will be rigorously reviewed and tested by the team, and only those that meet an extremely high bar for both quality and design/roadmap appropriateness will be merged into the source.

### Pull Requests
You will need to sign a [Contribution License Agreement](https://cla.microsoft.com/) ([CLA](https://cla.microsoft.com/)) before submitting your pull request be it a feature or a bug fix. To complete the CLA, you will need to submit the request via the form and then electronically sign the CLA when you receive the email containing the link to the document.

This needs to only be done once for any Microsoft open source project.

### Feature Requests
Before submitting a feature or substantial code contribution please discuss it with the team and ensure it aligns with the project's roadmap.

## Contributing to README and Wiki
You do not need to sign a Contribution License Agreement if you are just contributing to the README or the Wiki. By submitting a contribution to the README or the Wiki, you are contributing it under the [Creative Commons CC0 1.0 Universal Public Domain Dedication](http://creativecommons.org/publicdomain/zero/1.0/).


# Development

To make propert updates to the project the development requires a bit of setup.

## Required Dependencies

- [Grunt](http://gruntjs.com/) `npm install -g grunt-cli`
- If on a Mac (to run the `Nuget.exe`)
  - [Mono](http://www.mono-project.com/download/) `brew install mono`

## Bring down necessary tools

1. Create a folder to host multiple repositories (let's call the folder `winjs`)
2. Inside of the `winjs` root folder pull down the following projects
  - `git clone https://github.com/winjs/winjs.git`
  - `git clone https://github.com/winjs/react-winjs.git`
  - `git clone https://github.com/winjs/winjs-control-apis.git`
3. Follow each's projects setup (usually `npm install`) etc...
4. In the `winjs` proper project check out the version you want (ex: `v4.4.0`) and run a build.
5.
