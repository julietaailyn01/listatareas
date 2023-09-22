import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem, Icon, CheckBox } from 'react-native-elements';

const TaskListItem = ({ task, onPress }) => {
  const [completed, setCompleted] = useState(task.completed);

  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  const timeParts = task.time ? task.time.split(':') : null;
  let taskDate = null;

  if (timeParts) {
    taskDate = new Date();
    taskDate.setHours(parseInt(timeParts[0], 10));
    taskDate.setMinutes(parseInt(timeParts[1], 10));
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <ListItem
        containerStyle={styles.listItem}
        onPress={onPress}
      >
        <Icon name="event" type="material" color="#FFFFFF" />
        <ListItem.Content>
          <Text style={[styles.title, completed && styles.completedTitle]}>
            {task.title}
          </Text>
          <Text style={styles.subtitle}>
            {taskDate ? taskDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''}
          </Text>
        </ListItem.Content>
        <CheckBox
          checked={completed}
          onPress={toggleCompleted}
          checkedColor="#FFFFFF"
        />
      </ListItem>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 20, // Aumenta el margen a los costados
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  completedTitle: {
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  subtitle: {
    color: '#AAAAAA',
    fontSize: 14,
  },
});

export default TaskListItem;
