````md
# Desafio Live Code – Mini Backend de Tarefas

## Objetivo

Avaliar como você lida com **uma arquitetura Node.js já existente**, mantendo o padrão do projeto e respeitando a separação de responsabilidades.

Você recebeu um mini backend de tarefas em Node.js + Express, organizado em camadas:

- `Controllers`
- `Services`
- `Repositories`
- `Validators`
- `Models`
- `Enums`
- `Routes`
- `Mails`
- `Jobs`
- `Middleware`
- `Utils`

Algumas funcionalidades já estão prontas e você deverá implementar uma nova rota de forma consistente com o restante do código.

---

## Stack

- Node.js 20+ (recomendado)
- NPM 10+
- Express

> O projeto usa **armazenamento em memória** (arrays) para simplificar a execução: você não precisa configurar banco de dados.

---

## Como rodar o projeto

1. Instale as dependências:

```bash
npm install
````

2. Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
```

3. A API ficará disponível em:

```txt
http://localhost:3000
```

Rotas principais:

* `GET /` → healthcheck simples
* `GET /tasks` → lista tarefas do usuário autenticado
* `POST /tasks` → cria uma nova tarefa
* `PATCH /tasks/:id/complete` → **rota do desafio (você deve implementar)**

---

## Contexto da entidade `Task`

A entidade de tarefas (`Task`) possui, entre outros, os campos:

* `id`
* `titulo`
* `descricao`
* `status`

  * valores possíveis em `TaskStatusEnum`:

    * `PENDENTE`
    * `CONCLUIDA`
    * `CANCELADA`
* `userId` (dono da tarefa)
* `createdAt`
* `updatedAt`

O histórico de alterações (`TaskHistory`) registra eventos da tarefa, usando `TaskHistoryTypeEnum`:

* `CRIACAO`
* `CONCLUSAO`
* `CANCELAMENTO`

O usuário autenticado é simulado em `AuthMiddleware`:

```js
req.user = {
  id: 1,
  name: 'Usuário Demo',
  email: 'usuario.demo@example.com',
};
```

---

## Arquitetura (visão rápida)

* **Controllers** → recebem a requisição HTTP, chamam os Services e devolvem a resposta.
* **Services** → concentram a lógica de negócio e orquestram chamadas para Repositories, Mails, Jobs etc.
* **Repositories** → responsáveis por acessar e manipular os dados (no desafio, em memória).
* **Models** → representam as entidades (estrutura de dados).
* **Validators** → validam dados de entrada (params/body) antes de chegar nos Services.
* **Enums** → agrupam constantes (status, tipos de histórico).
* **Mails/Jobs** → simulações de envio de e-mail e registro de estatísticas.
* **Utils** → tratamento de erro (`HttpError`, `errorHandler`) e resposta (`ApiResponse`).
* **Middleware** → autenticação fake (`AuthMiddleware`).

---

## O que já está pronto

* Rota `GET /tasks`: lista tarefas do usuário atual.
* Rota `POST /tasks`: cria uma nova tarefa.
* Camadas:

  * Models `Task` / `TaskHistory`
  * Repositories `TaskRepository` / `TaskHistoryRepository`
  * Enums de status (`TaskStatusEnum`) e histórico (`TaskHistoryTypeEnum`)
  * Validator de criação (`TaskCreateValidator`)
  * Service de criação/listagem (`TaskService.create` e `TaskService.listByUser`)
  * Middleware de autenticação fake (`AuthMiddleware`)
  * Utilitários de erro (`HttpError`, `errorHandler`) e resposta (`ApiResponse`)
  * Simulações de e-mail (`TaskMail`) e job (`TaskStatsJob`).

A estrutura segue uma arquitetura em camadas semelhante a projetos reais em produção.

---

## O que você deve implementar

### Endpoint do desafio

```http
PATCH /tasks/:id/complete
Content-Type: application/json

{
  "notify": true
}
```

### Regras de negócio

Ao concluir uma tarefa:

