# 📝 Aplicação de Controle de Tarefas

## 📖 Descrição

Esta aplicação web fullstack permite o gerenciamento de tarefas, oferecendo funcionalidades de criação, visualização, edição e exclusão de tarefas.  
Compartilhe suas tarefas com amigos e companheiros de trabalho — ideal para manter todos cientes dos próximos passos.

- **Front-end:** React + Vite  
- **Back-end:** Node.js + Prisma + MySQL  
- **Autenticação:** JWT  

---

## ✅ Funcionalidades

### 🔐 Autenticação de Usuário
- Registro e login de usuários  
- Autenticação baseada em JWT  

### 🗂️ Gerenciamento de Tarefas
- Criar, visualizar, editar e excluir tarefas  
- Cada tarefa possui:
  - Título  
  - Descrição  
  - Status (pendente, em andamento, concluída)  
  - Data de vencimento  
  - Lista de pessoas cadastradas no sistema com permissão de visualização  

### 📋 Listagem de Tarefas
- Exibir lista de tarefas do usuário  
- Filtragem por status  
- Ordenação por data de vencimento  

### 🔎 Detalhes da Tarefa
- Visualização completa de uma tarefa específica  

---

## 🚀 Acesso à aplicação

- **Front-end (Vite):** [http://localhost:5173](http://localhost:5173)  
- **Back-end (Swagger):** [http://localhost:3000/api](http://localhost:3000/api)  

> ⚠️ Certifique-se de que todos os serviços estejam rodando via Docker e que as tabelas do banco de dados tenham sido criadas antes de acessar.

---

## 🛠️ Pré-requisitos

- **Docker** e **Docker Compose** instalados na sua máquina  
- **Node.js** (opcional, caso queira rodar fora do Docker)

---

## 📦 Rodando a aplicação

1. Clone o repositório:

```bash
git clone https://github.com/viniciusmgaspar/taskManager.git
```

2. navegue até a pasta do projeto

```bash
cd taskManage
```

3. Rode o comando do docker compose para que os 3 recursos sejam criados

```bash
docker compose up --build -d
```

4. Acesse a aplicação
 - Link: [http://localhost:5173](http://localhost:5173)
 - Realize um cadastro antes do login
 - Após o login, você será direcionado à página principal, onde poderá gerenciar suas tarefas
 - Para que outros usuários possam visualizar suas tarefas, é necessário que seus e-mails estejam previamente cadastrados no sistema



# 🚧 Melhorias Futuras (TO DO)

Este documento lista as principais melhorias planejadas para a aplicação de controle de tarefas.  
Contribuições e novas sugestões são sempre bem-vindas! 🙌

---

## 🔹 Funcionalidades Planejadas

- Implementar **paginação** na listagem de tarefas  
- Adicionar **novos filtros** (por título e conteúdo da descrição)  
- Melhorar as **mensagens de erro** exibidas ao usuário  
- Implementar **edição de perfil** do usuário  
- Adicionar **confirmação antes da exclusão** de tarefas  
- Criar **notificações visuais** (toasts) para ações bem-sucedidas ou com erro  
- Desenvolver **tema dark/light** para personalização da interface  
- Implementação de **websockets** para atualizações em tempo real 
- Envio de **notificações por e-mail** sobre tarefas próximas do vencimento 
- **Remodelagem geral do layout da aplicação** para melhorar a experiência do usuário (UX/UI)