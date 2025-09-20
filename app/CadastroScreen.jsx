import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/services/firebaseConfig';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../src/context/ThemeContext';
import ThemeToggleButton from '../src/components/ThemeToggleButton';
import { useLanguage } from '../src/context/LanguageContext';
import ToggleButtonsContainer from '../src/components/ToggleButtonsContainer';
import { useTranslation } from 'react-i18next';

export default function CadastroScreen() {

  const { colors } = useTheme();

  const { t } = useTranslation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const router = useRouter();

  const handleCadastro = () => {
    if (!nome || !email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
    createUserWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        router.push('/HomeScreen');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        Alert.alert("Erro", "Houve um problema ao criar sua conta.");
      });
  };

  return (
     <View style={[styles.container, { backgroundColor: colors.background }]}>
    
      <ToggleButtonsContainer />
      <Text style={[styles.titulo, { color: colors.text }]}>{t("register")}</Text>

      <TextInput
        style={[styles.input, { backgroundColor: colors.input, color: colors.inputText, borderColor: colors.text }]}
        placeholder={t("fullName")}
        placeholderTextColor={colors.placeHolderTextColor}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={[styles.input, { backgroundColor: colors.input, color: colors.inputText, borderColor: colors.text }]}
        placeholder="E-mail"
        placeholderTextColor={colors.placeHolderTextColor}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[styles.input, { backgroundColor: colors.input, color: colors.inputText, borderColor: colors.text }]}
        placeholder={t("password")}
        placeholderTextColor={colors.placeHolderTextColor}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={[styles.botao, { backgroundColor: colors.button }]} onPress={handleCadastro}>
        <Text style={[styles.textoBotao, { color: colors.buttonText }]}>{t("register")}</Text>
      </TouchableOpacity>

      <Link href="/" style={[styles.link, { color: colors.text }]}>{t("login")}</Link>
    </View>
  );
}

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