# 🚀 Como Rodar o Projeto - Guia Completo

## Pré-requisitos
- Node.js 20+ instalado
- Docker e Docker Compose instalados

---

## 1️⃣ Instalação de Dependências

```bash
npm install
```

---

## 2️⃣ Subir o Banco de Dados (PostgreSQL)

```bash
npm run docker:up
```

Aguarde um momento para o banco ser inicializado. As tabelas serão criadas automaticamente via `init.sql`.

**Credenciais:**
- User: `taskflow`
- Password: `taskflow`
- Database: `taskflow`
- Porta: **5433**

---

## 3️⃣ Rodar o Backend (NestJS)

Em um **novo terminal**:

```bash
npm start
```

O backend estará disponível em: **http://localhost:3001**

**Endpoints:**
- `GET /tasks` - Listar tarefas
- `POST /tasks` - Criar tarefa
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário

---

## 4️⃣ Rodar o Frontend (React + Vite)

Em um **novo terminal**:

```bash
npm run start:web
```

O frontend estará disponível em: **http://localhost:5173**

---

## 🎯 Fluxo Completo

### Terminal 1 - Banco
```bash
npm run docker:up
```

### Terminal 2 - Backend
```bash
npm start
```

### Terminal 3 - Frontend
```bash
npm run start:web
```

Agora acesse **http://localhost:5173** 🎉

---

## 💾 Inserir Dados

### Via Interface Web
1. Acesse http://localhost:5173
2. Clique em "Nova Tarefa" ou "Novo Usuário"
3. Preencha o formulário e envie

### Via cURL (Backend)

**Criar Tarefa:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Minha Tarefa",
    "description": "Descrição",
    "hours": 8,
    "startDate": "2026-03-16",
    "endDate": "2026-03-20",
    "statusId": 2
  }'
```

**Criar Usuário:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com"
  }'
```

**Listar Tarefas:**
```bash
curl http://localhost:3000/tasks
```

**Listar Usuários:**
```bash
curl http://localhost:3000/users
```

---

## 📋 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm start` | Inicia Backend (NestJS) |
| `npm run start:api` | Alias para start |
| `npm run start:web` | Inicia Frontend (React + Vite) |
| `npm run dev` | Alias para start:web |
| `npm run build` | Build de produção |
| `npm run docker:up` | Inicia PostgreSQL no Docker |
| `npm run docker:down` | Para PostgreSQL |
| `npm run lint` | Verifica erros de código |

---

## 🛑 Parar Tudo

```bash
# Stop Frontend e Backend (CTRL+C em cada terminal)

# Stop Banco de Dados
npm run docker:down
```

---

## 🔗 Status Check

| Serviço | URL | Status |
|---------|-----|--------|
| Frontend | http://localhost:5173 | ✅ |
| Backend | http://localhost:3001 | ✅ |
| Banco | localhost:5433 | ✅ |

---

## 🐛 Troubleshooting

### Backend não inicia
```bash
# Limpe node_modules e reinstale
rm -rf node_modules
npm install
npm start
```

### Porta 3000 já em uso
```bash
# Change em .env
API_PORT=3001
```

### Banco não conecta
```bash
# Verifique se está rodando
npm run docker:up

# Veja logs
docker-compose logs taskflow_db
```

### Frontend não conecta ao Backend
- Verifique se o Backend está rodando em http://localhost:3001
- Mude `VITE_API_URL` em `apps/web/.env.local` se necessário
