# Mobile GS Alertas - Aplicativo de Monitoramento

Este é um aplicativo móvel desenvolvido em React Native para o sistema de monitoramento de sensores e alertas de incêndio. Ele permite gerenciar:

- **Sensores:** Cadastrar e visualizar informações sobre os sensores.
- **Alertas:** Criar e acompanhar alertas de incêndio com base nas leituras dos sensores.
- **Áreas Monitoradas:** Definir e gerenciar as áreas geográficas que estão sendo monitoradas.
- **Equipes de Resposta:** Cadastrar e organizar as equipes responsáveis por responder aos alertas.
- **Leituras:** Registrar e visualizar as medições dos sensores.

## Tecnologias Utilizadas

- React Native
- Expo
- Axios para requisições HTTP
- @react-native-picker/picker para seletores
- @expo/vector-icons para ícones

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/en/download/) (versão LTS recomendada)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (gerenciador de pacotes do Node.js) ou [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (instalado globalmente):
  ```bash
  npm install -g expo-cli
  # ou
  yarn global add expo-cli
  ```

## Instalação

Siga os passos abaixo para configurar e rodar o projeto em sua máquina:

1.  **Clone o repositório** (se ainda não o fez, substitua `[URL_DO_SEU_REPOSITORIO]` pelo URL real):
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd [NOME_DA_PASTA_DO_REPOSITORIO]
    ```

2.  **Navegue até a pasta do aplicativo:**
    ```bash
    cd mobile-gs-alertas-app
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

## Como Rodar o Aplicativo

Dentro da pasta `mobile-gs-alertas-app`, execute o seguinte comando para iniciar o servidor de desenvolvimento do Expo:

```bash
npm start
# ou
yarn start
```

Após iniciar o servidor, você terá algumas opções:

-   Pressione `a` para abrir no emulador Android ou em um dispositivo Android conectado.
-   Pressione `i` para abrir no simulador iOS (macOS apenas) ou em um dispositivo iOS conectado.
-   Pressione `w` para abrir no navegador web.
-   Escaneie o código QR com o aplicativo Expo Go (disponível na App Store ou Google Play) para abrir em seu dispositivo físico.

Certifique-se de que sua API de backend esteja rodando e acessível pelo aplicativo para que todas as funcionalidades funcionem corretamente. 