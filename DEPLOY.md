Para documentar o processo que acabámos de realizar para o projeto **SIP**, preparei um ficheiro `README.md` profissional. Ele cobre desde a instalação do Node.js até à configuração do Nginx e dos serviços do sistema.

Aqui tens o conteúdo para o teu ficheiro:

---

# Guia de Deploy - Projeto SIP (Sistema de Instrução Processual)

Este guia descreve o processo de configuração e deploy do ecossistema SIP num servidor Linux, incluindo o Frontend (Next.js) e o Backend (Spring Boot 4).

## 📋 Pré-requisitos

- Sistema Operativo: Linux (Ubuntu/Debian recomendado)
- Acesso root ou sudo
- Portas 80 (HTTP) e 443 (HTTPS) abertas no firewall

---

## 1. Ambiente Node.js (Frontend)

Para garantir a versão mais recente do Node.js sem conflitos de permissão, utilizamos o **NVM**.

```bash
# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc

# Instalar versão mais recente do Node
nvm install node
nvm use node

# Instalar PM2 globalmente para gestão de processos
npm install -g pm2
```

---

## 2. Configuração do Frontend (Next.js)

O Frontend é gerido pelo PM2 para garantir alta disponibilidade e modo cluster.

1.  **Build do Projeto:**

    ```bash
    cd ~/source/sip/frontend
    npm install
    npm run build
    ```

2.  **Ficheiro `ecosystem.config.js`:**
    Crie o ficheiro na raiz do frontend:

    ```javascript
    module.exports = {
      apps: [
        {
          name: "sip-frontend",
          script: "node_modules/next/dist/bin/next",
          args: "start",
          instances: "max",
          exec_mode: "cluster",
          env: {
            NODE_ENV: "production",
            PORT: 3000,
          },
        },
      ],
    };
    ```

3.  **Iniciar:** `pm2 start ecosystem.config.js && pm2 save`

---

## 3. Configuração do Backend (Spring Boot 4)

O backend corre como um serviço nativo do sistema (`systemd`).

1.  **Ficheiro de Serviço:** `/etc/systemd/system/sip.service`

    ```ini
    [Unit]
    Description=SIP BACKEND API Spring Boot 4
    After=syslog.target network.target

    [Service]
    User=sgp2
    WorkingDirectory=/home/sgp2/source/sip/backend/
    ExecStart=/usr/bin/java -jar /home/sgp2/source/sip/backend/sip.jar
    SuccessExitStatus=143
    Restart=always
    RestartSec=10

    [Install]
    WantedBy=multi-user.target
    ```

2.  **Ativar Serviço:**
    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable sip.service
    sudo systemctl start sip.service
    ```

---

## 4. Servidor Web Nginx (Reverse Proxy)

O Nginx atua como porta de entrada, distribuindo o tráfego entre o Next.js e a API Java.

**Configuração em `/etc/nginx/sites-available/sip`:**

```nginx
server {
    listen 80;
    server_name 10.1.10.40; # IP do Servidor

    # Frontend Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }

    # API Backend & Swagger
    location ~ ^/(api|v3/api-docs|swagger-ui|swagger-resources) {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300s;
    }
}
```

---

## 🔍 Comandos de Monitorização

| Componente         | Comando de Log                          |
| :----------------- | :-------------------------------------- |
| **Nginx**          | `sudo tail -f /var/log/nginx/error.log` |
| **Frontend (PM2)** | `pm2 logs sip-frontend`                 |
| **Backend (Java)** | `journalctl -u sip.service -f`          |

## ⚠️ Notas de Resolução de Problemas

- **Erro libatomic:** Caso o Node não inicie, instale `sudo apt install libatomic1`.
- **Erro JSONB no H2:** O backend deve estar configurado para PostgreSQL em produção para suportar tipos `JSONB`. Se usar H2 para testes, ative o `MODE=PostgreSQL`.

---

Este ficheiro ajudará a manter o padrão do deploy se precisares de formatar o servidor ou escalar a aplicação. Sucesso com o **SIP**!

## Run all services

cd /home/sgp2/source/sip/frontend && docker start a15a75d9a545 && sudo systemctl restart sip.service && pm2 start ecosystem.config.js
