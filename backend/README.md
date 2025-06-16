# Sistema Bancário - Backend

# 🏦 API de Sistema Bancário

Projeto de backend para simular um sistema bancário. A ideia era fazer uma API simples e funcional onde a gente pudesse cadastrar clientes, gerenciar contas e fazer as operações básicas de um banco (o famoso CRUD: criar, ler, atualizar e deletar).

---

### As ferramentas do projeto

Pra fazer ele, usei a stack que a gente já conhece e curte:

* **Node.js** com **Express** pra cuidar do servidor e das rotas.
* **MongoDB** como banco de dados NoSQL, porque é flexível e fácil de usar.
* **Mongoose** pra facilitar a vida na hora de modelar os dados e conversar com o banco.

Nada de muito complexo, só o feijão com arroz que funciona bem e resolve o problema! 😄

---

### Bora rodar isso aí? 🚀

Você só vai precisar ter o **Node.js** e o **MongoDB** instalados na sua máquina. Com tudo pronto, é só seguir os passos:

1.  Primeiro, clona o repositório e entra na pasta do projeto:
    ```bash
    cd backend
    ```

2.  Depois, instala as dependências que o projeto usa:
    ```bash
    npm install
    ```

3.  Agora a parte importante: cria um arquivo chamado `.env` na raiz da pasta. É lá que ficam as suas configurações de ambiente. Pra começar, pode usar isso aqui:
    ```
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/sistema-bancario
    ```

4.  Feito! Agora é só subir o servidor:
    ```bash
    # Se você for mexer no código, use o modo 'dev' que reinicia sozinho
    npm run dev

    # Se for só usar, pode rodar o start normal
    npm start
    ```

A API vai estar te esperando em `http://localhost:5000`.

---

### O que dá pra fazer com a API?

A URL principal é `/api/contas`. A partir dela, você pode:

* **`GET /`**: Listar todas as contas que estão cadastradas.
* **`GET /:id`**: Buscar uma conta específica usando o ID dela.
* **`POST /`**: Criar uma conta nova. É só mandar um JSON no corpo da requisição com os dados do cliente (nome, CPF, etc.).
* **`PUT /:id`**: Atualizar os dados de uma conta que já existe.
* **`DELETE /:id`**: Apagar uma conta do sistema.

**Exemplo rapidinho pra criar uma conta:**

Manda um `POST` para `/api/contas` com um corpo assim:

```json
{
  "nomeCliente": "Fulano de Tal",
  "cpf": "123.456.789-00",
  "email": "fulano@email.com"
}