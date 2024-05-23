import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const GargaloCalculator = () => {
  const [cpuUsage, setCpuUsage] = useState('');
  const [gpuUsage, setGpuUsage] = useState('');
  const [cpuSelected, setCpuSelected] = useState('');
  const [gpuSelected, setGpuSelected] = useState('');
  const [gameSelected, setGameSelected] = useState('');
  const [result, setResult] = useState(null);

  const cpuList = [
    'Intel Core i9', 'Intel Core i7', 'Intel Core i5', 'Intel Core i3', 
    'Intel Xeon', 'Intel Pentium', 'Intel Celeron', 'Intel Atom', 
    'AMD Ryzen 9', 'AMD Ryzen 7', 'AMD Ryzen 5', 'AMD Ryzen 3', 
    'AMD Threadripper', 'AMD Athlon', 'AMD FX', 'Apple M1', 
    'Qualcomm Snapdragon', 'ARM Cortex', 'NVIDIA Tegra', 
    'Samsung Exynos', 'IBM Power', 'MediaTek Helio', 
    'HiSilicon Kirin', 'Rockchip RK', 'Spreadtrum SC', 
    'Marvell Armada', 'Broadcom BCM', 'Allwinner A', 
    'Texas Instruments OMAP'
  ];
  
  const gpuList = ['NVIDIA GeForce RTX 3090', 'NVIDIA GeForce RTX 3080', 'AMD Radeon RX 6800 XT', 'AMD Radeon RX 6900 XT'];
  
  const gameList = [
    { name: 'GtaV', imageUrl: 'https://w7.pngwing.com/pngs/302/742/png-transparent-grand-theft-auto-v-grand-theft-auto-san-andreas-grand-theft-auto-iv-xbox-360-grand-theft-auto-online-others-emblem-logo-video-game.png' },
    { name: 'Cyberpunk 2077', imageUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/81a4e680815973.5cec6bcf6aa1a.jpg' },
    { name: 'Assassin\'s Creed Valhalla', imageUrl: 'https://i.pinimg.com/originals/7d/b1/5d/7db15d06e6a1ad5e9c1674f5798225e8.jpg' },
    { name: 'Call of Duty: Warzone', imageUrl: 'https://logowik.com/content/uploads/images/call-of-duty-warzone-black9435.logowik.com.webp' },
    { name: 'Fortnite', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png' },
    { name: 'Valorant', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/2560px-Valorant_logo_-_pink_color_version.svg.png' },
    { name: 'League of Legends', imageUrl: 'https://logosmarcas.net/wp-content/uploads/2020/11/League-of-Legends-Logo.png' },
    { name: 'Minecraft', imageUrl: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png' },
    { name: 'Genshin Impact', imageUrl: 'https://i.pinimg.com/originals/f4/1b/d5/f41bd52b3e9054798ed15822c448c18d.png' }
  ];

  const handleCalculatePress = () => {
    if (!cpuSelected || !gpuSelected || !gameSelected || !cpuUsage || !gpuUsage) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const cpuUsageValue = parseFloat(cpuUsage);
    const gpuUsageValue = parseFloat(gpuUsage);

    if (isNaN(cpuUsageValue) || isNaN(gpuUsageValue)) {
      Alert.alert('Erro', 'Por favor, insira valores numéricos válidos.');
      return;
    }

    const bottleneck = Math.abs(cpuUsageValue - gpuUsageValue) / 2;
    setResult(bottleneck);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}></Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Selecione o Processador:</Text>
        <Picker
          style={styles.picker}
          selectedValue={cpuSelected}
          onValueChange={(itemValue) => setCpuSelected(itemValue)}>
          <Picker.Item label="Selecione um processador" value="" />
          {cpuList.map((item, index) => (
            <Picker.Item label={item} value={item} key={index} />
          ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Selecione a Placa de Vídeo:</Text>
        <Picker
          style={styles.picker}
          selectedValue={gpuSelected}
          onValueChange={(itemValue) => setGpuSelected(itemValue)}>
          <Picker.Item label="Selecione uma placa de vídeo" value="" />
          {gpuList.map((item, index) => (
            <Picker.Item label={item} value={item} key={index} />
          ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Selecione o Jogo:</Text>
        <Picker
          style={styles.picker}
          selectedValue={gameSelected}
          onValueChange={(itemValue) => setGameSelected(itemValue)}>
          <Picker.Item label="Selecione um jogo" value="" />
          {gameList.map((item, index) => (
            <Picker.Item label={item.name} value={item.name} key={index} />
          ))}
        </Picker>
        {gameSelected ? (
          <View style={styles.gameImageContainer}>
            <Image source={{ uri: gameList.find(item => item.name === gameSelected).imageUrl }} style={styles.gameImage} />
          </View>
        ) : null}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Uso da CPU (%):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={cpuUsage}
          onChangeText={text => setCpuUsage(text)}
          editable={!!cpuSelected && !!gpuSelected && !!gameSelected}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Uso da GPU (%):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={gpuUsage}
          onChangeText={text => setGpuUsage(text)}
          editable={!!cpuSelected && !!gpuSelected && !!gameSelected}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, { opacity: (cpuSelected && gpuSelected && gameSelected) ? 1 : 0.5 }]}
        onPress={handleCalculatePress}
        disabled={!cpuSelected || !gpuSelected || !gameSelected}>
        <Text style={styles.buttonText}>Calcular Gargalo</Text>
      </TouchableOpacity>
      {result !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>O gargalo está em: {result}%</Text>
        </View>
      )}

      {/* Seção 1 */}
      <View style={styles.section}>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>BAIXO USO DE CPU E BAIXO USO DE GPU</Text>
        </View>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionText}>Em um cenário em que a CPU e a GPU exibem baixa utilização, isso indica uma carga de trabalho relativamente leve que não sobrecarrega muito o poder de processamento de nenhum dos componentes. Quando se trata de jogos, isso pode ocorrer durante jogos menos exigentes ou em situações em que as configurações gráficas são definidas em níveis mais baixos. A baixa utilização da CPU e da GPU sugere que o sistema possui amplos recursos disponíveis, o que pode resultar em uma jogabilidade mais suave e no potencial da CPU para lidar com tarefas adicionais em segundo plano sem causar problemas de desempenho.</Text>
        </View>
        <Image source={{ uri: 'https://pc-builds.com/image/static/utilizations/low-cpu_low-gpu.png' }} style={styles.image} />
      </View>

      {/* Seção 2 */}
      <View style={styles.section}>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>BAIXO USO DE CPU E USO MÁXIMO DE GPU</Text>
        </View>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionText}>Por outro lado, quando o uso da CPU é mínimo e o uso da GPU atinge 100%, isso sugere uma situação em que a carga de trabalho é predominantemente intensiva em gráficos. Isso indica que a GPU é efetivamente utilizada em seu potencial máximo, servindo como o componente dominante no manuseio da carga de trabalho. O baixo uso da CPU implica que o processador não está fortemente envolvido na tarefa ou programa específico, sugerindo potencialmente que é menos dependente do poder de processamento da CPU. No entanto, é importante notar que este cenário também pode indicar um gargalo da GPU no sistema, onde a placa de vídeo está sendo levada ao limite enquanto a CPU tem mais capacidade de sobra.</Text>
        </View>
        <Image source={{ uri: 'https://pc-builds.com/image/static/utilizations/low-cpu_max-gpu.png' }} style={styles.image} />
      </View>

      {/* Seção 3 */}
      <View style={styles.section}>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>ALTO USO DE CPU E USO MÁXIMO DE GPUU</Text>
        </View>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionText}>Quando o uso da CPU é significativamente alto e o uso da GPU atinge 100%, isso sugere uma situação em que a carga de trabalho depende muito da CPU para processamento. Embora a CPU esteja operando em alto nível, ela não está necessariamente em sua capacidade máxima, indicando que ainda há espaço para lidar com tarefas adicionais. Este cenário aponta para um sistema balanceado ou um leve gargalo da GPU, onde a placa de vídeo está operando em seu potencial máximo enquanto a CPU está lidando com a carga de trabalho de forma eficiente, mas não forçada ao seu limite.</Text>
        </View>
        <Image source={{ uri: 'https://pc-builds.com/image/static/utilizations/max-cpu_high-gpu.png' }} style={styles.image} />
      </View>

      {/* Seção 4 */}
      <View style={styles.section}>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>USO MÁXIMO DE CPU E BAIXO USO DE GPU</Text>
        </View>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionText}>Em um cenário em que o uso da CPU está em 100% e o uso da GPU é muito baixo, isso implica uma carga de trabalho que depende muito do poder de processamento da CPU, mas não requer processamento gráfico extensivo. Esse pode ser o caso de tarefas como cálculos de dados pesados ou certos aplicativos não gráficos. O baixo uso da GPU sugere que a placa gráfica não é totalmente utilizada nesta carga de trabalho específica, indicando um potencial gargalo da CPU em que a CPU está operando em sua capacidade máxima enquanto a GPU aguarda os dados da CPU para processar. Esse desequilíbrio entre a utilização da CPU e da GPU sugere que o desempenho do sistema pode ser limitado pelas capacidades de processamento da CPU.</Text>
        </View>
        <Image source={{ uri: 'https://pc-builds.com/image/static/utilizations/max-cpu_high-gpu.png' }} style={styles.image} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>USO MÁXIMO DE CPU E ALTO USO DE GPU</Text>
        </View>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionText}>Quando o uso da CPU está na capacidade máxima enquanto o uso da GPU permanece muito alto, isso sugere uma carga de trabalho que depende muito do poder computacional do processador. A CPU está operando em todo o seu potencial, lidando com cálculos e tarefas complexas. Enquanto isso, o alto uso da GPU indica que a placa gráfica também está contribuindo significativamente para a carga de trabalho, auxiliando na renderização de gráficos e fornecendo aprimoramentos visuais. Este cenário indica um sistema equilibrado ou um leve gargalo da CPU, onde a CPU está operando em seus limites enquanto a GPU está lidando com eficiência com os aspectos gráficos intensivos da carga de trabalho. O desempenho geral do sistema pode ser limitado pelas capacidades de processamento da CPU, mas a GPU está fazendo uma contribuição substancial para a carga de trabalho.</Text>
        </View>
        <Image source={{ uri: 'https://pc-builds.com/image/static/utilizations/max-cpu_max-gpu.png' }} style={styles.image} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>USO MÁXIMO DE CPU E USO MÁXIMO DE GPU</Text>
        </View>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionText}>Por fim, em um cenário em que o uso da CPU e da GPU está em 100%, isso sugere uma carga de trabalho que requer poder computacional substancial de ambos os componentes. Essa utilização equilibrada indica que a carga de trabalho é distribuída uniformemente entre a CPU e a GPU, com ambos os componentes trabalhando em sua capacidade total. É importante garantir que o sistema seja adequadamente resfriado e capaz de lidar com a alta utilização para evitar problemas de desempenho ou superaquecimento.</Text>
        </View>
        <Image source={{ uri: 'https://pc-builds.com/image/static/utilizations/max-cpu_max-gpu.png' }} style={styles.image} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>CONCLUSÃO!</Text>
        </View>
        <View style={styles.sectionBox}>
          <Text style={styles.sectionText}>É crucial considerar que uma diferença significativa nas utilizações de componentes pode indicar um possível gargalo ou simplesmente refletir a natureza da carga de trabalho, em que determinados jogos ou programas dependem mais de um componente do que de outro. Analisar esses padrões de utilização pode ajudar a identificar problemas de desempenho do sistema e otimizar as configurações de hardware de acordo.</Text>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 30,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gameImageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  gameImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  section: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionBox: {
    backgroundColor: '#e8e8e8',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red', // Cor vermelha para o título
  },
  sectionText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black', // Cor preta para o texto
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default GargaloCalculator;
