import { Layout, Menu } from 'antd'
import {
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useState } from 'react'
import UsersManagement from './components/users'
import TaskManagement from './components/tasks'

const { Header, Content } = Layout

function App() {
  const [page, setPage] = useState("dashboard")

  const taskManagementColumns = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'Dashboard'
    },
    {
      key: '2',
      icon: <UnorderedListOutlined />,
      label: 'Tarefas'
    },
    {
      key: '3',
      icon: <UserOutlined />,
      label: 'Usuários'
    }
  ]

  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[page]}
          items={taskManagementColumns}
          onClick={(e) => setPage(e.key)}
        />
      </Header>

      <Content style={{ padding: "20px" }}>

        {page === "1" && <h1>Dashboard</h1>}

        {page === "2" && <TaskManagement />}

        {page === "3" && <UsersManagement />}

      </Content>

    </Layout>
  )
}

export default App