# 📱 App de Lista de Tarefas Plus

Uma aplicação móvel moderna e completa para gerenciamento de tarefas, desenvolvida com React Native e Expo. O app oferece autenticação segura, sincronização em tempo real, notificações push, temas personalizáveis e suporte a múltiplos idiomas.

## 🎥 Demonstração da Aplicação

Assista ao vídeo de demonstração do aplicativo em funcionamento:
**🔗 [Clique aqui para assistir no YouTube](https://youtu.be/pg5eGUuXSdE)**

## 🚀 Características Principais

- **Autenticação Completa**: Login/Cadastro com email/senha e integração com Google OAuth
- **Gerenciamento de Tarefas**: Criação, edição, marcação como concluída e visualização de tarefas
- **Sincronização em Tempo Real**: Dados sincronizados via Firebase Firestore
- **Notificações Push**: Lembretes automáticos para tarefas com vencimento
- **Temas Dinâmicos**: Modo claro e escuro com detecção automática do sistema
- **Internacionalização**: Suporte para Português (BR) e Inglês
- **Mensagens Motivacionais**: Frases inspiradoras diárias
- **Interface Moderna**: Design responsivo e intuitivo

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma de desenvolvimento e deploy
- **Expo Router** - Navegação baseada em arquivos
- **React Query (@tanstack/react-query)** - Gerenciamento de estado e cache
- **React i18next** - Internacionalização

### Backend & Serviços
- **Firebase Auth** - Autenticação de usuários
- **Firebase Firestore** - Banco de dados NoSQL em tempo real
- **Google OAuth** - Autenticação social
- **Expo Notifications** - Notificações push

### APIs Externas
- **ZenQuotes API** - Mensagens motivacionais

## 📋 Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **Expo CLI** instalado globalmente
- **Android Studio** (para desenvolvimento Android)
- **Xcode** (para desenvolvimento iOS - apenas macOS)
- Conta no **Firebase** configurada
- Conta no **Expo** (opcional, mas recomendado)

## ⚙️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/MariaEdPaixao/app-de-lista-tarefas-plus.git
cd app-de-lista-tarefas-plus
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative **Authentication** (Email/Password e Google)
3. Ative **Firestore Database**
4. Baixe os arquivos de configuração:
   - `google-services.json` (Android)
   - `GoogleService-Info.plist` (iOS)
5. Coloque os arquivos na raiz do projeto

### 4. Configuração do Google OAuth

1. Configure as credenciais OAuth no [Google Cloud Console](https://console.cloud.google.com/)
2. Atualize os IDs no arquivo `app/index.jsx`:
   - `expoClientId`
   - `iosClientId`
   - `androidClientId`
   - `webClientId`

### 5. Execute o projeto
```bash
npm start
# ou
expo start
```

## 📁 Estrutura do Projeto

```
app-de-lista-tarefas-plus/
├── app/                          # Páginas da aplicação (Expo Router)
│   ├── _layout.jsx              # Layout principal com providers
│   ├── index.jsx                # Tela de login
│   ├── CadastroScreen.jsx       # Tela de cadastro
│   └── HomeScreen.jsx           # Tela principal (lista de tarefas)
├── src/
│   ├── api/                     # Integrações com APIs externas
│   │   └── motivacional.js      # API de mensagens motivacionais
│   ├── components/              # Componentes reutilizáveis
│   │   ├── CreateTaskModal.jsx  # Modal de criação de tarefas
│   │   ├── TaskCard.jsx         # Card de tarefa
│   │   ├── ThemeToggleButton.jsx# Botão de alternância de tema
│   │   ├── LanguageToggleButton.jsx # Botão de mudança de idioma
│   │   ├── ToggleButtonsContainer.jsx # Container dos botões
│   │   └── SuccessModal.jsx     # Modal de sucesso
│   ├── context/                 # Contextos do React
│   │   ├── ThemeContext.jsx     # Gerenciamento de temas
│   │   └── LanguageContext.jsx  # Gerenciamento de idiomas
│   ├── locales/                 # Arquivos de tradução
│   │   ├── pt.json             # Traduções em português
│   │   └── en.json             # Traduções em inglês
│   └── services/               # Configurações de serviços
│       ├── firebaseConfig.jsx  # Configuração do Firebase
│       ├── i18n.ts            # Configuração do i18next
│       └── QueryClientProvider.jsx # Provider do React Query
├── assets/                     # Recursos estáticos
├── app.json                    # Configuração do Expo
├── package.json               # Dependências e scripts
└── README.md                  # Este arquivo
```

## 🎯 Funcionalidades Detalhadas

### Autenticação
- **Login com Email/Senha**: Validação segura via Firebase Auth
- **Cadastro de Usuários**: Criação de contas com validação
- **Login com Google**: Integração OAuth para acesso rápido
- **Recuperação de Senha**: Reset via email
- **Persistência de Sessão**: Usuário permanece logado

### Gerenciamento de Tarefas
- **Criar Tarefas**: Título, descrição e data de vencimento
- **Editar Status**: Marcar como concluída/pendente
- **Visualização**: Lista organizada com status visual
- **Sincronização**: Dados em tempo real via Firestore

### Notificações
- **Lembretes Automáticos**: Notificação para tarefas que vencem no dia
- **Permissões**: Solicitação automática de permissões
- **Background**: Funcionamento mesmo com app fechado

### Temas e Idiomas
- **Tema Claro/Escuro**: Alternância manual ou automática
- **Português/Inglês**: Mudança dinâmica de idioma
- **Persistência**: Configurações salvas localmente

## 📱 Como Usar

### 1. Primeiro Acesso
1. Abra o aplicativo
2. Faça login com sua conta ou cadastre-se
3. Permita notificações quando solicitado

### 2. Criando Tarefas
1. Na tela principal, toque em "Criar nova tarefa"
2. Preencha título, descrição e data
3. Toque em "Salvar"

### 3. Gerenciando Tarefas
- **Concluir**: Toque no botão verde (✔)
- **Reabrir**: Toque no botão vermelho (✗)
- **Visualizar**: Veja detalhes no card da tarefa

### 4. Configurações
- **Tema**: Use o botão no canto superior para alternar
- **Idioma**: Use o switch para mudar entre PT/EN
- **Logout**: Toque em "Sair da conta"

## 🔧 Scripts Disponíveis

```bash
# Iniciar o servidor de desenvolvimento
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar na web
npm run web
```

## 🧪 Build e Deploy

### Build de Desenvolvimento
```bash
expo build:android
expo build:ios
```

### Deploy via EAS (recomendado)
```bash
# Instalar EAS CLI
npm install -g @expo/eas-cli

# Login no Expo
eas login

# Build para Android
eas build --platform android

# Build para iOS
eas build --platform ios
```

## 🔐 Configurações de Segurança

### Firebase Security Rules (Firestore)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{document} {
      allow read, write: if request.auth != null 
        && request.auth.uid == resource.data.uid;
    }
  }
}
```

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=sua_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
```

## 🐛 Solução de Problemas

### Problemas Comuns

**Erro de autenticação Google**
- Verifique se os Client IDs estão corretos
- Confirme se o SHA-1 está configurado no Firebase (Android)

**Notificações não funcionam**
- Verifique se as permissões foram concedidas
- Teste em dispositivo físico (simuladores têm limitações)

**Build falha**
- Limpe o cache: `expo r -c`
- Verifique se todos os arquivos de configuração estão presentes

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é desenvolvido para fins educacionais como parte do curso da FIAP.

## 👥 Equipe

Desenvolvido com ❤️ pelo grupo Prisma da FIAP - 2º Ano

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma [issue](https://github.com/MariaEdPaixao/app-de-lista-tarefas-plus/issues)
---

**Versão**: 1.0.0  
**Última Atualização**: Setembro 2025
