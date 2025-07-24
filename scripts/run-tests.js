// scripts/run-tests.js

const { spawn, execSync } = require('child_process');

// The OBSIDIAN_TEST_VAULT_PATH must be set by the user.
const testVaultPath = process.env.OBSIDIAN_TEST_VAULT_PATH;

if (!testVaultPath) {
    console.error('Error: OBSIDIAN_TEST_VAULT_PATH environment variable is not set.');
    console.error('Please set it to the absolute path of your test vault and run `npm run initialize-test-vault` before running tests.');
    process.exit(1);
}

// Pass the required vault path to the Jest environment.
process.env.OBSIDIAN_VAULT_PATH = testVaultPath;

// Install the plugin to the test vault before running tests.
try {
    console.log('Installing plugin to test vault...');
    execSync('npm run install-plugin-test', { stdio: 'inherit' });
} catch (error) {
    console.error('Failed to install plugin to test vault. Aborting tests.');
    process.exit(1);
}


const jestArgs = [];
const jest = spawn('jest', jestArgs, { stdio: 'inherit', shell: true });

jest.on('close', (code) => {
    process.exit(code);
});
