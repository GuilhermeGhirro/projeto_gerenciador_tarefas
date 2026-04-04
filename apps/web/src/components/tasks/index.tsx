import { Card, List, Tag, Button, Space, Empty, Spin, Form, Input, InputNumber, DatePicker, Select, message, Col, Row, Modal } from 'antd'
import { PlayCircleOutlined, PauseCircleOutlined, EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
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
      <Modal
        title="Nova Tarefa"
        open={showForm}
        onCancel={() => setShowForm(false)}
        footer={null}
        width={600}
      >
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

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Horas"
                name="hours"
                rules={[{ required: true, message: 'Horas é obrigatório' }]}
              >
                <InputNumber min={0} placeholder="Horas" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Data de Início"
                name="startDate"
                rules={[{ required: true, message: 'Data de início é obrigatória' }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Data de Término"
                name="endDate"
                rules={[{ required: true, message: 'Data de término é obrigatória' }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>

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
            <Space>
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Criar Tarefa
              </Button>
              <Button onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

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
                    <Space size="small">
                      <Button type="primary" icon={<PlayCircleOutlined />} size="small" />
                      <Button icon={<PauseCircleOutlined />} size="small" />
                      <Button icon={<EditOutlined />} size="small" />
                      <Button icon={<DeleteOutlined />} size="small" />
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
                    </Space>
                  }
                >
                  <Row gutter={[0, 12]}>
                    <Col span={24}>
                      <Tag color="default">
                        {task.description}
                      </Tag>
                    </Col>
                  </Row>

                  <Row gutter={[8, 0]}>
                    <Col>
                      <Tag color="default">{task.hours}h</Tag>
                    </Col>
                    <Col>
                      <Tag color="default">{task.startDate} → {task.endDate}</Tag>
                    </Col>
                  </Row>
                </Card>
              </List.Item>
            )}
          />
        )}
      </Spin>
    </Card>
  )
}
