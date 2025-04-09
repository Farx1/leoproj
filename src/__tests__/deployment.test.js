describe('Deployment Configuration', () => {
  test('index.html exists at root level', () => {
    const fs = require('fs');
    expect(fs.existsSync('./index.html')).toBe(true);
  });

  test('error-reporter.js exists at root level', () => {
    const fs = require('fs');
    expect(fs.existsSync('./error-reporter.js')).toBe(true);
  });

  test('package.json has correct homepage setting', () => {
    const fs = require('fs');
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    expect(packageJson.homepage).toBe('.');
  });

  test('public/index.html should not exist (redundant)', () => {
    const fs = require('fs');
    expect(fs.existsSync('./public/index.html')).toBe(false);
  });
});
