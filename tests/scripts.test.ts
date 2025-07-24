import { exec, ExecException } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const projectRoot = path.resolve(__dirname, '..');
const personalVaultPath = process.env.OBSIDIAN_PERSONAL_VAULT_PATH;

// Helper function to run a script and return a promise
const runScript = (scriptName: string, env?: NodeJS.ProcessEnv): Promise<{ stdout: string; stderr: string; error: ExecException | null }> => {
    return new Promise((resolve) => {
        exec(`npm run ${scriptName}`, { cwd: projectRoot, env: { ...process.env, ...env } }, (error, stdout, stderr) => {
            resolve({ stdout, stderr, error });
        });
    });
};

describe('User Scripts', () => {
    // Test for initialize-test-vault
    test('initialize-test-vault should run without errors', async () => {
        const { error } = await runScript('initialize-test-vault');
        expect(error).toBeNull();
    }, 10000); // Increase timeout to 10 seconds

    describe('Personal Vault Scripts', () => {
        if (personalVaultPath) {
            test('open-personal-vault should run without errors when path is set', async () => {
                const { error } = await runScript('open-personal-vault');
                expect(error).toBeNull();
            });
        } else {
            test('open-personal-vault should fail when path is not set', async () => {
                const { stderr, error } = await runScript('open-personal-vault');
                expect(error).not.toBeNull();
                expect(stderr).toContain("OBSIDIAN_PERSONAL_VAULT_PATH environment variable not set");
            });
        }
    });

    describe('Installation Scripts', () => {
        const filesToCopy = ['main.js', 'manifest.json', 'styles.css'];

        beforeAll(() => {
            filesToCopy.forEach(file => {
                const filePath = path.join(projectRoot, file);
                if (!fs.existsSync(filePath)) {
                    fs.writeFileSync(filePath, '');
                }
            });
        });

        afterAll(() => {
            filesToCopy.forEach(file => {
                const filePath = path.join(projectRoot, file);
                try {
                    const stats = fs.statSync(filePath);
                    if (stats.size === 0) {
                        fs.unlinkSync(filePath);
                    }
                } catch (e) {
                    // Ignore
                }
            });
        });

        test('install-plugin-test should run without errors', async () => {
            const { stdout, stderr, error } = await runScript('install-plugin-test');
            expect(error).toBeNull();
            expect(stderr).toBe('');
            filesToCopy.forEach(file => {
                const sourceFile = path.resolve(projectRoot, file);
                expect(stdout).toContain(sourceFile);
            });
        });

        if (personalVaultPath) {
            test('install-plugin-personal should run without errors when path is set', async () => {
                const { error } = await runScript('install-plugin-personal');
                expect(error).toBeNull();
            });
        } else {
            test('install-plugin-personal should fail when path is not set', async () => {
                const { stderr, error } = await runScript('install-plugin-personal');
                expect(error).not.toBeNull();
                expect(stderr).toContain("OBSIDIAN_PERSONAL_VAULT_PATH environment variable not set");
            });
        }
    });
});