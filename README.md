# 💻 Frontend do Sistema Bancário

Parte visual do Sistema Bancário! É a interface que o usuário vê e usa para interagir com a [API do backend](link-para-o-repo-do-backend).

Criei com **React** para ser uma aplicação rápida, bonita e fácil de usar, tanto no computador quanto no celular.

---

### O que eu usei pra construir?

* **React** como a estrela principal para construir a tela.
* **Vite** para deixar o ambiente de desenvolvimento voando baixo. 🚀
* Para o visual, fui com **Tailwind CSS** e os componentes incríveis do **shadcn/ui**, que já vêm prontinhos e super acessíveis.
* Para a navegação entre as páginas, o **React Router DOM**.
* E o **Axios** para fazer a ponte e conversar com o nosso backend.

---

### O que dá pra fazer na prática?

Na interface, você consegue:

* ✅ Ver todas as contas em uma lista.
* ✅ Filtrar por nome, CPF ou tipo de conta.
* ✅ Criar novos clientes com um formulário inteligente que valida os dados na hora.
* ✅ Editar e visualizar os detalhes de quem já tá cadastrado.
* ✅ E, claro, excluir uma conta (com uma telinha de confirmação pra não fazer besteira!).

---

### Quer ver rodando na sua máquina?

É bem simples. Você só precisa do **Node.js** instalado.

1.  Primeiro, entre na pasta do projeto:
    ```bash
    cd frontend/sistema-bancario-frontend
    ```

2.  Instale as dependências (pode usar `pnpm` ou `npm`):
    ```bash
    pnpm install
    # ou se preferir:
    npm install
    ```

3.  **Atenção aqui:** Por padrão, o app vai tentar falar com a API em `http://localhost:5000`. Se o seu backend estiver rodando em outra porta, é só ajustar a URL no arquivo `src/lib/api.js`.

4.  Agora é só alegria, rode o comando para iniciar:
    ```bash
    pnpm run dev
    # ou
    npm run dev
    ```

Pronto! O sistema vai abrir no seu navegador, geralmente em `http://localhost:5173`.

---

### Um pouco mais sobre o código

Para quem gosta de detalhes, organizei o projeto de forma bem componentizada. A base são componentes reutilizáveis, como o `ContaCard` (o cartãozinho que mostra cada cliente) e o `ContaForm` (o formulário de criação/edição).

Para não deixar a lógica de acesso aos dados espalhada, criei um hook personalizado, o `useContas`, que centraliza toda a conversa com a API (buscar, criar, editar, etc.). Isso deixa as páginas bem mais limpas!

A parte visual foi feita com Tailwind e shadcn/ui, pensando sempre em uma interface agradável e que se adapta a qualquer tamanho de tela. Dei uma atenção especial também para a experiência do usuário (UX), com loadings e mensagens de feedback, e para a acessibilidade, para garantir que todo mundo consiga usar.

