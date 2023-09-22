import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskListItem from '../TaskListItem';

const HomeScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);
  const [showAllTasks, setShowAllTasks] = useState(false);

  useEffect(() => {
    loadTasks();
  }, [route.params]);

  useEffect(() => {
    if (route.params && route.params.deletedTask) {
      const updatedTasks = tasks.filter((task) => task.id !== route.params.deletedTask.id);
      setTasks(updatedTasks);
    }
  }, [route.params]);

  const handleTaskPress = (task) => {
    navigation.navigate('TaskDetail', { task });
  };

  const today = new Date().toLocaleDateString('en-GB'); // 'en-GB' representa el formato día/mes/año

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  };

  const filterTodayTasks = () => {
    const currentDate = new Date().toLocaleDateString(); // Obtiene la fecha actual como un objeto Date

    return tasks.filter((task) => {
      const taskDate = new Date(task.date); // Convierte la fecha de la tarea en un objeto Date
      return task.date === currentDate;
    });
  };

  const filterFutureTasks = () => {
    return tasks
      .filter((task) => {
        const taskDateParts = task.date.split('/');
        const taskYear = parseInt(taskDateParts[2]);
        const taskMonth = parseInt(taskDateParts[1]) - 1;
        const taskDay = parseInt(taskDateParts[0]);

        const taskDate = new Date(taskYear, taskMonth, taskDay);
        const todayDate = new Date();

        todayDate.setHours(0, 0, 0, 0);

        return taskDate >= todayDate;
      })
      .map((task) => ({
        id: task.id,
        date: task.date,
        task: task,
      }));
  };

  const groupedTasks = filterFutureTasks().reduce((groups, task) => {
    if (!groups[task.date]) {
      groups[task.date] = [];
    }
    groups[task.date].push(task.task);
    return groups;
  }, {});

  const toggleShowAllTasks = () => {
    setShowAllTasks(!showAllTasks);
  };

  const noTasksMessage = (
    <View style={styles.noTasksContainer}>
      <Icon name="bed" type="material-community" size={48} color="gray" />
      <Text style={styles.noTasksText}>No hay tareas programadas.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {showAllTasks ? 'Todas las tareas' : `Tareas para hoy (${today})`}
        </Text>
        <TouchableOpacity onPress={toggleShowAllTasks}>
          <Text style={styles.toggleText}>
            {showAllTasks ? 'Mostrar hoy' : 'Mostrar todas'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.taskListContainer}>
        {showAllTasks ? (
          <FlatList
            data={filterFutureTasks()}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TaskListItem task={item.task} onPress={() => handleTaskPress(item.task)} />
            )}
            ListEmptyComponent={noTasksMessage}
            style={styles.taskList}
          />
        ) : (
          <FlatList
            data={filterTodayTasks()}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TaskListItem task={item} onPress={() => handleTaskPress(item)} />
            )}
            ListEmptyComponent={noTasksMessage}
            style={styles.taskList}
          />
        )}
      </View>
      <Divider />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateTask')}
      >
        <Text style={styles.addButtonText}>Nueva Tarea</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Fondo oscuro
    paddingHorizontal: 0, // Eliminamos el espaciado horizontal
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20, // Espaciado desde la parte superior
    backgroundColor: '#333', // Color de fondo del encabezado
    paddingVertical: 10, // Espaciado vertical en el encabezado
    paddingHorizontal: 20, // Espaciado horizontal en los extremos del encabezado
  },
  headerText: {
    flex: 1, // Hacer que el texto del encabezado ocupe el espacio restante
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Texto blanco
  },
  toggleText: {
    fontSize: 16,
    color: '#2196F3', // Azul moderno
  },
  taskListContainer: {
    flex: 1, // Hacer que la lista de tareas llene el espacio disponible
    marginTop: 20, // Espaciado desde el encabezado
  },
  taskList: {
    marginVertical: 10, // Margen vertical
  },
  addButton: {
    backgroundColor: '#E91E63', // Rosa moderno
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 40,
    margin: 20, // Espaciado desde la parte inferior
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTasksText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default HomeScreen;