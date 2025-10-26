import { useEffect, useState } from 'react'
import axios from 'axios'
const API = import.meta.env.VITE_API_BASE_URL

export default function Notas() {
  const [empresaId, setEmpresaId] = useState('')
  const [notas, setNotas] = useState<any[]>([])
  const [files, setFiles] = useState<FileList | null>(null)
  const token = localStorage.getItem('token')

  const fetchNotas = async () => {
    const { data } = await axios.get(`${API}/notas`, { params: { empresaId } })
    setNotas(data)
  }

  const upload = async () => {
    if (!files || !empresaId) return
    const fd = new FormData()
    Array.from(files).forEach(f => fd.append('files', f))
    fd.append('empresaId', empresaId)
    await axios.post(`${API}/notas/import-xml`, fd, {
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchNotas()
  }

  useEffect(() => { fetchNotas() }, [])

  return (
    <div>
      <h1>Notas</h1>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input value={empresaId} onChange={e => setEmpresaId(e.target.value)} placeholder="empresaId" />
        <input type="file" multiple accept=".xml" onChange={e => setFiles(e.target.files)} />
        <button onClick={upload}>Importar XML</button>
      </div>
      <ul>
        {notas.map(n => <li key={n.id}>{n.id} — {n.chave}</li>)}
      </ul>
    </div>
  )
}
