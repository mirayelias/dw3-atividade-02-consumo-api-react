# dw3-atividade-02-consumo-api-react

Atividade DW3 – 2º bimestre (Fatec Registro – DSM – Desenvolvimento Web III).

Aplicação em **React + Next.js** (App Router) que consome a [Rick and Morty API](https://rickandmortyapi.com/documentation), pública, aberta e sem autenticação, e exibe os personagens em formato de catálogo.

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Catálogo (cards com imagem, nome, status e espécie), com paginação. Cada card leva aos detalhes. |
| `/character/[id]` | Detalhes completos do personagem, buscados na API pelo identificador, com botão para voltar ao catálogo. |

## Endpoints usados

- Listagem: `GET https://rickandmortyapi.com/api/character?page={n}`
- Detalhe: `GET https://rickandmortyapi.com/api/character/{id}`

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Build de produção

```bash
npm run build
npm start
```
