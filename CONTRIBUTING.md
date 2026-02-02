# How to Contribute

Thank you for your interest in contributing to OpenPrinting! Community support is essential to the success of any open-source project. We've designed our contribution process to be as straightforward as possible, and following these guidelines will help keep our codebase maintainable for everyone.

## Where Our Documentation Lives

Our documentation is published at https://openprinting.github.io/ and maintained in the [openprinting.github.io repository](https://github.com/OpenPrinting/openprinting.github.io).

**Main documentation:**

- Published in the [Documentation section](https://openprinting.github.io/documentation/)
- Stored in the `_documentation` directory

**Component-specific documentation:**

- Kept in each component's own repository
- Usually located in a `doc` directory

## Making Changes

1. **Fork** the relevant repository
2. **Create a branch** from the latest version of the main branch
3. **Make your changes** with clear, focused commits
4. **Open a pull request** with a meaningful description explaining what you changed and why
5. Your PR will be automatically assigned to reviewers

**Need help?** If your pull request hasn't received any review activity after a week, feel free to contact us.

## Working with Issues

Found a bug or have an idea? Opening an issue is a valuable contribution, even if you can't fix it yourself.

**Before opening an issue:**

- Check if a similar issue already exists

**When opening an issue:**

- For **bug reports**: Include your browser name and version, as behavior may vary across browsers
- For **feature requests**: Explain how the change will improve the user experience or website functionality

**Want to work on an issue?**

- Comment on the issue first to let others know you're working on it

## Pull Request Guidelines

When submitting a pull request:

- **Stay up to date**: Pull the latest changes before creating your branch and update your PR branch before submitting
- **Resolve conflicts**: Fix any merge conflicts that arise
- **Test locally**: Build your branch and verify all affected functionality works correctly
- **Provide context**: Include a working link to your changes or add screenshots when helpful

## Style Guide

- Use **US spelling** for all documentation and website content
- Write documentation using **Markdown syntax**
- Run your IDE's spellchecker before submitting a PR

## Building Documentation Locally

To preview documentation changes on your machine:

1. **Set up Jekyll**: Follow the [official Jekyll documentation](https://jekyllrb.com/docs/) to install Jekyll
2. **Clone the repository**: `git clone https://github.com/OpenPrinting/openprinting.github.io`
3. **Navigate to the directory**: `cd openprinting.github.io`
4. **Start the server**: `bundle exec jekyll serve`
5. **View in your browser**: Open `http://localhost:4000`
