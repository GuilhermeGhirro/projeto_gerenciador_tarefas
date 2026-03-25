import { Card, Table, Button, Modal, Form, Input, message, Empty, Spin } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useUsers, type User } from '../../hooks/useUsers'

export default function UsersManagement() {
  const { users, loading, error, add } = useUsers()
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const usersColumns = [
    {
      title: 'Código',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }
  ]

  const handleAddUser = async (values: User) => {
    try {
      setIsSubmitting(true)
      await add(values)
      message.success('Usuário criado com sucesso!')
      form.resetFields()
      setIsModalOpen(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (error) {
    return (
      <Card title="Gerenciamento de Usuários" style={{ margin: "20px" }}>
        <Empty description={`Erro: ${error}`} />
      </Card>
    )
  }

  return (
    <Card
      title="Gerenciamento de Usuários"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Novo Usuário
        </Button>
      }
      style={{ margin: "20px" }}
    >
      <Spin spinning={loading}>
        <Table
          columns={usersColumns}
          dataSource={users}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: 'Nenhum usuário encontrado' }}
        />
      </Spin>

      <Modal
        title="Adicionar Novo Usuário"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={() => {
          setIsModalOpen(false)
          form.resetFields()
        }}
        confirmLoading={isSubmitting}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddUser}
        >
          <Form.Item
            label="Nome"
            name="name"
            rules={[{ required: true, message: 'Nome é obrigatório' }]}
          >
            <Input placeholder="Nome do usuário" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Email é obrigatório' },
              { type: 'email', message: 'Email inválido' }
            ]}
          >
            <Input placeholder="email@example.com" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}
    