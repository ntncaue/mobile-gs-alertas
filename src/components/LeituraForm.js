import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getSensores } from '../services/sensorService';
import { colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function LeituraForm({ onSubmit, initialData, loading, onCancel }) {
  const [valorMedicao, setValorMedicao] = useState('');
  const [sensorId, setSensorId] = useState(null);
  const [sensores, setSensores] = useState([]);

  useEffect(() => {
    if (initialData) {
      setValorMedicao(initialData.valorMedicao ? String(initialData.valorMedicao) : '');
      setSensorId(initialData.sensorId ? String(initialData.sensorId) : null);
    }
  }, [initialData]);

  useEffect(() => {
    const fetchSensores = async () => {
      try {
        const response = await getSensores();
        const fetchedSensores = response.data.$values || response.data;
        setSensores(fetchedSensores);
        if (initialData && initialData.sensorId != null) {
          setSensorId(String(initialData.sensorId));
        } else if (fetchedSensores.length > 0) {
          setSensorId(String(fetchedSensores[0].idSensor));
        }
      } catch (error) {
        console.error('Erro ao carregar sensores:', error);
        alert('Erro ao carregar sensores para o seletor.');
      }
    };
    fetchSensores();
  }, [initialData]);

  const handleSubmit = () => {
    if (!valorMedicao || !sensorId) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const leituraData = {
      idLeitura: initialData ? initialData.idLeitura : 0,
      valorMedicao: parseFloat(valorMedicao),
      sensorId: parseInt(sensorId, 10),
    };

    console.log('LeituraForm - Dados sendo enviados:', JSON.stringify(leituraData, null, 2));
    onSubmit(leituraData);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Valor da Medição</Text>
      <TextInput
        style={styles.input}
        value={valorMedicao}
        onChangeText={setValorMedicao}
        placeholder="Valor"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Sensor</Text>
      {sensores.length > 0 ? (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sensorId}
            onValueChange={(itemValue) => setSensorId(itemValue)}
            style={styles.picker}
          >
            {sensores.map((sensor) => (
              <Picker.Item 
                key={sensor.idSensor} 
                label={`${sensor.tipoSensor} (${sensor.unidadeMedida})`} 
                value={String(sensor.idSensor)} 
              />
            ))}
          </Picker>
        </View>
      ) : (
        <Text>Carregando sensores...</Text>
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