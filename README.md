# React Client PokeAPI

## Rodando o projeto

```bash
git clone https://github.com/rafaelblink/react-client-pokeapi

cd react-client-pokeapi

yarn install && yarn start
```

## Rodando os testes E2E

Em uma janela do terminal

```bash
cd react-client-pokeapi
yarn start
```

Em outra janela

```bash
yarn cypress
```

Ao abrir a janela do CLI do cypress, clicar em "Run all specs".

## DEMO

https://pacific-springs-96260.herokuapp.com

## UX

Paleta de Cores

![Cores](/src/assets/img/palette.png 'Cores')

Sketch

![Sketch](/src/assets/img/sketch.jpg 'Cores')

<hr>

## Tecnologias

Decidi por utilizar a biblioteca React.

### CSS

Algumas técnicas utilizadas abaixo:

- Block Element Modifier(BEM) - Metodologia.
- SASS - Pré-processador.
- CSS Grid Layout Module.
- Não utilizei nenhum framework UI, foi tudo feito na mão.

### No React

Algumas considerações:

- Utilizei axios para as chamadas para a API.
- Promise.all para controlar as chamadas async.
- Não utilizei Hooks nem Redux pare controle de estados e side effects pois não foi necessário.
- Utilizei cypress para realizar testes E2E.

<hr>

## Considerações Finais

Apesar de não conhecer nada pokemon(pode me julgar), eu gostei muito de participar, você sempre aprende bastante com esses desafios.
