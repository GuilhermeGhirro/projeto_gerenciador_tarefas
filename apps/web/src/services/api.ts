const API_URL = import.meta.env.VITE_API_URL || '/api'

export async function getTasks() {
  const response = await fetch(`${API_URL}/tasks`)
  if (!response.ok) throw new Error('Erro ao carregar tarefas')
  return response.json()
}

export async function createTask(task: {
  name: string
  description: string
  hours: number
  startDate: string
  endDate: string
  statusId: number
}) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  })
  if (!response.ok) throw new Error('Erro ao criar tarefa')
  return response.json()
}

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`)
  if (!response.ok) throw new Error('Erro ao carregar usuários')
  return response.json()
}

export async function createUser(user: {
  name: string
  email: string
  password?: string
}) {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
  if (!response.ok) throw new Error('Erro ao criar usuário')
  return response.json()
}
