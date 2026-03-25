export interface Task {
  id?: number
  description: string
  hours: number
  startDate: Date
  endDate: Date
  statusId: TaskStatus
  name: string
  deleted?: number
}

export enum TaskStatus {
  FINALIZADO = 1,
  EM_ANDAMENTO = 2,
  AGUARDANDO = 3
}