1. **A tarefa deve existir**

   * Buscar pelo `TaskRepository`.
   * Se a tarefa não for encontrada, retornar **404**.

2. **A tarefa deve pertencer ao usuário autenticado**

   * Comparar `task.userId` com `req.user.id`.
   * Se forem diferentes, retornar **403**.

3. **Validação de status atual**

   * Se `status === CANCELADA` → retornar **400** (não é possível concluir tarefa cancelada).
   * Se `status === CONCLUIDA` → retornar **400** (tarefa já está concluída).

4. **Atualização**

   * Atualizar o status para `CONCLUIDA` usando `TaskStatusEnum`.
   * Persistir a alteração com `TaskRepository.save(task)`.

5. **Histórico**

   * Criar um registro em `TaskHistory` via `TaskHistoryRepository.create` com:

     * `taskId`
     * `tipo = TaskHistoryTypeEnum.CONCLUSAO`
     * `descricao` simples (ex.: `"Tarefa concluída"`).

6. **Notificação (opcional)**

   * Se `notify === true`:

     * Chamar `await TaskMail.sendTaskCompleted(user, task);`
     * Chamar `TaskStatsJob.registerCompletedTask(task);`

7. **Resposta**

   * Retornar **200** com a tarefa atualizada no corpo da resposta, usando o helper `ApiResponse.success`.

---

## Pontos que você precisa tocar no código

Você deve implementar a funcionalidade passando por **várias camadas** da aplicação:

1. **Validator**

   * Arquivo: `app/Validators/TaskCompleteValidator.js`
   * Método: `TaskCompleteValidator.validate(req)`
   * O que fazer:

     * Garantir que `req.params.id` é um número válido.
     * Se `notify` for enviado no body, garantir que é um booleano.
     * Em caso de erro, lançar `HttpError(400, '...')`.

2. **Service**

   * Arquivo: `app/Services/TaskService.js`
   * Método: `TaskService.complete({ taskId, user, notify })`
   * O que fazer:

     * Implementar **todas** as regras de negócio descritas acima.
     * Usar **apenas** os Repositories para acessar dados:

       * `TaskRepository`
       * `TaskHistoryRepository`
     * Integrar com `TaskStatusEnum`, `TaskHistoryTypeEnum`, `TaskMail`, `TaskStatsJob` e `HttpError`.

3. **Controller**

   * Arquivo: `app/Controllers/TaskController.js`
   * Método: `TaskController.complete(req, res, next)`
   * O que fazer:

     * Chamar `TaskCompleteValidator.validate(req)`.
     * Extrair `taskId` (`req.params.id`), `notify` (`req.body.notify`) e `user` (`req.user`).
     * Chamar `TaskService.complete({ taskId, user, notify })`.
     * Responder com `ApiResponse.success(res, tarefaAtualizada)`.

> A rota `PATCH /tasks/:id/complete` já está ligada ao controller em `app/Routes/TaskRoutes.js` e passa pelo `AuthMiddleware`.

---

## Exemplo de fluxo esperado

1. **Criar uma tarefa**:

```http
POST /tasks
Content-Type: application/json

{
  "titulo": "Estudar Node",
  "descricao": "Revisar arquitetura em camadas"
}
```

2. **Listar tarefas**:

```http
GET /tasks
```

3. **Concluir uma tarefa**:

```http
PATCH /tasks/1/complete
Content-Type: application/json

{
  "notify": true
}
```

**Resposta esperada (exemplo):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "titulo": "Estudar Node",
    "descricao": "Revisar arquitetura em camadas",
    "status": "CONCLUIDA",
    "userId": 1,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:05:00.000Z"
  }
}
```

---

## O que será avaliado

* Capacidade de **entender** e **respeitar** uma arquitetura já existente.
* Uso correto das camadas (Controller, Service, Repository, Validator, Model, Enums, Utils, Middleware).
* Qualidade e clareza do código.
* Tratamento de erros e respostas HTTP.
* Organização e raciocínio durante a live code.

Boa sorte! 🙂

```
```
