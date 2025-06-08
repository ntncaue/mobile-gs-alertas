import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function EquipeForm({ onSubmit, initialData, loading, onCancel }) {
  const [nomeEquipe, setNomeEquipe] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [contato, setContato] = useState('');

  useEffect(() => {
    if (initialData) {
      setNomeEquipe(initialData.nomeEquipe || '');
      setResponsavel(initialData.responsavel || '');
      setContato(initialData.contato || '');
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!nomeEquipe || !responsavel || !contato) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    onSubmit({
      nomeEquipe,
      responsavel,
      contato,
    });
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Nome da Equipe</Text>
      <TextInput
        style={styles.input}
        value={nomeEquipe}
        onChangeText={setNomeEquipe}
        placeholder="Nome da equipe"
      />
      <Text style={styles.label}>Responsável</Text>
      <TextInput
        style={styles.input}
        value={responsavel}
        onChangeText={setResponsavel}
        placeholder="Responsável"
      />
      <Text style={styles.label}>Contato</Text>
      <TextInput
        style={styles.input}
        value={contato}
        onChangeText={setContato}
        placeholder="Contato"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.7}
        >
          <Text style={styles.saveButtonText}>{loading ? 'Salvando...' : 'Salvar'}</Text>
        </TouchableOpacity>
        {onCancel && (
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-undo-outline" size={24} color={colors.error} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  label: { fontWeight: 'bold', marginTop: 8, color: colors.onBackground },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
    color: colors.onSurface,
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 0,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: 'transparent',
    flex: 1,
    marginRight: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 0,
    shadowColor: 'transparent',
    elevation: 0,
  },
  saveButtonText: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 0,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'transparent',
    elevation: 0,
  },
  cancelButtonText: {
    color: colors.error,
    fontSize: 17,
    fontWeight: 'bold',
  },
}); 