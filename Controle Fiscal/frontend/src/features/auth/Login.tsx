import { useState } from 'react'
import axios from 'axios'
const API = import.meta.env.VITE_API_BASE_URL

export default function Login() {
  const [email, setEmail] = useState('admin@demo.com')
  const [senha, setSenha] = useState('123456')
  const [msg, setMsg] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${API}/auth/login`, { email, senha })
      localStorage.setItem('token', data.token)
      setMsg('Login OK')
    } catch (err: any) {
      setMsg(err?.response?.data?.error || 'Falha no login')
    }
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <h1>Login</h1>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      <input value={senha} onChange={e => setSenha(e.target.value)} type="password" placeholder="senha" />
      <button>Entrar</button>
      <div>{msg}</div>
    </form>
  )
}
