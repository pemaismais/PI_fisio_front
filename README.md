<div align="center">
  <img src="https://github.com/user-attachments/assets/996821ed-eed1-4338-a19e-4cff0b632282" alt="Imagem do Projeto" width="300">
</div>
<br>
O **PROJETO LER & DORT** tem como objetivo investigar as dores e desconfortos presentes entre professores do Ensino Médio, com foco em Lesões por Esforços Repetitivos (LER) e Distúrbios Osteomusculares Relacionados ao Trabalho (DORT). A solução proposta visa melhorar a saúde e o bem-estar dos professores por meio de recomendações personalizadas de exercícios para aliviar as dores.

Este é o frontend do sistema, desenvolvido com **Angular 17**, **Bootstrap** e **Angular Material**. O sistema comunica-se com a API backend para fornecer resultados e vídeos de exercícios personalizados com base nas regiões de dor e na intensidade informadas pelo usuário.

## Tecnologias Utilizadas

- **Angular 17**: Framework frontend para desenvolvimento dinâmico.
- **Bootstrap**: Framework CSS para criação de interfaces responsivas.
- **Angular Material**: Biblioteca de componentes UI modernos para Angular.
- **Google Login**: Autenticação com a conta Google.
- **Comunicação com Backend**: Consumo da API RESTful.
- **Guards de Rota**: Proteção de rotas para garantir que o usuário esteja autenticado.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte maneira:
```
├── compose/                # Configuração do Docker e Nginx  
├── script/                 # Scripts auxiliares  
├── src/  
│   ├── app/  
│   │   ├── components/     # Componentes da aplicação  
│   │   ├── guard/          # Guards de rota  
│   │   ├── models/         # Modelos de dados  
│   │   ├── services/       # Serviços de API  
│   ├── assets/             # Ícones e imagens  
│   ├── environments/       # Configuração de ambiente  
│   ├── main.ts             # Ponto de entrada Angular  
│   ├── styles.scss         # Estilos globais  
```

## Requisitos

- **Node.js**: Versão >= 16.x.x
- **Angular 17**: Para rodar o projeto Angular.
- **Google Client Secret e ID**: Necessário para configurar o login via Google.
- **Backend API**: A comunicação com a API RESTful backend é essencial para buscar e enviar dados do sistema.

## Instalação e Configuração

### 1. Clonar o Repositório

```bash
git clone https://github.com/pemaismais/PI_fisio_front
cd projeto-ler-e-dort-frontend
```
### 2. Instalar as Dependências

```bash
npm install
```

### 3. Configurar o Ambiente

Crie o arquivo `.env` com as variáveis de ambiente necessárias:
```bash
cp .env.example .env
```

No arquivo `.env`, defina os valores das seguintes variáveis:
```env
GOOGLE_SECRET_ID="google-secret-id"
GOOGLE_CLIENT_ID="google-client-id"
BACKEND_URL="backend-url"
```
- **GOOGLE_SECRET_ID**: O segredo do Google Client, necessário para o login com Google.
- **GOOGLE_CLIENT_ID**: O ID do Google Client, necessário para o login com Google.
- **BACKEND_URL**: A URL da API backend do projeto.
### 4. Rodar o Projeto

Execute o servidor de desenvolvimento com o seguinte comando:
```bash
ng serve
```

O aplicativo estará disponível em `http://localhost:4200`.
## Google Login

A autenticação será feita utilizando a conta Google do usuário. Para configurar a autenticação, é necessário registrar o projeto no Google Developer Console, criar um novo projeto e habilitar o **Google Sign-In API**. Após isso, obtenha o **Client ID** e o **Client Secret** para configurar no arquivo `.env`.
## Contato

Contribuições são bem-vindas! Se você tiver sugestões de melhorias ou correções, fique à vontade para abrir uma **issue** ou enviar um **pull request**.
---
## [Back-end desenvolvido em Java](https://github.com/pemaismais/Projeto_LerDort_backend)
