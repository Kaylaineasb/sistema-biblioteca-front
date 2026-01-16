# 📚 Biblioteca Web App (Frontend)

Aplicação Web desenvolvida em **Angular** para consumo da API de Biblioteca. Possui interface responsiva, painéis distintos para Administradores e Clientes, e feedback visual em tempo real.

## 🚀 Tecnologias Utilizadas

- **Angular 16+**
- **TypeScript**
- **SCSS** (Estilização modular)
- **RxJS** (Programação Reativa)
- **Guards & Interceptors** (Proteção de rotas e injeção de Token)

## 🖥️ Funcionalidades e Telas

### 👤 Área Pública
- **Login:** Autenticação segura.
- **Cadastro:** Registro de novos leitores.

### 🛡️ Painel do Administrador
- **Dashboard:** Cards com indicadores (KPIs) de atrasos e totais.
- **Gestão de Acervo:** Cadastro e exclusão de livros.
- **Controle de Empréstimos:** Tabela com status colorido (**ATIVO**, **DEVOLVIDO**, **ATRASADO**) e botão para realizar devolução.
- **Gestão de Usuários:** Listagem de clientes.

### 📖 Painel do Leitor (Cliente)
- **Home com Busca:** Pesquisa instantânea por Título, Autor ou ISBN.
- **Indicadores de Disponibilidade:** Etiquetas visuais ("🟢 Disponível" / "🔴 Indisponível") nos cards dos livros.
- **Minha Estante:** Visualização dos livros emprestados.
- **Renovação Online:** Botão para renovar o livro por +7 dias (se elegível).

## 🎨 Destaques de UX/UI
- **Feedback Visual:** Cores diferentes para status de empréstimo.
- **Filtros Inteligentes:** O formulário de empréstimo oculta automaticamente livros indisponíveis.
- **Tratamento de Erros:** Alertas amigáveis ao usuário (ex: "Limite de renovações atingido").

## 🛠️ Como Executar

1. Certifique-se de ter o **Node.js** e **Angular CLI** instalados.
2. Clone o repositório e instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash

ng serve
```

Acesse http://localhost:4200 no navegador.

Nota: É necessário que o Backend esteja rodando na porta 8080.

📂 Estrutura de Pastas

src/app/pages: Componentes de página (Home, Login, Listagens).

src/app/services: Comunicação HTTP com o Backend.

src/app/guards: Proteção de rotas (AdminGuard, AuthGuard).

src/app/models: Interfaces TypeScript (Tipagem forte).