zayeemmohd@Zayeems-MacBook-Pro repoMate % node lib/github-loader.js
[
  Document {
    pageContent: '# test-1\ncreating repo just for testing purposes\n',
    metadata: {
      source: 'README.md',
      repository: 'https://github.com/ZayeemMohd/taskflowAI',
      branch: 'main'
    },
    id: undefined
  },
  Document {
    pageContent: "const express = require('express');\n" +
      "const bcrypt = require('bcrypt');\n" +
      "const jwt = require('jsonwebtoken');\n" +
      "const { validateUser } = require('./utils');\n" +
      '\n' +
      'const router = express.Router();\n' +
      '\n' +
      "router.post('/register', async (req, res) => {\n" +
      '\n' +
      '});\n' +
      '\n' +
      "router.post('/login', async (req, res) => {\n" +
      '\n' +
      '});\n' +
      '\n' +
      'module.exports = router;\n',
    metadata: {
      source: 'auth.js',
      repository: 'https://github.com/ZayeemMohd/taskflowAI',
      branch: 'main'
    },
    id: undefined
  },
  Document {
    pageContent: '"this is my new file" \n',
    metadata: {
      source: 'new_file.txt',
      repository: 'https://github.com/ZayeemMohd/taskflowAI',
      branch: 'main'
    },
    id: undefined
  },
  Document {
    pageContent: '{\n' +
      '  "name": "taskflow-api",\n' +
      '  "version": "1.0.0",\n' +
      '  "description": "A simple task management API with JWT authentication",\n' +
      '  "main": "server.js",\n' +
      '  "scripts": {\n' +
      '    "start": "node server.js",\n' +
      '    "dev": "nodemon server.js"\n' +
      '  },\n' +
      '  "keywords": ["api", "tasks", "jwt", "express"],\n' +
      '  "author": "TaskFlow Team",\n' +
      '  "license": "MIT",\n' +
      '  "dependencies": {\n' +
      '    "express": "^4.18.2",\n' +
      '    "jsonwebtoken": "^9.0.2",\n' +
      '    "bcrypt": "^5.1.1",\n' +
      '    "dotenv": "^16.3.1"\n' +
      '  },\n' +
      '  "devDependencies": {\n' +
      '    "nodemon": "^3.0.1"\n' +
      '  }\n' +
      '}\n',
    metadata: {
      source: 'package.json',
      repository: 'https://github.com/ZayeemMohd/taskflowAI',
      branch: 'main'
    },
    id: undefined
  },
  Document {
    pageContent: 'This is my first product \n',
    metadata: {
      source: 'product.txt',
      repository: 'https://github.com/ZayeemMohd/taskflowAI',
      branch: 'main'
    },
    id: undefined
  },
  Document {
    pageContent: "const express = require('express');\n" +
      "const dotenv = require('dotenv');\n" +
      "const authRoutes = require('./auth');\n" +
      "const taskRoutes = require('./tasks');\n" +
      '\n' +
      'const app = express();\n' +
      'const PORT = process.env.PORT || 3000;\n' +
      'app.use(express.json());\n' +
      "app.use('/api/auth', authRoutes);\n" +
      "app.use('/api/tasks', taskRoutes);\n" +
      "app.get('/health', (req, res) => {\n" +
      "  res.json({ status: 'healthy', timestamp: new Date().toISOString() });\n" +
      '});\n' +
      'app.listen(PORT, () => {\n' +
      '  console.log(`🚀 TaskFlow API running on port ${PORT}`);\n' +
      '});\n' +
      '\n' +
      'module.exports = app;\n',
    metadata: {
      source: 'server.js',
      repository: 'https://github.com/ZayeemMohd/taskflowAI',
      branch: 'main'
    },
    id: undefined
  }
]