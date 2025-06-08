import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getLeituras } from '../services/leituraService';
import { getEquipes } from '../services/equipeService';
import { colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function AlertaForm({ onSubmit, initialData, loading, onCancel }) {
  const [nivelPerigo, setNivelPerigo] = useState('');
  const [observacao, setObservacao] = useState('');
  const [leituraSensorId, setLeituraSensorId] = useState(null);
  const [equipeRespostaId, setEquipeRespostaId] = useState(null);
  const [leituras, setLeituras] = useState([]);
  const [equipes, setEquipes] = useState([]);

  useEffect(() => {
    if (initialData) {
      setNivelPerigo(initialData.nivelPerigo || '');
      setObservacao(initialData.observacao || '');
      setLeituraSensorId(initialData.leituraSensorId ? String(initialData.leituraSensorId) : null);
      setEquipeRespostaId(initialData.equipeRespostaId ? String(initialData.equipeRespostaId) : null);
    }
  }, [initialData]);

  useEffect(() => {
    const fetchLeiturasAndEquipes = async () => {
      try {
        // Carregar Leituras
        const leiturasResponse = await getLeituras();
        const fetchedLeituras = leiturasResponse.data.$values || leiturasResponse.data;
        setLeituras(fetchedLeituras);
        if (initialData && initialData.leituraSensorId != null) {
          setLeituraSensorId(String(initialData.leituraSensorId));
        } else if (fetchedLeituras.length > 0) {
          setLeituraSensorId(String(fetchedLeituras[0].idLeitura));
        }

        // Carregar Equipes de Resposta
        const equipesResponse = await getEquipes();
        const fetchedEquipes = equipesResponse.data.$values || equipesResponse.data;
        setEquipes(fetchedEquipes);
        if (initialData && initialData.equipeRespostaId != null) {
          setEquipeRespostaId(String(initialData.equipeRespostaId));
        } else if (fetchedEquipes.length > 0) {
          setEquipeRespostaId(String(fetchedEquipes[0].idEquipe));
        }
      } catch (error) {
        console.error('Erro ao carregar dados para o seletor (leituras ou equipes):', error);
        alert('Erro ao carregar dados para o seletor.');
      }
    };
    fetchLeiturasAndEquipes();
  }, [initialData]);

  const handleSubmit = () => {
    if (!nivelPerigo || !leituraSensorId || !equipeRespostaId) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const alertaData = {
      idAlerta: initialData ? initialData.idAlerta : 0,
      dataAlerta: new Date().toISOString(), // Data/hora atual automática
      nivelPerigo,
      observacao,
      leituraSensorId: parseInt(leituraSensorId, 10),
      equipeRespostaId: parseInt(equipeRespostaId, 10), // Adicionado novamente
    };

    console.log('AlertaForm - Dados sendo enviados:', JSON.stringify(alertaData, null, 2));
    onSubmit(alertaData);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Nível de Perigo</Text>
      <TextInput
        style={styles.input}
        value={nivelPerigo}
        onChangeText={setNivelPerigo}
        placeholder="Ex: Alto, Médio, Baixo"
      />

      <Text style={styles.label}>Observação</Text>
      <TextInput
        style={styles.input}
        value={observacao}
        onChangeText={setObservacao}
        placeholder="Observação"
      />

      <Text style={styles.label}>Leitura do Sensor</Text>
      {leituras.length > 0 ? (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={leituraSensorId}
            onValueChange={(itemValue) => setLeituraSensorId(itemValue)}
            style={styles.picker}
          >
            {leituras.map((leitura) => (
              <Picker.Item 
                key={leitura.idLeitura} 
                label={`Valor: ${leitura.valorMedicao} - Sensor: ${leitura.sensorId}`} 
                value={String(leitura.idLeitura)} 
              />
            ))}
          </Picker>
        </View>
      ) : (
        <Text>Carregando leituras...</Text>
      )}

      <Text style={styles.label}>Equipe de Resposta</Text>
      {equipes.length > 0 ? (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={equipeRespostaId}
            onValueChange={(itemValue) => setEquipeRespostaId(itemValue)}
            style={styles.picker}
          >
            {equipes.map((equipe) => (
              <Picker.Item 
                key={equipe.idEquipe} 
                label={equipe.nomeEquipe} 
                value={String(equipe.idEquipe)} 
              />
            ))}
          </Picker>
        </View>
      ) : (
        <Text>Carregando equipes...</Text>
      )}

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
  pickerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
    marginBottom: 20,
    backgroundColor: 'transparent',
    height: 70,
  },
  picker: {
    height: 70,
    width: '100%',
    color: colors.onSurface,
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