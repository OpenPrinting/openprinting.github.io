# How to contribute

Community support is essential to making any open-source project successful.
We aim to keep contributing as simple as possible.
However, following a few guidelines shown before helps
others understand and maintain the codebase.

## General process

Our documentation is published at https://openprinting.github.io/ and stored
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

## Issues workflow

If you spot a problem or bug, please open an issue.
Reporting and documenting issues is a valuable contribution,
even if you’re not able to fix them yourself.

Use these guidelines when working with issues:

* If you want to work on an issue, comment on it first to let others know you’re taking it.
* Before opening a new issue, check whether a similar issue already exists.
* For bug reports, include the browser (and version) you’re using, since behavior may differ across browsers.
* For ideas or feature requests, explain how the change will affect the user experience and/or improve the website’s functionality.

## Pull requests

Documentation updates and fixes should be done via pull requests:

* Make sure you pull the latest version of our repository before creating a branch. Update (rebase or merge into) your PR branch to the latest before submitting a PR. Resolve all merge conflicts if any.
* In the PR, try to add a working link to your work or add screenshots if necessary.
* Build your branch locally and check every affected behavior.

## Style guide

We use US spelling for all our documentation and website content. Please use your IDE's spellchecker before submitting a PR.

## Build docs

To build our documentation locally:

* Set up the Jekyll environment. See the [official documentation](https://jekyllrb.com/docs/) for guidance.
* Clone the source code from [GitHub](https://github.com/OpenPrinting/openprinting.github.io).
* Navigate to the local repository and run: `bundle exec jekyll serve`
* Open the localhost address in your web browser: `localhost:4000`
