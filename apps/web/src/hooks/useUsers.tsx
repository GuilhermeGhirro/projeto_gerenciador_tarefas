import { useState, useEffect } from 'react'
import { message } from 'antd'
import { getUsers, createUser } from '../services/api'

export interface User {
  id?: number
  name: string
  email: string
  password?: string
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await getUsers()
      setUsers(data)
      setError(null)

      if (!data || data.length === 0) {
        message.info('Nenhum registro encontrado.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const add = async (user: Omit<User, 'id'>) => {
    try {
      await createUser(user)
      await loadUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar usuário')
      throw err
    }
  }

  return {
    users,
    loading,
    error,
    add,
    refresh: loadUsers
  }
}
