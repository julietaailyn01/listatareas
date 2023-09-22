import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Importa el componente DateTimePickerModal
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 

const CreateTask = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const navigation = useNavigation();

  const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setShowTimePicker(false);
  };

  const handleCreate = async () => {
    const today = new Date().toLocaleDateString();

    const newTask = {
      id: generateUniqueId(),
      title,
      date: selectedDate ? selectedDate.toLocaleDateString() : '',
      time: selectedTime ? selectedTime.toLocaleTimeString() : '',
      description,
    };

    onCreate(newTask);

    setTitle('');
    setDescription('');
    setSelectedDate(null);
    setSelectedTime(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text>
            <MaterialIcons name="keyboard-arrow-left" size={36} color="white" />
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crear Tarea</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tarea"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="gray" // Color del texto de marcador de posición
        />
        <TextInput
          style={styles.input}
          placeholder="Detalle"
          value={description}
          onChangeText={setDescription}
          multiline
          placeholderTextColor="gray" // Color del texto de marcador de posición
        />
      </View>
      <TouchableOpacity
        style={[styles.input, showDatePicker && styles.datePicker]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.inputText}>{selectedDate ? selectedDate.toLocaleDateString() : 'Seleccionar Fecha'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.input, showTimePicker && styles.timePickerContainer]}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={styles.inputText}>{selectedTime ? selectedTime.toLocaleTimeString() : 'Seleccionar Hora'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreate}
      >
        <Text style={styles.createButtonText}>Crear Tarea</Text>
      </TouchableOpacity>
      {/* Modal de selección de fecha */}
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleDateChange}
        onCancel={() => setShowDatePicker(false)}
      />
      {/* Modal de selección de hora */}
      <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        onConfirm={handleTimeChange}
        onCancel={() => setShowTimePicker(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingTop: 20,
    paddingBottom: 20, // Espacio en la parte inferior
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20, // Espacio entre el encabezado y los inputs
    justifyContent: 'space-between',
  },
  backButton: {},
  backButtonText: {
    color: 'white',
    fontSize: 24,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderRadius: 10,
    color: 'white',
    // backgroundColor: '#333',
    fontSize: 18,
  },
  inputText: {
    color: 'white',
  },
  datePicker: {
    position: "absolute",
    zIndex: 9999,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
  },
  timePickerContainer: {
    position: "absolute",
    zIndex: 9999,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
  },
  createButton: {
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40,
    marginVertical: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateTask;
