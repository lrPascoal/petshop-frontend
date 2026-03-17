# 🐾 PetShop System - Plataforma de Estética e Cuidados Pet

Solução digital completa para o gerenciamento de centros de estética canina e felina. O sistema automatiza o controle de serviços de banho, tosa, corte de unhas e tratamentos especializados, integrando a visão operacional do administrador à conveniência do tutor.

🔗 **Acesse o sistema em produção:** [https://petshop-front-inky.vercel.app/](https://petshop-front-inky.vercel.app/)

## 🚀 Tecnologias Utilizadas

- **Angular 18+:** Arquitetura moderna baseada em componentes Standalone e reatividade avançada.
- **Angular Material:** Interface de usuário (UI) profissional e componentes otimizados.
- **RxJS:** Gerenciamento de fluxos de dados e estado da aplicação.
- **JSON Server:** API REST simulada para persistência de dados (Hospedada para suporte ao deploy).
- **TypeScript:** Desenvolvimento robusto com tipagem estrita.

## ✨ Funcionalidades Principais

### 💼 Gestão Administrativa (Admin)
- **Dashboard Operacional:** Indicadores em tempo real com faturamento baseado em serviços concluídos e métricas de pets ativos na base.
- **Agenda por Turnos:** Organização visual dos atendimentos dividida por períodos (Manhã, Tarde e Noite).
- **Controle de Status:** Gestão total do fluxo de atendimento: `Aguardando` ➔ `Em andamento` ➔ `Concluído` / `Cancelado`.
- **Filtro Inteligente de Data:** Sincronização imediata da agenda para otimização do fluxo de trabalho diário.

### 🐶 Experiência do Tutor
- **Gestão de Pets:** Cadastro e gerenciamento completo de informações dos animais de estimação.
- **Agendamento Prático:** Interface intuitiva para marcação de serviços de estética (Banho, Tosa, Higiene).
- **Níveis de Acesso:** Sistema de permissões seguro que diferencia as funcionalidades entre Administradores e Tutores.

## 📱 Responsividade e UI/UX
- **Mobile First:** Interface totalmente adaptativa para Smartphones, Tablets e Desktops.
- **Feedback Visual:** Implementação de SnackBars para notificações, Spinners de carregamento e badges coloridos para status.
- **Navegação Inteligente:** Navbar responsiva que se ajusta dinamicamente conforme o perfil logado.

## 🛠️ Arquitetura e Engenharia de Software
- **Design Patterns:** Separação clara de responsabilidades (Services/Components).
- **Segurança:** Proteção de rotas via `Auth Guards` e persistência de sessão em `LocalStorage`.
- **Performance:** Prevenção de memory leaks com o uso do Pipe `async` e gerenciamento eficiente de subscrições RxJS.

## 🔧 Como Executar o Projeto Localmente

Siga os passos abaixo para rodar o ambiente de desenvolvimento em sua máquina:

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/lrPascoal/petshop-frontend.git](https://github.com/lrPascoal/petshop-frontend.git)

2. **Instalar dependências:**

Bash
npm install

3. **Configurar api:**

O projeto consome a API hospedada no Render por padrão. Para usar uma API local com json-server, rode:

Bash
npx json-server --watch db.json --port 3000

4. **Iniciar o Servidor de Desenvolvimento::**

Bash
ng serve
Acesse: http://localhost:4200