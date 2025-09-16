import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/services/firebaseConfig';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../src/context/ThemeContext';
import ThemeToggleButton from '../src/components/ThemeToggleButton'; // Importe o botão de toggle de tema

export default function CadastroScreen() {
  // Hook para acessar o contexto de tema
  const { colors } = useTheme();
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const router = useRouter(); // Hook para navegação

  // Função para criar o usuário
  const handleCadastro = () => {
    if (!nome || !email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
    createUserWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        router.push('/HomeScreen'); // Navega para a HomeScreen após o cadastro
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        Alert.alert("Erro", "Houve um problema ao criar sua conta.");
      });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Adicionando o botão de alternância de tema */}
      <ThemeToggleButton />

      <Text style={[styles.titulo, { color: colors.text }]}>Criar Conta</Text>

      {/* Campo Nome */}
      <TextInput
        style={[styles.input, { backgroundColor: colors.input, color: colors.inputText, borderColor: colors.text }]}
        placeholder="Nome completo"
        placeholderTextColor={colors.placeHolderTextColor}
        value={nome}
        onChangeText={setNome}
      />

      {/* Campo Email */}
      <TextInput
        style={[styles.input, { backgroundColor: colors.input, color: colors.inputText, borderColor: colors.text }]}
        placeholder="E-mail"
        placeholderTextColor={colors.placeHolderTextColor}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Campo Senha */}
      <TextInput
        style={[styles.input, { backgroundColor: colors.input, color: colors.inputText, borderColor: colors.text }]}
        placeholder="Senha"
        placeholderTextColor={colors.placeHolderTextColor}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* Botão de Cadastro */}
      <TouchableOpacity style={[styles.botao, { backgroundColor: colors.button }]} onPress={handleCadastro}>
        <Text style={[styles.textoBotao, { color: colors.buttonText }]}>Cadastrar</Text>
      </TouchableOpacity>

      <Link href="/" style={[styles.link, { color: colors.text }]}>Fazer login</Link>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
  },
  botao: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  }
});