# Sistema Bancário - Frontend

## Descrição
Interface web para sistema bancário desenvolvida com React. Permite gerenciar contas bancárias com operações CRUD completas através de uma interface moderna e responsiva.

## Tecnologias Utilizadas
- **React** - Biblioteca JavaScript para interfaces
- **React Router DOM** - Roteamento para SPA
- **Axios** - Cliente HTTP para requisições
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de interface
- **Lucide React** - Ícones
- **Vite** - Bundler e servidor de desenvolvimento

## Funcionalidades
- ✅ **Listagem de contas** com filtros e busca
- ✅ **Criação de novas contas** com validação
- ✅ **Edição de contas existentes**
- ✅ **Visualização detalhada** de contas
- ✅ **Exclusão de contas** com confirmação
- ✅ **Dashboard com estatísticas**
- ✅ **Interface responsiva** para desktop e mobile
- ✅ **Componentes reutilizáveis**
- ✅ **Gerenciamento de estado** com hooks
- ✅ **Tratamento de erros**

## Estrutura do Projeto
```
src/
├── components/
│   ├── ui/              # Componentes base do shadcn/ui
│   ├── ContaCard.jsx    # Card para exibir conta
│   ├── ContaForm.jsx    # Formulário de conta
│   └── ContaDetalhes.jsx # Modal de detalhes
├── hooks/
│   └── useContas.js     # Hook personalizado para API
├── lib/
│   └── api.js           # Configuração do Axios
├── pages/
│   ├── ListaContas.jsx  # Página principal
│   ├── NovaConta.jsx    # Página de criação
│   └── EditarConta.jsx  # Página de edição
├── App.jsx              # Componente principal
├── App.css              # Estilos globais
└── main.jsx             # Ponto de entrada
```

## Instalação e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou pnpm

### Passos para instalação
1. Navegue até a pasta do frontend:
```bash
cd frontend/sistema-bancario-frontend
```

2. Instale as dependências:
```bash
pnpm install
# ou
npm install
```

3. Configure a URL da API no arquivo `src/lib/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

4. Execute o servidor de desenvolvimento:
```bash
pnpm run dev
# ou
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Funcionalidades Detalhadas

### 1. Dashboard e Listagem
- **Estatísticas em tempo real**: Total de contas, saldo total, saldo médio, contas ativas
- **Filtros avançados**: Por nome, email, número da conta, status e tipo
- **Cards informativos**: Exibição clara dos dados principais de cada conta
- **Ações rápidas**: Visualizar, editar e excluir diretamente dos cards

### 2. Formulário de Conta
- **Validação em tempo real**: CPF, email, telefone com formatação automática
- **Campos obrigatórios**: Validação completa antes do envio
- **Upload de imagens**: URLs para foto, assinatura e documentos
- **Tipos de conta**: Corrente, poupança e salário
- **Status da conta**: Ativa, inativa ou bloqueada

### 3. Visualização Detalhada
- **Modal responsivo**: Exibição completa dos dados da conta
- **Documentos**: Visualização de assinatura digital e documentos
- **Informações do sistema**: Datas de criação e atualização
- **Layout organizado**: Seções bem definidas para melhor legibilidade

### 4. Navegação e UX
- **Roteamento SPA**: Navegação fluida sem recarregamento
- **Estados de loading**: Feedback visual durante operações
- **Mensagens de sucesso/erro**: Notificações claras para o usuário
- **Confirmações**: Dialogs de confirmação para ações destrutivas

## Componentes Principais

### ContaCard
Componente reutilizável para exibir informações resumidas de uma conta:
- Avatar com foto do cliente
- Badges para status e tipo da conta
- Informações de contato
- Saldo formatado em moeda brasileira
- Botões de ação (visualizar, editar, excluir)

### ContaForm
Formulário completo para criação e edição de contas:
- Validação de campos obrigatórios
- Formatação automática de CPF e telefone
- Upload de imagens via URL
- Estados de loading e erro
- Responsivo para diferentes tamanhos de tela

### ContaDetalhes
Modal para visualização completa dos dados:
- Layout organizado em seções
- Exibição de documentos e imagens
- Informações do sistema
- Design responsivo

## Hooks Personalizados

### useContas
Hook que encapsula toda a lógica de comunicação com a API:
- Estado global das contas
- Funções para CRUD (criar, ler, atualizar, excluir)
- Gerenciamento de loading e erros
- Recarregamento automático após operações

## Estilos e Design

### Tailwind CSS
- **Sistema de design consistente**: Cores, espaçamentos e tipografia
- **Responsividade**: Mobile-first com breakpoints bem definidos
- **Componentes reutilizáveis**: Classes utilitárias para manutenibilidade

### shadcn/ui
- **Componentes acessíveis**: Seguem padrões de acessibilidade
- **Tema customizável**: Variáveis CSS para cores e espaçamentos
- **Animações suaves**: Transições e micro-interações

## Tratamento de Erros
- **Interceptors do Axios**: Tratamento global de erros de API
- **Estados de erro**: Exibição de mensagens amigáveis
- **Fallbacks**: Comportamento gracioso em caso de falhas
- **Validação de formulários**: Feedback imediato para o usuário

## Performance
- **Lazy loading**: Carregamento sob demanda de componentes
- **Memoização**: Otimização de re-renderizações
- **Debounce**: Filtros com delay para reduzir requisições
- **Bundle otimizado**: Vite para build rápido e eficiente

## Responsividade
- **Mobile-first**: Design pensado primeiro para dispositivos móveis
- **Breakpoints**: sm, md, lg, xl para diferentes tamanhos
- **Grid adaptativo**: Layout que se ajusta automaticamente
- **Touch-friendly**: Botões e áreas de toque adequadas

## Acessibilidade
- **Semântica HTML**: Uso correto de tags e atributos
- **ARIA labels**: Descrições para leitores de tela
- **Contraste**: Cores que atendem padrões de acessibilidade
- **Navegação por teclado**: Suporte completo para navegação

## Scripts Disponíveis
- `pnpm run dev` - Servidor de desenvolvimento
- `pnpm run build` - Build para produção
- `pnpm run preview` - Preview do build de produção
- `pnpm run lint` - Verificação de código com ESLint

