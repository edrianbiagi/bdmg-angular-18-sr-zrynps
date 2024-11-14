# Angular E-commerce Application

Este projeto é uma aplicação de e-commerce construída em Angular. Ele permite aos usuários visualizar produtos, adicionar itens ao carrinho, realizar o checkout e visualizar pedidos. A aplicação é composta por vários componentes modulares e reutilizáveis, incluindo testes unitários para serviços críticos.

## Funcionalidades Principais

1. **Listagem de Produtos**: A página de produtos exibe todos os produtos disponíveis em um layout de grade. Cada produto possui um botão de "Adicionar ao Carrinho" que permite adicioná-lo ao carrinho.

2. **Detalhes do Produto**: Ao clicar em um produto, o usuário é direcionado para uma página de detalhes, onde pode visualizar informações completas do produto e adicioná-lo ao carrinho.

3. **Carrinho de Compras**: A página de carrinho permite ao usuário visualizar os itens adicionados. Também é exibido um badge de quantidade ao lado do botão de "Cart" na barra de navegação, atualizado automaticamente.

4. **Checkout**: A página de checkout permite ao usuário preencher suas informações pessoais e endereço. O sistema faz uma integração com a API ViaCEP para buscar o endereço automaticamente ao inserir o CEP.

5. **Finalização de Pedido**: Após preencher todos os campos obrigatórios e realizar o pedido, uma mensagem de confirmação é exibida em um modal.

6. **Listagem de Pedidos**: A aplicação também exibe uma lista de pedidos realizados, permitindo ao usuário visualizar o histórico de compras.

## Estrutura de Componentes

- **ProductListComponent**: Exibe a lista de produtos em um layout de grade. Inclui o botão de "Adicionar ao Carrinho" que utiliza o `CustomButtonComponent`.
- **ProductDetailsComponent**: Mostra os detalhes de um produto específico e permite adicioná-lo ao carrinho. Utiliza o `AddToCartModalComponent` para exibir uma mensagem de sucesso ao adicionar o item ao carrinho.
- **CartComponent**: Exibe os itens do carrinho, com a quantidade atualizada automaticamente. O botão de "Remover Tudo" limpa o carrinho, e o botão "Finalizar Compra" direciona para o checkout.
- **CheckoutComponent**: Contém um formulário para capturar as informações do cliente. Ao enviar o formulário, realiza uma integração com a API ViaCEP para preenchimento automático do endereço.
- **OrderListComponent**: Exibe a lista de pedidos já realizados.

## Serviços

- **ProductService**: Gerencia a obtenção dos dados dos produtos da API.
- **CartService**: Gerencia o estado do carrinho. Ele permite adicionar, remover e limpar itens do carrinho, e também atualiza o contador de itens exibido na barra de navegação.
- **OrderService**: Gerencia os pedidos realizados, incluindo a persistência no `localStorage` para manter os pedidos após o fechamento da aplicação.

## Componentes Compartilhados

- **AddToCartModalComponent**: Modal reutilizável que exibe uma mensagem de confirmação ao adicionar um produto ao carrinho ou realizar um pedido.
- **CustomButtonComponent**: Componente de botão personalizável utilizado em várias partes da aplicação para garantir uma interface consistente.

## Validação de Formulário no Checkout

- **Validação de Campos**: No formulário de checkout, todos os campos são obrigatórios. Caso algum campo esteja vazio ao tentar finalizar o pedido, uma mensagem de erro é exibida abaixo do campo correspondente.
- **Integração com API ViaCEP**: Ao inserir o CEP, o sistema busca automaticamente o endereço e preenche os campos de logradouro, bairro, localidade e UF.

## Testes Unitários

- **OrderService Test**: Foi criado um teste unitário para o `OrderService`, garantindo que a adição de pedidos e a persistência no `localStorage` estão funcionando corretamente.
  - **Testes Incluídos**:
    - Verificação de criação do serviço.
    - Adição de um pedido e recuperação dele.
    - Persistência de pedidos no `localStorage`.

## Como Executar o Projeto

### Pré-requisitos

- **Node.js**: Versão recomendada é a LTS.
- **Angular CLI**: Caso ainda não tenha o Angular CLI, instale-o globalmente usando:
  ```bash
  npm install -g @angular/cli
  ```
