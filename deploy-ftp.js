#!/usr/bin/env node

/**
 * Script de Deploy via FTP
 * Uso: node deploy-ftp.js
 *
 * Certifique-se de ter instalado: npm install ftp
 */

import fs from 'fs';
import path from 'path';
import FTPClient from 'ftp';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  host: process.env.FTP_HOST || 'ftp.beige-cat-184405.hostingersite.com',
  user: process.env.FTP_USER || 'u880459407.panpp',
  password: process.env.FTP_PASSWORD || '22Panpp2-',
  port: parseInt(process.env.FTP_PORT || '21'),
};

const remoteDir = process.env.FTP_REMOTE_DIR || '/public_html';
const localDir = './dist';

console.log('🚀 Iniciando Deploy via FTP...');
console.log(`📍 Host: ${config.host}`);
console.log(`👤 Usuário: ${config.user}`);
console.log(`📂 Diretório Remoto: ${remoteDir}`);
console.log('');

// Verificar se pasta dist existe
if (!fs.existsSync(localDir)) {
  console.error('❌ Erro: Pasta "dist" não encontrada!');
  console.error('   Execute "npm run build" primeiro.');
  process.exit(1);
}

const client = new FTPClient();
let uploadedCount = 0;
let errorCount = 0;

client.on('ready', () => {
  console.log('✓ Conectado ao servidor FTP\n');
  uploadDirectory(localDir, remoteDir);
});

client.on('error', (err) => {
  console.error('❌ Erro FTP:', err.message);
  process.exit(1);
});

client.on('close', () => {
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Deploy concluído!`);
  console.log(`   Arquivos enviados: ${uploadedCount}`);
  if (errorCount > 0) console.log(`   ⚠️  Erros: ${errorCount}`);
  console.log('='.repeat(50));
});

function uploadDirectory(localPath, remotePath, callback) {
  fs.readdir(localPath, (err, files) => {
    if (err) {
      console.error(`❌ Erro ao ler diretório ${localPath}:`, err.message);
      if (callback) callback();
      return;
    }

    if (files.length === 0) {
      if (callback) callback();
      return;
    }

    let completed = 0;

    files.forEach((file) => {
      const filePath = path.join(localPath, file);
      const remoteFilePath = `${remotePath}/${file}`;

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`❌ Erro ao acessar ${filePath}:`, err.message);
          errorCount++;
          completed++;
          if (completed === files.length && callback) callback();
          return;
        }

        if (stats.isDirectory()) {
          // Criar diretório remoto
          client.mkdir(remoteFilePath, true, (err) => {
            if (err && err.code !== 550) {
              console.error(`❌ Erro ao criar diretório ${remoteFilePath}:`, err.message);
              errorCount++;
            }
            // Recursivamente fazer upload do diretório
            uploadDirectory(filePath, remoteFilePath, () => {
              completed++;
              if (completed === files.length && callback) callback();
            });
          });
        } else {
          // Fazer upload do arquivo
          client.put(filePath, remoteFilePath, (err) => {
            if (err) {
              console.error(`❌ Erro ao enviar ${remoteFilePath}:`, err.message);
              errorCount++;
            } else {
              uploadedCount++;
              console.log(`✓ ${remoteFilePath}`);
            }
            completed++;
            if (completed === files.length && callback) callback();
          });
        }
      });
    });
  });
}

// Conectar ao servidor
try {
  client.connect(config);
} catch (err) {
  console.error('❌ Erro ao conectar:', err.message);
  process.exit(1);
}

// Timeout de segurança (30 minutos)
setTimeout(() => {
  console.error('❌ Timeout: Deploy levou muito tempo!');
  client.end();
  process.exit(1);
}, 30 * 60 * 1000);
