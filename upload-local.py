#!/usr/bin/env python3
"""
Script para fazer upload dos arquivos do site via FTP
Execute este script no seu PC local onde tem os arquivos compilados

Uso: python3 upload-local.py
"""

import os
import sys
import ftplib
from pathlib import Path

# === CONFIGURAÇÃO ===
FTP_HOST = '62.72.62.92'  # IP correto do painel Hostinger
FTP_USER = 'u880459407.beige-cat-184405.hostingersite.com'  # Nome correto
FTP_PASSWORD = '22Panpp2-'
FTP_PORT = 21
REMOTE_DIR = '/public_html'
LOCAL_DIR = './dist'  # Pasta dist com os arquivos compilados

# === CORES PARA OUTPUT ===
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_header(msg):
    print(f"\n{Colors.HEADER}{Colors.BOLD}{'='*50}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{msg}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{'='*50}{Colors.ENDC}\n")

def print_ok(msg):
    print(f"{Colors.OKGREEN}✓ {msg}{Colors.ENDC}")

def print_info(msg):
    print(f"{Colors.OKCYAN}ℹ {msg}{Colors.ENDC}")

def print_error(msg):
    print(f"{Colors.FAIL}✗ {msg}{Colors.ENDC}")

def print_warning(msg):
    print(f"{Colors.WARNING}⚠ {msg}{Colors.ENDC}")

def upload_directory(ftp, local_path, remote_path):
    """Faz upload recursivo de um diretório"""
    try:
        # Tentar criar diretório remoto
        try:
            ftp.mkd(remote_path)
            print_ok(f"Diretório criado: {remote_path}")
        except ftplib.error_perm:
            print_info(f"Diretório já existe: {remote_path}")

        # Mudar para o diretório remoto
        ftp.cwd(remote_path)

        # Iterar arquivos e diretórios locais
        for item in os.listdir(local_path):
            local_item = os.path.join(local_path, item)

            if os.path.isdir(local_item):
                # É um diretório
                upload_directory(ftp, local_item, item)
                ftp.cwd('..')
            else:
                # É um arquivo
                print_info(f"Enviando: {remote_path}/{item}")
                with open(local_item, 'rb') as f:
                    ftp.storbinary(f'STOR {item}', f)
                print_ok(f"Arquivo enviado: {item}")

    except Exception as e:
        print_error(f"Erro ao fazer upload: {e}")
        return False

    return True

def main():
    print_header("🚀 UPLOAD FTP - EVENTO DESPORTIVO CAESB")

    # Verificar se pasta dist existe
    if not os.path.exists(LOCAL_DIR):
        print_error(f"Pasta '{LOCAL_DIR}' não encontrada!")
        print_info("Certifique-se de ter executado: npm run build")
        sys.exit(1)

    print_info(f"Diretório local: {LOCAL_DIR}")
    print_info(f"Host FTP: {FTP_HOST}")
    print_info(f"Usuário: {FTP_USER}")
    print_info(f"Diretório remoto: {REMOTE_DIR}")

    try:
        print("\n📡 Conectando ao servidor FTP...")
        ftp = ftplib.FTP(FTP_HOST, timeout=30)
        print_ok("Conectado ao servidor FTP!")

        print("\n🔐 Fazendo login...")
        ftp.login(FTP_USER, FTP_PASSWORD)
        print_ok("Login realizado com sucesso!")

        print(f"\n📂 Navegando para {REMOTE_DIR}...")
        ftp.cwd(REMOTE_DIR)
        print_ok(f"Estou em: {ftp.pwd()}")

        print("\n📤 Iniciando upload dos arquivos...")
        print_warning("Isso pode levar alguns minutos...\n")

        if upload_directory(ftp, LOCAL_DIR, '.'):
            print_header("✅ UPLOAD CONCLUÍDO COM SUCESSO!")
            print_ok("Todos os arquivos foram enviados!")
            print_info("Seu site está no ar em alguns segundos...")
            print_info("Acesse: https://seu-dominio.com")
        else:
            print_error("Erro durante o upload!")

        ftp.quit()

    except ftplib.all_errors as e:
        print_error(f"Erro FTP: {e}")
        sys.exit(1)
    except Exception as e:
        print_error(f"Erro geral: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
