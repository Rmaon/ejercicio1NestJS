// seed-questions.js
// Script de ejemplo para agregar preguntas a través de la API
// Ejecutar: node seed-questions.js

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Primero necesitas un token de administrador
const ADMIN_TOKEN = 'TU_TOKEN_ADMIN_AQUI';

const newQuestions = [
  {
    statement: '¿En qué año se fundó Google?',
    options: [
      { index: 0, text: '1996' },
      { index: 1, text: '1998' },
      { index: 2, text: '2000' },
      { index: 3, text: '2002' }
    ],
    answerIndex: 1,
    difficulty: 'medium'
  },
  {
    statement: '¿Cuál es el lenguaje de programación más usado para desarrollo web?',
    options: [
      { index: 0, text: 'Python' },
      { index: 1, text: 'Java' },
      { index: 2, text: 'JavaScript' },
      { index: 3, text: 'C++' }
    ],
    answerIndex: 2,
    difficulty: 'easy'
  },
  {
    statement: '¿Qué significa REST en el contexto de APIs?',
    options: [
      { index: 0, text: 'Representational State Transfer' },
      { index: 1, text: 'Remote Execution Service Technology' },
      { index: 2, text: 'Robust Enterprise Service Tool' },
      { index: 3, text: 'Resource Exchange Standard Transfer' }
    ],
    answerIndex: 0,
    difficulty: 'hard'
  },
  {
    statement: '¿Cuál es la capital de Japón?',
    options: [
      { index: 0, text: 'Tokio' },
      { index: 1, text: 'Osaka' },
      { index: 2, text: 'Kioto' },
      { index: 3, text: 'Nagoya' }
    ],
    answerIndex: 0,
    difficulty: 'easy'
  }
];

async function seedQuestions() {
  console.log('🌱 Comenzando a sembrar preguntas...\n');

  for (const question of newQuestions) {
    try {
      const response = await axios.post(
        `${BASE_URL}/questions`,
        question,
        {
          headers: {
            'Authorization': `Bearer ${ADMIN_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log(`✅ Pregunta creada: "${question.statement}"`);
      console.log(`   ID: ${response.data._id}`);
      console.log(`   Dificultad: ${response.data.difficulty}\n`);
    } catch (error) {
      console.error(`❌ Error al crear pregunta: "${question.statement}"`);
      if (error.response) {
        console.error(`   ${error.response.data.message}\n`);
      } else {
        console.error(`   ${error.message}\n`);
      }
    }
  }

  console.log('✨ Proceso completado!');
}

seedQuestions();
