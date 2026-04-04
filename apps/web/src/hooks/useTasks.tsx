import { useState, useEffect } from 'react'
import { message } from 'antd'
import { getTasks, createTask, deleteTask } from '../services/api'

export interface Task {
  id?: number
  name: string
  description: string
  hours: number
  startDate: string
  endDate: string
  statusId: number
  deleted?: number
}

const STATUS_MAP: Record<number, string> = {
  1: 'Finalizado',
  2: 'Em Andamento',
  3: 'Aguardando'
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const data = await getTasks()
      setTasks(data)
      setError(null)

      if (!data || data.length === 0) {
        message.info('Nenhum registro encontrado.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  const add = async (task: Omit<Task, 'id'>) => {
    try {
      await createTask(task)
      await loadTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar tarefa')
      throw err
    }
  }

  const remove = async (id: number) => {
    try {
      await deleteTask(id)
      await loadTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar tarefa')
      throw err
    }
  }

  return {
    tasks: tasks.map(t => ({
      ...t,
      statusLabel: STATUS_MAP[t.statusId] || 'Desconhecido'
    })),
    loading,
    error,
    add,
    remove,
    refresh: loadTasks
  }
}
