# Contributing to ResuMatrix

First off, thank you for considering contributing to ResuMatrix! 🎉 It's people like you that make ResuMatrix such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**
* **Include your environment details (OS, browser, etc.)**

### Suggesting Enhancements 💡

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain the behavior you expected to see**
* **Explain why this enhancement would be useful**
* **List some other applications where this enhancement exists, if applicable**

### Pull Requests 🚀

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.

### Development Process 👩‍💻

1. Clone the repository
```bash
git clone https://github.com/ZayedShahcode/ResuMatrix.git
```

2. Create a branch for your feature
```bash
git checkout -b feature/your-feature-name
```

3. Setup Development Environment
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

4. Make your changes and test them thoroughly

5. Commit your changes (using conventional commits)
```bash
git commit -m "feat: add new feature"
```

### Commit Message Guidelines 📝

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Example:
```
feat: add dark mode toggle
^--^  ^---------------^
|     |
|     +-> Summary in present tense
|
+-------> Type: feat, fix, docs, style, refactor, perf, test, or chore
```

### Style Guide 🎨

#### JavaScript/React
- Use ES6+ features
- Use meaningful variable names
- Comment complex logic
- Keep functions small and focused
- Use proper indentation (2 spaces)

#### CSS/Tailwind
- Follow BEM methodology when not using Tailwind
- Keep classes organized and minimal
- Use CSS variables for theming
- Follow mobile-first approach

### Testing 🧪

- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Include both positive and negative test cases
- Mock external dependencies

### Documentation 📚

- Update README.md if needed
- Document new features
- Include JSDoc comments for functions
- Update API documentation if applicable

### Review Process 👀

1. Create a Pull Request with a clear title and description
2. Link any relevant issues
3. Request review from maintainers
4. Address review comments
5. Update PR based on feedback
6. Wait for approval and merge

## Project Structure 📁

```
ResuMatrix/
├── frontend/          # React frontend
│   ├── src/
│   ├── components/
│   └── ...
├── backend/           # Node.js backend
│   ├── app.js
│   ├── utils/
│   └── ...
└── docs/             # Documentation
```

## Questions? 🤔

Feel free to contact the maintainers if you have any questions. We're here to help!

## Recognition 🌟

Contributors will be added to our README.md and given credit for their work.

Thank you for contributing to ResuMatrix! 🙏