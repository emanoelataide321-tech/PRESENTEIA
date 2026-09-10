const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const AdmZip = require('adm-zip');

const root = __dirname;
const zipPath = path.join(root, 'PRESENTEIA-GITHUB-MOBILE.zip');

if (!fs.existsSync(zipPath)) {
  throw new Error('PRESENTEIA-GITHUB-MOBILE.zip não encontrado na raiz do repositório.');
}

const zip = new AdmZip(zipPath);
zip.extractAllTo(root, true);

if (!fs.existsSync(path.join(root, 'backend', 'package.json'))) {
  throw new Error('A pasta backend não foi encontrada após extrair o ZIP.');
}

execSync('npm install --prefix backend', { cwd: root, stdio: 'inherit' });
console.log('PRESENTEIA preparada para o Render.');
