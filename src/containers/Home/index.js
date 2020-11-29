import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

const Home = () => {
  const [list, setList] = useState([]);
  const [task, setTask] = useState('');
  const [isEditItem, setIsEditItem] = useState(false);
  const [updateTaskId, setUpdateTaskId] = useState('');
  const renderItem = ({item}) => {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.task}>{item.name}</Text>
        {updateTaskId != item.id ? (
          <View style={styles.btnCon}>
            <TouchableOpacity activeOpacity={1} onPress={() => editTask(item)}>
              <Image
                style={styles.image}
                source={require('../../assets/icons/edit.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => deleteTask(item.id)}>
              <Image
                style={styles.deleteImage}
                source={require('../../assets/icons/delete.png')}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };
  const addTask = () => {
    if (task) {
      let prevData = list;
      prevData.push({id: prevData.length + 1, name: task});
      setList(prevData);
      setTask('');
    }
  };

  const deleteTask = (id) => {
    let prevData = [...list];
    prevData.splice(
      prevData.indexOf(prevData.find((data) => data.id === id)),
      1,
    );
    setList(prevData);
  };

  const editTask = (item) => {
    setTask(item.name);
    setUpdateTaskId(item.id);
    setIsEditItem(true);
  };

  const updateTodo = () => {
    if (task) {
      let prevData = list;
      let index = prevData.indexOf(
        prevData.find((data) => data.id === updateTaskId),
      );
      prevData[index].name = task;
      setList(prevData);
      setIsEditItem(false);
      setUpdateTaskId('');
      setTask('');
    }
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.textInputContainer}>
            <TextInput
              onChangeText={(text) => setTask(text)}
              style={styles.textInput}
              placeholder="Enter task here"
              value={task}
            />
          </View>
          {isEditItem ? (
            <TouchableOpacity activeOpacity={1} onPress={updateTodo}>
              <Image
                source={require('../../assets/icons/update.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={1} onPress={addTask}>
              <Image
                source={require('../../assets/icons/add.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{paddingBottom: 70}}
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
