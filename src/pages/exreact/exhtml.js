import React, { useState } from 'react';
import { Text, View, TextInput, Button, ScrollView } from 'react-native';

function App() {
  const htmlExercises = [
    {
      id: 1,
      title: "Exercício 1",
      question: "Crie um elemento HTML para exibir um parágrafo com o texto 'Olá, mundo!'.",
      answer: "<p>Olá, mundo!</p>"
    },
    {
      id: 2,
      title: "Exercício 2",
      question: "Crie um elemento HTML para exibir uma lista ordenada com três itens: 'Item 1', 'Item 2' e 'Item 3'.",
      answer: "<ol><li>Item 1</li><li>Item 2</li><li>Item 3</li></ol>"
    },
    {
      id: 3,
      title: "Exercício 3",
      question: "Crie um elemento HTML para exibir uma lista não ordenada com três itens: 'Item A', 'Item B' e 'Item C'.",
      answer: "<ul><li>Item A</li><li>Item B</li><li>Item C</li></ul>"
    },
    {
      id: 4,
      title: "Exercício 4",
      question: "Crie um elemento HTML para exibir uma tabela com duas linhas e duas colunas. Na primeira linha, insira 'Nome' e 'Idade' como cabeçalhos da tabela. Na segunda linha, insira 'João' e '30' como dados da tabela.",
      answer: "<table><tr><th>Nome</th><th>Idade</th></tr><tr><td>João</td><td>30</td></tr></table>"
    },
    {
      id: 5,
      title: "Exercício 5",
      question: "Crie um elemento HTML para exibir um formulário com um campo de entrada de texto com a etiqueta 'Nome' e um botão de envio.",
      answer: "<form><label for='name'>Nome:</label><input type='text' id='name' name='name'><button type='submit'>Enviar</button></form>"
    }
  ];

  const [userAnswer, setUserAnswer] = useState('');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = () => {
    const correctAnswer = htmlExercises[currentExerciseIndex].answer.trim();
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
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Exercícios de HTML</Text>
      <ScrollView style={{ width: '80%' }}>
        {htmlExercises.map((exercise, index) => (
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
      <Button title="Próximo Exercício" onPress={nextExercise} disabled={feedback === '' || currentExerciseIndex === htmlExercises.length - 1} />
      {currentExerciseIndex === htmlExercises.length && <Button title="Reiniciar Exercícios" onPress={resetExercises} />}
    </View>
  );
}

export default App;
