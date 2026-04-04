# 📝 Projeto Gerenciador de Tarefas

Sistema fullstack para gerenciamento de tarefas, desenvolvido para estudo e prática com NestJS e React.

---

## 🚀 Tecnologias

### Backend
- NestJS
- PostgreSQL
- Docker

### Frontend
- React
- Vite
- TypeScript

---

## 📦 Funcionalidades

- Criar tarefas
- Listar tarefas
- Atualizar tarefas
- Deletar tarefas (soft delete)

---

## ⚙️ Como rodar o projeto

### 1. Instalar dependências

npm install

---

### 2. Subir banco com Docker

docker-compose up -d

---

### 3. Iniciar backend

npm run start:api

---

### 4. Iniciar frontend

npm run start:web

---

## 🗄️ Banco de dados

- PostgreSQL rodando via Docker
- Script inicial disponível em:
  - `/docker-entrypoint-initdb.d/init.sql`

---

## 📌 Observações

Este projeto foi desenvolvido com foco em aprendizado de arquitetura backend utilizando NestJS, incluindo separação em camadas:

- Controller
- Service
- Repository

---

## 🧠 Aprendizados

- Uso de NestJS com arquitetura em camadas
- Integração com PostgreSQL via Docker
- Organização de monorepo

## 👨‍💻 Autor

Desenvolvido por Guilherme Ghirro