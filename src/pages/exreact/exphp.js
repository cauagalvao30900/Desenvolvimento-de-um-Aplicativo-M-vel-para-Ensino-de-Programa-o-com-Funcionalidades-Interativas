import React, { useState } from 'react';
import { Text, View, TextInput, Button, ScrollView } from 'react-native';

function App() {
  const exercises = [
    {
      id: 1,
      title: "Exercício 1",
      question: "Escreva um código PHP para exibir 'Olá, mundo!'",
      answer: "<?php echo 'Olá, mundo!'; ?>"
    },
    {
      id: 2,
      title: "Exercício 2",
      question: "Escreva um código PHP para criar uma variável chamada 'count' e inicializá-la com o valor 0.",
      answer: "<?php $count = 0; ?>"
    },
    {
      id: 3,
      title: "Exercício 3",
      question: "Escreva um código PHP para calcular a soma de dois números, 10 e 20, e exibir o resultado.",
      answer: "<?php echo 10 + 20; ?>"
    },
    {
      id: 4,
      title: "Exercício 4",
      question: "Escreva um código PHP para verificar se uma variável 'number' é maior que 5. Se for, exiba 'Maior que 5', caso contrário, exiba 'Menor ou igual a 5'.",
      answer: "<?php $number = 6; if ($number > 5) { echo 'Maior que 5'; } else { echo 'Menor ou igual a 5'; } ?>"
    },
    {
      id: 5,
      title: "Exercício 5",
      question: "Escreva um código PHP para criar um array chamado 'frutas' com os valores 'maçã', 'banana' e 'laranja', e exibir todos os elementos do array separados por vírgula.",
      answer: "<?php $frutas = ['maçã', 'banana', 'laranja']; echo implode(', ', $frutas); ?>"
    }
  ];

  const [userAnswer, setUserAnswer] = useState('');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = () => {
    const correctAnswer = exercises[currentExerciseIndex].answer.trim();
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
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Exercícios de PHP</Text>
      <ScrollView style={{ width: '80%' }}>
        {exercises.map((exercise, index) => (
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
      <Button title="Próximo Exercício" onPress={nextExercise} disabled={feedback === '' || currentExerciseIndex === exercises.length - 1} />
      {currentExerciseIndex === exercises.length && <Button title="Reiniciar Exercícios" onPress={resetExercises} />}
    </View>
  );
}

export default App;
