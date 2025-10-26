# FiscalManager Total (Cloud Edition) — Render Ready

Projeto fullstack pronto para **deploy automático**:
- **Backend** (Node + Express + TS) → **Render** (Web Service + PostgreSQL Free)
- **Frontend** (React + Vite) → **GitHub Pages**
- **Banco**: PostgreSQL **gerenciado pela Render** (gratuito)

### Deploy (1 clique via Blueprint)
1. Faça **fork** deste repositório para `GabrielLiuti/fiscalmanager-total`.
2. Acesse a Render e clique **New +** → **Blueprint** → selecione o repositório.
3. Confirme o deploy do **render.yaml** (ele cria **um Web Service** e **um banco PostgreSQL**).
4. Ao finalizar, a Render fornecerá uma URL pública, prevista como: `https://fiscalmanager-backend.onrender.com`
5. O **frontend** já está configurado para usar essa URL prevista. Se for diferente, edite `frontend/.env` e rode o workflow.

> Credenciais de demonstração (seed):
> - `admin@demo.com` / `123456`
