module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: [
        "/node_modules/",
        "/test-vault/"
    ],
    setupFilesAfterEnv: ['./tests/test-setup.js'],
    moduleNameMapper: {
        'obsidian': '<rootDir>/tests/obsidian-mocks.ts'
    }
};
