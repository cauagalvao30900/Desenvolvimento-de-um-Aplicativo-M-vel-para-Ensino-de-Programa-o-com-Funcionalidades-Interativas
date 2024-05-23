import React, { useState } from 'react';
import { Text, View, TextInput, Button, ScrollView } from 'react-native';

function App() {
  const sqlExercises = [
    {
      id: 1,
      title: "Exercício 1",
      question: "Escreva uma consulta SQL para selecionar todos os registros da tabela 'clientes'.",
      answer: "SELECT * FROM clientes;"
    },
    {
      id: 2,
      title: "Exercício 2",
      question: "Escreva uma consulta SQL para selecionar os campos 'nome' e 'email' da tabela 'clientes'.",
      answer: "SELECT nome, email FROM clientes;"
    },
    {
      id: 3,
      title: "Exercício 3",
      question: "Escreva uma consulta SQL para selecionar todos os registros da tabela 'pedidos' onde o 'valor' seja maior que 100.",
      answer: "SELECT * FROM pedidos WHERE valor > 100;"
    },
    {
      id: 4,
      title: "Exercício 4",
      question: "Escreva uma consulta SQL para selecionar todos os registros da tabela 'produtos' ordenados por 'preço' de forma decrescente.",
      answer: "SELECT * FROM produtos ORDER BY preço DESC;"
    },
    {
      id: 5,
      title: "Exercício 5",
      question: "Escreva uma consulta SQL para calcular a média de valores na coluna 'quantidade' da tabela 'estoque'.",
      answer: "SELECT AVG(quantidade) AS media_quantidade FROM estoque;"
    }
  ];

  const [userAnswer, setUserAnswer] = useState('');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = () => {
    const correctAnswer = sqlExercises[currentExerciseIndex].answer.trim();
    if (userAnswer.trim() === correctAnswer) {
      setFeedback('Resposta correta!');
      setIsCorrect(true);
    } else {
      setFeedback('Resposta incorreta. Tente novamente.');
      setIsCorrect(false);
    }
  };

  const nextExercise = () => {
    setFeedback('');
    setUserAnswer('');
    setIsCorrect(false);
    setCurrentExerciseIndex(currentExerciseIndex + 1);
  };

  const resetExercises = () => {
    setCurrentExerciseIndex(0);
    setFeedback('');
    setUserAnswer('');
    setIsCorrect(false);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginTop: 40 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Exercícios de SQL</Text>
      <ScrollView style={{ width: '80%' }}>
        {sqlExercises.map((exercise, index) => (
          <View key={index} style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 10 }}>{exercise.title}</Text>
            <View style={{ backgroundColor: '#f0f0f0', padding: 20, borderRadius: 5 }}>
              <Text style={{ fontSize: 18 }}>{exercise.question}</Text>
              <TextInput
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginTop: 10, marginBottom: 20 }}
                value={userAnswer}
                onChangeText={setUserAnswer}
                placeholder="Digite sua resposta aqui..."
              />
              <Button title="Verificar Resposta" onPress={checkAnswer} />
              {feedback !== '' && <Text style={{ color: isCorrect ? 'green' : 'red', marginTop: 10 }}>{feedback}</Text>}
            </View>
          </View>
        ))}
      </ScrollView>
      <Button title="Próximo Exercício" onPress={nextExercise} disabled={feedback === '' || currentExerciseIndex === sqlExercises.length - 1} />
      {currentExerciseIndex === sqlExercises.length && <Button title="Reiniciar Exercícios" onPress={resetExercises} />}
    </View>
  );
}

export default App;
