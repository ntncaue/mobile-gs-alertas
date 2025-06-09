import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getAreas } from '../services/areaService';
import { colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function SensorForm({ onSubmit, initialData, loading, onCancel }) {
  const [tipoSensor, setTipoSensor] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [areaMonitoradaId, setAreaMonitoradaId] = useState(null);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    if (initialData) {
      setTipoSensor(initialData.tipoSensor || '');
      setUnidadeMedida(initialData.unidadeMedida || '');
      setLatitude(initialData.latitude ? String(initialData.latitude) : '');
      setLongitude(initialData.longitude ? String(initialData.longitude) : '');
      setAreaMonitoradaId(initialData.areaMonitoradaId != null ? String(initialData.areaMonitoradaId) : null);
    }
  }, [initialData]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await getAreas();
        const fetchedAreas = response.data.$values || response.data;
        setAreas(fetchedAreas);
        if (initialData && initialData.areaMonitoradaId != null) {
          setAreaMonitoradaId(String(initialData.areaMonitoradaId));
        } else if (fetchedAreas.length > 0) {
          setAreaMonitoradaId(String(fetchedAreas[0].idArea));
        }
      } catch (error) {
        console.error('Erro ao carregar áreas:', error);
        alert('Erro ao carregar áreas para o seletor.');
      }
    };
    fetchAreas();
  }, [initialData]);

  const handleSubmit = () => {
    if (!tipoSensor || !unidadeMedida || !latitude || !longitude) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const sensorData = {
      idSensor: initialData ? initialData.idSensor : 0,
      tipoSensor,
      unidadeMedida,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      areaMonitoradaId: areaMonitoradaId ? parseInt(areaMonitoradaId, 10) : null,
      leituras: []
    };

    console.log('SensorForm - Dados sendo enviados:', JSON.stringify(sensorData, null, 2));
    onSubmit(sensorData);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Tipo do Sensor</Text>
      <TextInput
        style={styles.input}
        value={tipoSensor}
        onChangeText={setTipoSensor}
        placeholder="Ex: Temperatura"
      />
      <Text style={styles.label}>Unidade de Medida</Text>
      <TextInput
        style={styles.input}
        value={unidadeMedida}
        onChangeText={setUnidadeMedida}
        placeholder="Ex: °C"
      />
      <Text style={styles.label}>Latitude</Text>
      <TextInput
        style={styles.input}
        value={latitude}
        onChangeText={setLatitude}
        placeholder="Latitude"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Longitude</Text>
      <TextInput
        style={styles.input}
        value={longitude}
        onChangeText={setLongitude}
        placeholder="Longitude"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Área Monitorada</Text>
      {areas.length > 0 ? (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={areaMonitoradaId}
            onValueChange={(itemValue) => setAreaMonitoradaId(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Nenhuma Área Selecionada" value={null} />
            {areas.map((area) => (
              <Picker.Item key={area.idArea} label={area.nomeArea} value={String(area.idArea)} />
            ))}
          </Picker>
        </View>
      ) : (
        <Text>Carregando áreas...</Text>
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