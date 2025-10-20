# 📝 Aplicação de Controle de Tarefas

## Descrição

Esta aplicação web fullstack permite o gerenciamento de tarefas, oferecendo funcionalidades de criação, visualização, edição e exclusão de tarefas.  

- **Front-end:** React + Vite  
- **Back-end:** Node.js + Prisma + MySQL  
- **Autenticação:** JWT  

---

## ✅ Funcionalidades

### Autenticação de Usuário
- Registro e login de usuários
- Autenticação baseada em JWT

### Gerenciamento de Tarefas
- Criar, visualizar, editar e excluir tarefas
- Cada tarefa possui:
  - Título
  - Descrição
  - Status (pendente, em andamento, concluída)
  - Data de vencimento
  - Pessoas cadastradas no sistema que podem visualizar a tarefa

### Listagem de Tarefas
- Exibir lista de tarefas do usuário
- Filtragem por status
- Ordenação por data de vencimento

### Detalhes da Tarefa
- Visualização completa de uma tarefa específica

---

## 🚀 Acesso à aplicação

- **Front-end (Vite):** [http://localhost:5173](http://localhost:5173)  
- **Back-end (Swagger):** [http://localhost:3000/api](http://localhost:3000/api)  

> ⚠️ Certifique-se de que todos os serviços estão rodando via Docker antes de acessar.

---

## 🛠️ Pré-requisitos

- Docker e Docker Compose instalados na sua máquina
- Node.js (opcional, se quiser rodar fora do Docker)

---

## 📦 Rodando a aplicação

1. Clone o repositório:

```bash
git clone <link-do-repositorio>
cd <nome-do-projeto>
