import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {ListItem, CheckBox} from 'react-native-elements';
import axios from 'axios';

function TodoScreen() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setTodoList(response.data);
      })
      .catch(error => error);
  }, []);

  const renderHeader = () => {
    return (
      <View style={styles.header_style}>
        <Text style={styles.textStyle}> Todo List </Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <ListItem
        key={item.id}
        title={item.title}
        bottomDivider={true}
        rightElement={
          <CheckBox
            key={item.id}
            title={item.completed ? 'Completed' : 'Incomplete'}
            checked={item.completed}
            onPress={() => {
              const elementsIndex = todoList.findIndex(
                element => element.id === item.id,
              );
              let newTodoList = [...todoList];
              newTodoList[elementsIndex] = {
                ...newTodoList[elementsIndex],
                completed: !newTodoList[elementsIndex].completed,
              };
              setTodoList(newTodoList);
            }}
          />
        }
      />
    );
  };

  return (
    <View>
      <FlatList
        data={todoList}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={item => renderItem(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header_style: {
    width: '100%',
    height: 45,
    backgroundColor: '#37cbba',
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    padding: 7,
  },
});
export default TodoScreen;
