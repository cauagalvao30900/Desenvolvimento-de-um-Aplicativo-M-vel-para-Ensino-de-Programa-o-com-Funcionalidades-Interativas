import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';

// Definindo dados de exemplo para categorias e produtos
const categories = [
  { id: 1, name: 'Placas de Vídeo', image: 'https://example.com/gpu.jpg' },
  { id: 2, name: 'Processadores', image: 'https://example.com/cpu.jpg' },
  { id: 3, name: 'Memórias RAM', image: 'https://example.com/ram.jpg' },
  // Adicione mais categorias conforme necessário
];

const products = [
  { id: 1, categoryId: 1, name: 'RTX 3080', price: 1499, image: 'https://example.com/rtx3080.jpg', url: 'https://www.example.com/product/rtx3080' },
  { id: 2, categoryId: 1, name: 'RX 6800 XT', price: 1299, image: 'https://example.com/rx6800xt.jpg', url: 'https://www.example.com/product/rx6800xt' },
  { id: 3, categoryId: 2, name: 'Intel Core i9-11900K', price: 599, image: 'https://example.com/i9.jpg', url: 'https://www.example.com/product/i9' },
  { id: 4, categoryId: 2, name: 'AMD Ryzen 9 5950X', price: 749, image: 'https://example.com/ryzen9.jpg', url: 'https://www.example.com/product/ryzen9' },
  // Adicione mais produtos conforme necessário
];

export default class Shop extends Component {
  renderCategoryButtons() {
    return categories.map(category => (
      <TouchableOpacity key={category.id} style={styles.categoryButton}>
        <Image source={{ uri: category.image }} style={styles.categoryImage} />
        <Text style={styles.categoryButtonText}>{category.name}</Text>
      </TouchableOpacity>
    ));
  }

  openProductUrl(url) {
    Linking.openURL(url);
  }

  renderProducts(categoryId) {
    const filteredProducts = products.filter(product => product.categoryId === categoryId);
    return filteredProducts.map(product => (
      <TouchableOpacity key={product.id} style={styles.productContainer} onPress={() => this.openProductUrl(product.url)}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Shop</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          {this.renderCategoryButtons()}
        </ScrollView>
        <ScrollView>
          {categories.map(category => (
            <View key={category.id}>
              <Text style={styles.categoryHeading}>{category.name}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScrollView}>
                {this.renderProducts(category.id)}
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 30,
    marginBottom: -80,
    textAlign: 'center',
  },
  categoryContainer: {
    marginHorizontal: 10,
  },
  categoryButton: {
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  categoryImage: {
    width: 150,
    height: 100,
    resizeMode: 'cover',
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
  },
  categoryHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  productScrollView: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  productContainer: {
    marginRight: 20,
    marginBottom: 10,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
