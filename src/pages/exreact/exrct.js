import React, { useState } from 'react';
import { Text, View, TextInput, Button, ScrollView } from 'react-native';

function App() {
  const exercises = [
    {
      id: 1,
      title: "Exercício 1",
      question: "Crie um componente de função em React chamado 'HelloWorld' que renderiza a mensagem 'Hello, world!'",
      answer: "<Text>Hello, world!</Text>"
    },
    {
      id: 2,
      title: "Exercício 2",
      question: "Converta a seguinte classe em um componente de função em React:\n\n```jsx\nimport React from 'react';\n\nclass Counter extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      count: 0\n    };\n  }\n\n  render() {\n    return (\n      <div>\n        <p>Count: {this.state.count}</p>\n        <button onClick={() => this.setState({ count: this.state.count + 1 })}>Increment</button>\n      </div>\n    );\n  }\n}\n```",
      answer: "<Text>function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <View>\n      <Text>Count: {count}</Text>\n      <Button title='Increment' onPress={() => setCount(count + 1)} />\n    </View>\n  );\n}</Text>"
    },
    {
      id: 3,
      title: "Exercício 3",
      question: "Terceira pergunta...",
      answer: "<Text>Resposta da terceira pergunta</Text>"
    },
    {
      id: 4,
      title: "Exercício 4",
      question: "Quarta pergunta...",
      answer: "<Text>Resposta da quarta pergunta</Text>"
    },
    {
      id: 5,
      title: "Exercício 5",
      question: "Quinta pergunta...",
      answer: "<Text>Resposta da quinta pergunta</Text>"
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
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Exercícios de React</Text>
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
