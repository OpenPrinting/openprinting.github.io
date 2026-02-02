# How to contribute

Community support is essential to making any open-source project successful. We aim to keep contributing as simple as possible, while following a few guidelines so others can easily understand and maintain the codebase.

## General process

Our documentation is published on the https://openprinting.github.io/ address and stored
in the [openprinting.github.io repository](https://github.com/OpenPrinting/openprinting.github.io).
All the common documentation pages are published in the
[Documentation section](https://openprinting.github.io/documentation/) and stored
in the `_documentation` directory.

Documentation for individual components is kept in each component’s repository,
usually in a doc directory.

To contribute, fork the relevant repository and open a pull request with your proposed changes.
The pull request will be automatically assigned to reviewers.
Include a clear, meaningful description of what you changed and why.

If your pull request hasn’t received any review activity after a week, feel free to contact us.

### Issues workflow

Use these guidelines when working with issues:

* If you want to work on an issue, comment on it first to let others know you’re taking it.
* Before opening a new issue, check whether a similar issue already exists.
* For bug reports, include the browser (and version) you’re using, since behavior may differ across browsers.
* For ideas or feature requests, explain how the change will affect the user experience and/or improve the website’s functionality.

### Pull Requests

* If you have made some changes in the codebase and want to generate a PR. First, pull latest version of code from [upstream](https://github.com/Esri/developer-support/wiki/Setting-the-upstream-for-a-fork). Remove all merge conflicts before generating PR.
* In the PR, try to add working link of your work and if that is not possible, add screenshots.

### Making changes


* Whenever you are working on some major feature, always create a [new branch](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging).

## Build docs

To build our documentation locally:

* Setup jekyll environment. See the [official documentation](https://jekyllrb.com/docs/) for guidance.
* Clone the source code from [Github](https://github.com/OpenPrinting/openprinting.github.io).
* Navigate to the local repository and run: `bundle exec jekyll serve`
* Open the localhost address in your web browser: `localhost:4000`
