import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function AreaForm({ onSubmit, initialData, loading, onCancel }) {
  const [nomeArea, setNomeArea] = useState('');
  const [latitudeCentro, setLatitudeCentro] = useState('');
  const [longitudeCentro, setLongitudeCentro] = useState('');
  const [raioKm, setRaioKm] = useState('');

  useEffect(() => {
    if (initialData) {
      setNomeArea(initialData.nomeArea || '');
      setLatitudeCentro(initialData.latitudeCentro ? String(initialData.latitudeCentro) : '');
      setLongitudeCentro(initialData.longitudeCentro ? String(initialData.longitudeCentro) : '');
      setRaioKm(initialData.raioKm ? String(initialData.raioKm) : '');
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!nomeArea || !latitudeCentro || !longitudeCentro || !raioKm) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    const areaData = {
      idArea: initialData ? initialData.idArea : 0,
      nomeArea,
      latitudeCentro: parseFloat(latitudeCentro),
      longitudeCentro: parseFloat(longitudeCentro),
      raioKm: parseFloat(raioKm),
    };
    console.log('AreaForm - Dados sendo enviados:', JSON.stringify(areaData, null, 2));
    onSubmit(areaData);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Nome da Área</Text>
      <TextInput
        style={styles.input}
        value={nomeArea}
        onChangeText={setNomeArea}
        placeholder="Nome da área"
      />
      <Text style={styles.label}>Latitude do Centro</Text>
      <TextInput
        style={styles.input}
        value={latitudeCentro}
        onChangeText={setLatitudeCentro}
        placeholder="Latitude"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Longitude do Centro</Text>
      <TextInput
        style={styles.input}
        value={longitudeCentro}
        onChangeText={setLongitudeCentro}
        placeholder="Longitude"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Raio (Km)</Text>
      <TextInput
        style={styles.input}
        value={raioKm}
        onChangeText={setRaioKm}
        placeholder="Raio em quilômetros"
        keyboardType="numeric"
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