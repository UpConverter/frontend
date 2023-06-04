module.exports = {
    hooks: {
        'pre-commit': ['tsc', 'npx lint-staged'].join(' && '),
    },
};
