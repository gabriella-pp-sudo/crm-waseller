# CRM Waseller

CRM integrado com WhatsApp via Waseller, construído com Next.js 14, Supabase e Tailwind CSS.

## Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Supabase** - Backend e banco de dados PostgreSQL
- **Tailwind CSS** - Estilização utilitária
- **Lucide React** - Ícones
- **date-fns** - Manipulação de datas

## Estrutura do Projeto

```
crm-waseller/
├── app/
│   ├── dashboard/
│   │   └── page.tsx       # Dashboard principal
│   ├── contacts/
│   │   └── page.tsx       # Página de contatos com busca e filtros
│   ├── globals.css         # Estilos globais (Tailwind)
│   ├── layout.tsx          # Layout raiz
│   └── page.tsx            # Redirect para dashboard
├── components/
│   ├── Sidebar.tsx         # Menu lateral de navegação
│   ├── ContactCard.tsx     # Card de exibição de contato
│   └── StatsBar.tsx        # Barra de estatísticas
├── lib/
│   └── supabase.ts         # Cliente Supabase
├── .env.example            # Exemplo de variáveis de ambiente
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/gabriella-pp-sudo/crm-waseller.git
cd crm-waseller
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env.local` e preencha com suas credenciais:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
```

### 4. Configure o banco de dados no Supabase

Execute no SQL Editor do Supabase:

```sql
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'converted', 'inactive')),
  last_message TEXT,
  last_contact TIMESTAMPTZ,
  tags TEXT[],
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5. Execute o projeto

```bash
npm run dev
```

Acesse em [http://localhost:3000](http://localhost:3000)

## Funcionalidades

- **Dashboard** - Visão geral com estatísticas e contatos recentes
- **Contatos** - Lista completa com busca por nome/telefone e filtro por status
- **Sidebar** - Navegação entre seções (Dashboard, Contatos, Conversas, Relatórios, Configurações)
- **Stats Bar** - Cards de métricas: total, ativos, pendentes e convertidos

## Status dos Contatos

| Status | Descrição |
|--------|-----------|
| `active` | Contato ativo em conversa |
| `pending` | Aguardando resposta ou ação |
| `converted` | Lead convertido em cliente |
| `inactive` | Sem interação recente |
