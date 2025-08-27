# Rastro Pop Service

Uma API RESTful para gerenciamento de tarefas (to-do list) construída com Node.js e Express.

## 📋 Sobre o Projeto

O Rastro Pop Service é uma API backend que oferece operações CRUD completas para gerenciamento de tarefas. A aplicação utiliza validação de dados com Zod e está containerizada com Docker para facilitar o deployment.

## 🚀 Funcionalidades

- Criar novas tarefas
- Listar todas as tarefas
- Buscar tarefa específica por ID
- Atualizar tarefas existentes
- Deletar tarefas
- Validação de dados com Zod
- Containerização com Docker

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Zod** - Validação de schemas
- **Docker** - Containerização
- **ESLint** - Linting e padronização de código
- **Jest** - Framework de testes

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou pnpm

### Instalação Local

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd rastro-pop-service
```

2. Instale as dependências:
```bash
npm install
# ou
pnpm install
```

3. Inicie o servidor:
```bash
# Desenvolvimento (com watch)
npm run dev

# Produção
npm start
```

O servidor estará disponível em `http://localhost:3000`

### Docker

1. Build da imagem:
```bash
docker build -t rastro-pop-service .
```

2. Execute o container:
```bash
docker run -p 3000:3000 rastro-pop-service
```

Ou use o docker-compose:
```bash
docker-compose up
```

## 📡 API Endpoints

### Listar todas as tarefas
```http
GET /tasks
```

### Buscar tarefa por ID
```http
GET /tasks/:id
```

### Criar nova tarefa
```http
POST /tasks
Content-Type: application/json

{
  "title": "Título da tarefa (mínimo 6 caracteres)",
  "description": "Descrição da tarefa (mínimo 6 caracteres)"
}
```

### Atualizar tarefa
```http
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Novo título da tarefa",
  "description": "Nova descrição da tarefa"
}
```

### Deletar tarefa
```http
DELETE /tasks/:id
```

## 📋 Validação

A API utiliza Zod para validação dos dados de entrada:

- **title**: String com mínimo de 6 caracteres
- **description**: String com mínimo de 6 caracteres

## 🗂️ Estrutura do Projeto

```
rastro-pop-service/
├── src/
│   ├── controllers/
│   │   └── TaskController.js    # Controladores da API
│   ├── model/
│   │   └── TaskModel.js         # Modelo de dados
│   ├── routes/
│   │   ├── index.js             # Rotas principais
│   │   └── TasksRoute.js        # Rotas das tarefas
│   └── moduleAlias.js           # Configuração de alias
├── server.js                    # Arquivo principal do servidor
├── Dockerfile                   # Configuração Docker
├── docker-compose.yml           # Orquestração Docker
├── package.json                 # Dependências e scripts
└── README.md                    # Documentação
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento com watch
npm run dev

# Iniciar em produção
npm start

# Linting
npm run lint

# Corrigir problemas de linting
npm run lint:fix

# Executar testes
npm test
```

## 🧪 Testes

O projeto inclui testes unitários para o modelo de dados usando Jest.

Para executar os testes:
```bash
npm test
```

Os testes cobrem:
- Criação de tarefas
- Listagem de tarefas
- Busca por ID
- Atualização de tarefas
- Exclusão de tarefas

## ⚙️ Variáveis de Ambiente

- `PORT`: Porta do servidor (padrão: 3000)
- `HOST`: Host do servidor (padrão: 0.0.0.0)
