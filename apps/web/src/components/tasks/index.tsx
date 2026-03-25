import { Card, List, Tag, Button, Space, Empty, Spin, Form, Input, InputNumber, DatePicker, Select, message } from 'antd'
import { PlayCircleOutlined, PauseCircleOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useTasks, type Task } from '../../hooks/useTasks'
import dayjs from 'dayjs'

export default function TaskManagement() {
  const { tasks, loading, error, add } = useTasks()
  const [form] = Form.useForm()
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTask = async (values: Task) => {
    try {
      setIsSubmitting(true)
      await add({
        name: values.name,
        description: values.description,
        hours: values.hours,
        startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
        statusId: values.statusId
      })
      message.success('Tarefa criada com sucesso!')
      form.resetFields()
      setShowForm(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (error) {
    return (
      <Card title="Gerenciamento de Tarefas" style={{ margin: 20 }}>
        <Empty description={`Erro: ${error}`} />
      </Card>
    )
  }

  return (
    <Card
      title="Gerenciamento de Tarefas"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowForm(!showForm)}
        >
          Nova Tarefa
        </Button>
      }
      style={{ margin: 20 }}
    >
      {showForm && (
        <Card style={{ marginBottom: 20, backgroundColor: '#fafafa' }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddTask}
          >
            <Form.Item
              label="Nome"
              name="name"
              rules={[{ required: true, message: 'Nome é obrigatório' }]}
            >
              <Input placeholder="Nome da tarefa" />
            </Form.Item>

            <Form.Item
              label="Descrição"
              name="description"
              rules={[{ required: true, message: 'Descrição é obrigatória' }]}
            >
              <Input.TextArea placeholder="Descrição detalhada" rows={3} />
            </Form.Item>

            <Form.Item
              label="Horas"
              name="hours"
              rules={[{ required: true, message: 'Horas é obrigatório' }]}
            >
              <InputNumber min={0} placeholder="Horas da tarefa" />
            </Form.Item>

            <Form.Item
              label="Data de Início"
              name="startDate"
              rules={[{ required: true, message: 'Data de início é obrigatória' }]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
              label="Data de Término"
              name="endDate"
              rules={[{ required: true, message: 'Data de término é obrigatória' }]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
              label="Status"
              name="statusId"
              rules={[{ required: true, message: 'Status é obrigatório' }]}
            >
              <Select placeholder="Selecione o status">
                <Select.Option value={1}>Finalizado</Select.Option>
                <Select.Option value={2}>Em Andamento</Select.Option>
                <Select.Option value={3}>Aguardando</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Criar Tarefa
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}

      <Spin spinning={loading}>
        {tasks.length === 0 ? (
          <Empty description="Nenhuma tarefa encontrada" />
        ) : (
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={tasks}
            renderItem={(task) => (
              <List.Item>
                <Card
                  title={`#${task.id} - ${task.name}`}
                  extra={
                    <Tag
                      color={
                        task.statusId === 1
                          ? 'green'
                          : task.statusId === 2
                          ? 'blue'
                          : 'orange'
                      }
                    >
                      {task.statusLabel}
                    </Tag>
                  }
                >
                  <p><strong>Descrição:</strong> {task.description}</p>
                  <p><strong>Horas:</strong> {task.hours}h</p>
                  <p>
                    <strong>Período:</strong> {task.startDate} até {task.endDate}
                  </p>

                  <Space style={{ marginTop: 10 }}>
                    <Button type="primary" icon={<PlayCircleOutlined />}>
                      Play
                    </Button>
                    <Button icon={<PauseCircleOutlined />}>Pausar</Button>
                    <Button icon={<EditOutlined />}>Editar</Button>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        )}
      </Spin>
    </Card>
  )
}
