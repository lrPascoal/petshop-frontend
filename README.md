# 🐾 PetShop - Frontend



## 🚀 Tecnologias Utilizadas

- **Angular 20.3.2:** Versão mais atual, utilizando componentes Standalone e Signals.
- **RxJS:** Gerenciamento de fluxos de dados assíncronos com Observables.
- **Angular Material:** Biblioteca de componentes de UI de alta fidelidade.
- **JSON Server:** API REST simulada para persistência de dados em arquivo `db.json`.
- **TypeScript:** Tipagem estrita para maior segurança no desenvolvimento.

## ✨ Funcionalidades Principais

### 🏠 Painel Administrativo (Admin)
- **Dashboard Reativo:** Cards com indicadores de faturamento e total de agendamentos atualizados via API.
- **Gestão de Agendamentos:** Modal interativo que permite visualizar detalhes e alterar o status do serviço em tempo real.
- **Ciclo de Atendimento:** Transição dinâmica de status: `Aguardando` ➔ `Em andamento` ➔ `Concluído`.
- **Filtro Automático:** Remoção inteligente de serviços concluídos da visão principal.

### 👤 Área do Tutor
- **Cadastro de Pets:** CRUD completo de animais com validação de formulários reativos.
- **Agendamento Inteligente:** Seleção de pets e serviços baseada em dados dinâmicos do servidor.

## 🛠️ Arquitetura e Boas Práticas

- **Clean Code:** Separação entre componentes (visão) e serviços (lógica de negócio).
- **Programação Reativa:** Uso extensivo do Pipe `async` para gerenciamento automático de subscrições.
- **Sincronização de Estado:** Comunicação entre componentes (Dashboard e Modal) via hooks de fechamento de diálogo.
- **HTTP Methods:** Implementação correta de verbos HTTP (`GET`, `POST`, `PATCH`, `DELETE`).



## 🔧 Como Executar o Projeto

1. **Clonar o repositório:**

Instalar as dependências:

Bash
npm install
Subir a API simulada (JSON Server):

Bash
npx json-server --watch db.json --port 3000
Rodar o Front-end:

Bash
ng serve
Acesse: http://localhost:4200

📈 Próximos Passos
[ ] Implementação de Autenticação JWT.

[ ] Migração do Backend para Java Spring Boot.

[ ] Implementação de Relatórios de Faturamento Mensal.


