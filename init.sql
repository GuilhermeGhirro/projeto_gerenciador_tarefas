-- Criar tabelas
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  hours DECIMAL(10, 2),
  start_date DATE,
  end_date DATE,
  status_id INTEGER DEFAULT 3,
  deleted INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  deleted INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados de exemplo
INSERT INTO tasks (name, description, hours, start_date, end_date, status_id, deleted)
VALUES 
  ('Implementar API', 'Criar endpoints REST', 8, NOW(), NOW() + INTERVAL '3 days', 2, 0),
  ('Desenvolver Frontend', 'Interface React com Vite', 16, NOW(), NOW() + INTERVAL '5 days', 2, 0),
  ('Testes Unitários', 'Cobrir funções principais', 4, NOW() + INTERVAL '5 days', NOW() + INTERVAL '7 days', 3, 0);

INSERT INTO users (name, email)
VALUES 
  ('Admin', 'admin@taskflow.com'),
  ('User 1', 'user1@taskflow.com');
