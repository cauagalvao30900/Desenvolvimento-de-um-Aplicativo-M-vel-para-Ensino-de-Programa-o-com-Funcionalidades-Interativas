
          import React, { useState, useEffect } from 'react';
          import { StyleSheet, View, Text, SafeAreaView, FlatList, TextInput, TouchableOpacity } from 'react-native';
          import AsyncStorage from '@react-native-async-storage/async-storage';
          import { Ionicons } from '@expo/vector-icons';
          
          const FavoriteScreen = ({ navigation }) => {
            const [favorites, setFavorites] = useState([]);
            const [filteredFavorites, setFilteredFavorites] = useState([]);
            const [searchQuery, setSearchQuery] = useState('');
          
            useEffect(() => {
              const loadFavorites = async () => {
                try {
                  const savedFavorites = await AsyncStorage.getItem('favorites');
                  if (savedFavorites !== null) {
                    const favoriteIds = JSON.parse(savedFavorites);
          
                    const dummyData = [
                      //React//
                      { id: '1', title: 'Introdução ao React', code: 'import React from \'react\';\n\nfunction App() {\n  return (\n    <div>\n      <h1>Hello, world!</h1>\n    </div>\n  );\n}\n\nexport default App;' },
                      { id: '2', title: 'Renderizando com ReactDOM', code: 'import ReactDOM from \'react-dom\';\nimport App from \'./App\';\n\nReactDOM.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n  document.getElementById(\'root\')\n);' },
                      { id: '3', title: 'Componentes e Props', code: 'const Greeting = (props) => {\n  return <h1>Hello, {props.name}!</h1>;\n};\n\nconst App = () => {\n  return (\n    <div>\n      <Greeting name="World" />\n    </div>\n  );\n};' },
                      { id: '4', title: 'Estado (State)', code: 'import React, { useState } from \'react\';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Você clicou {count} vezes</p>\n      <button onClick={() => setCount(count + 1)}>Clique aqui</button>\n    </div>\n  );\n};' },
                      { id: '5', title: 'Componentes Funcionais vs. Classes', code: 'import React from \'react\';\n\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}\n\nclass Welcome extends React.Component {\n  render() {\n    return <h1>Hello, {this.props.name}</h1>;\n  }\n}' },
                      { id: '6', title: 'Lifecycle Methods', code: 'class Example extends React.Component {\n  componentDidMount() {\n    // Código executado após o componente ser montado\n  }\n\n  render() {\n    return <div>Example</div>;\n  }\n}' },
                      { id: '7', title: 'Hooks Personalizados', code: 'import { useState, useEffect } from \'react\';\n\nfunction useCustomHook() {\n  const [state, setState] = useState(null);\n\n  useEffect(() => {\n    // Lógica do hook\n  }, []);\n\n  return [state, setState];\n}' },
                      { id: '8', title: 'Context API', code: 'const MyContext = React.createContext();\n\nfunction App() {\n  return (\n    <MyContext.Provider value={{ /* dados */ }}>\n      <ChildComponent />\n    </MyContext.Provider>\n  );\n}' },
                      { id: '9', title: 'Erro Boundaries', code: 'class ErrorBoundary extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false };\n  }\n\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n\n  componentDidCatch(error, errorInfo) {\n    console.error(error, errorInfo);\n  }\n\n  render() {\n    if (this.state.hasError) {\n      return <h1>Something went wrong.</h1>;\n    }\n    return this.props.children;\n  }\n}' },
                      { id: '10', title: 'Memoization', code: 'const MemoizedComponent = React.memo(function Component(props) {\n  // Componente memoizado\n});' },
                      { id: '11', title: 'useCallback Hook', code: 'const memoizedCallback = useCallback(() => {\n  // Função memoizada\n}, [dependencies]);' },
                      { id: '12', title: 'useMemo Hook', code: 'const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);' },
                      { id: '13', title: 'useReducer Hook', code: 'const [state, dispatch] = useReducer(reducer, initialState);\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case \'increment\':\n      return { count: state.count + 1 };\n    default:\n      throw new Error();\n  }\n}' },
                      //php//
                      { id: '14', title: 'Variáveis', code: '<?php\n$nome = \'João\';\n$idade = 25;\necho "O valor de $nome é: $nome";\necho "O valor de $idade é: $idade";\n?>' },
                      { id: '15', title: 'Estruturas de Controle', code: '<?php\n$idade = 18;\nif ($idade >= 18) {\n  echo "Você é maior de idade.";\n} else {\n  echo "Você é menor de idade.";\n}\n?>'},
                      { id: '16', title: 'Loop',code: '<?php\necho "Contagem regressiva de 5:";\nfor ($i = 5; $i >= 1; $ia--) {\n  echo "$i ";\n}\n?>' },
                      { id: '17', title: 'HTML e CSS', code: '<style>\n  body { color: blue; }\n</style>' },
                      { id: '18', title: 'SEO Básico', code: '<meta name="description" content="This is a description.">' },
                      { id: '19', title: 'Tabulação', code: '<div style="padding: 20px;">Content</div>' },
                      { id: '20', title: 'Carregamento de Fontes', code: '<link rel="stylesheet" href="styles.css">' },
                      { id: '21', title: 'Favicon', code: '<link rel="icon" href="favicon.ico">' },
                      { id: '22', title: 'Redirecionamento', code: '<meta http-equiv="refresh" content="0;url=https://www.example.com">' },
                      { id: '23', title: 'Formulários e Validação', code: '<form onsubmit="return validateForm()"><input type="text" id="name" required></form>' },
                      { id: '24', title: 'Elementos de Mídia', code: '<iframe src="https://www.example.com"></iframe>' },
                      { id: '25', title: 'HTML e ARIA', code: '<div role="button" aria-pressed="false">Click me</div>' },
                      { id: '26', title: 'Hiperlinks Internos', code: '<a href="#section">Go to Section</a>' },
                      { id: '27', title: 'Tabulação de Texto', code: '<pre>\n  Text with tabulation\n</pre>' },
                      { id: '28', title: 'Estrutura de Documento', code: '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Title</title>\n</head>\n<body>\n</body>\n</html>' },
                      //SQL//
                      { id: '29', title: 'Listas Ordenadas', code: '<ol>\n  <li>First item</li>\n  <li>Second item</li>\n</ol>' },
                      { id: '30', title: 'Formulários e Tipos de Entrada', code: '<input type="text">\n<input type="password">' },
                      { id: '31', title: 'HTML e JavaScript Externo', code: '<script src="script.js"></script>' },
                      { id: '32', title: 'HTML e CSS Externo', code: '<link rel="stylesheet" href="styles.css">' },
                      { id: '33', title: 'Animações CSS', code: '<style>\n  @keyframes slide {\n    from { transform: translateX(-100%); }\n    to { transform: translateX(0); }\n  }\n  .animate {\n    animation: slide 1s;\n  }\n</style>' },
                      { id: '34', title: 'Media Queries', code: '<style>\n  @media (max-width: 600px) {\n    body { background-color: lightblue; }\n  }\n</style>' },
                      { id: '35', title: 'Formulários e Campos de Seleção', code: '<select>\n  <option value="1">Option 1</option>\n  <option value="2">Option 2</option>\n</select>' },
                      { id: '36', title: 'Campos de Pesquisa', code: '<input type="search" placeholder="Search...">' },
                      { id: '37', title: 'Cabeçalhos de Documento', code: '<header>\n  <h1>Document Header</h1>\n</header>' },
                      { id: '38', title: 'Footers de Documento', code: '<footer>\n  <p>Document Footer</p>\n</footer>' },
                      { id: '39', title: 'Tabela e Estilo', code: '<table style="width:100%;">\n  <tr>\n    <th>Header</th>\n    <th>Header</th>\n  </tr>\n  <tr>\n    <td>Data</td>\n    <td>Data</td>\n  </tr>\n</table>' },
                      { id: '40', title: 'Formulários e Botões', code: '<button type="button">Click me</button>' },
                      //HTMl//
                      { id: '41', title: 'Incorporando Fontes Web', code: '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap">' },
                      { id: '42', title: 'Uso de Fontes em CSS', code: '<style>\n  body { font-family: "Roboto", sans-serif; }\n</style>' },
                      { id: '43', title: 'Elementos de Navegação', code: '<nav>\n  <ul>\n    <li><a href="#">Home</a></li>\n    <li><a href="#">About</a></li>\n  </ul>\n</nav>' },
                      { id: '44', title: 'Formulários e Textareas', code: '<textarea rows="4" cols="50">Default text</textarea>' },
                      { id: '45', title: 'Imagens Responsivas', code: '<img src="image.jpg" style="max-width: 100%;" alt="Responsive Image">' },
                      { id: '46', title: 'Bordas e Margens', code: '<div style="border: 1px solid black; margin: 20px;">Content</div>' },
                      { id: '47', title: 'Classes e IDs', code: '<div class="class-name" id="unique-id">Content</div>' },
                      { id: '48', title: 'Espaçamento e Padding', code: '<div style="padding: 20px; margin: 10px;">Content</div>' },
                      { id: '49', title: 'Combinação de Estilos', code: '<style>\n  .combined { color: red; font-size: 20px; }\n</style>' },
                      { id: '50', title: 'Estilos em Linha', code: '<p style="color: blue;">This is blue text.</p>' },
                      { id: '51', title: 'Estilos de Fontes', code: '<style>\n  p { font-family: Arial, sans-serif; font-size: 16px; }\n</style>' },
                      { id: '52', title: 'Estilos de Texto', code: '<p style="font-weight: bold; text-align: center;">Bold Centered Text</p>' },
                      { id: '53', title: 'Propriedades de Layout', code: '<style>\n  .layout {\n    display: flex;\n    justify-content: space-between;\n  }\n</style>' },
                      { id: '54', title: 'Flexbox', code: '<style>\n  .container {\n    display: flex;\n    flex-direction: column;\n  }\n</style>' },
                      { id: '55', title: 'Grid Layout', code: '<style>\n  .grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n  }\n</style>' }
                    ];
          
                    const favoriteItems = dummyData.filter(item => favoriteIds.includes(item.id));
                    setFavorites(favoriteItems);
                    setFilteredFavorites(favoriteItems);
                  }
                } catch (error) {
                  console.error('Erro ao carregar favoritos:', error);
                }
              };
          
              loadFavorites();
            }, []);
          
            useEffect(() => {
              const filtered = favorites.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
              );
              setFilteredFavorites(filtered);
            }, [searchQuery, favorites]);
          
            const handleSearch = (text) => {
              setSearchQuery(text);
            };
          
            const renderItem = ({ item }) => {
              if (!item || !item.title || !item.code) {
                return null;
              }
          
              return (
                <View style={styles.itemContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.code}>{item.code}</Text>
                </View>
              );
            };
          
            const keyExtractor = (item) => item.id.toString();
          
            return (
              <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                  <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                  </TouchableOpacity>
                  <View style={styles.searchContainer}>
                    <TextInput
                      style={styles.searchBar}
                      placeholder="Buscar favoritos..."
                      placeholderTextColor="#999"
                      value={searchQuery}
                      onChangeText={handleSearch}
                    />
                  </View>
                </View>
                {filteredFavorites.length > 0 ? (
                  <FlatList
                    data={filteredFavorites}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                  />
                ) : (
                  <Text style={styles.emptyMessage}>Nenhum favorito encontrado.</Text>
                )}
              </SafeAreaView>
            );
          };
          
          const styles = StyleSheet.create({
            container: {
              flex: 1,
              backgroundColor: '#343434',
              paddingHorizontal: 20,
              paddingTop: 20,
            },
            header: {
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            },
            backButton: {
              marginRight: 10,
            },
            searchContainer: {
              flex: 1,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: '#00ffff',
            },
            searchBar: {
              height: 40,
              backgroundColor: '#1e1e1e',
              color: 'white',
              borderRadius: 20,
              paddingHorizontal: 10,
            },
            itemContainer: {
              marginBottom: 10,
              padding: 20,
              backgroundColor: '#1e1e1e',
              borderRadius: 10,
            },
            title: {
              fontSize: 18,
              fontWeight: 'bold',
              color: 'white',
            },
            code: {
              fontSize: 14,
              marginTop: 10,
              color: 'white',
              fontFamily: 'monospace',
            },
            emptyMessage: {
              fontSize: 16,
              color: '#999',
              textAlign: 'center',
              marginTop: 20,
            },
          });
          
          export default FavoriteScreen;
          