import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import axios from 'axios';
import {setUsersList} from '../actions';
import {connect} from 'react-redux';

const config = {
  headers: {
    'X-API_KEY': '8236d74b0c769c24abeba00f83decf',
  },
};

function UserScreen(props) {
  let newUserObj = [];
  axios
    .all([
      axios.get('https://jsonplaceholder.typicode.com/users'),
      axios.get('https://uifaces.co/api?limit=10', config),
    ])
    .then(
      axios.spread((firstResponse, secondResponse) => {
        if (
          firstResponse.data !== undefined &&
          secondResponse.data !== undefined
        ) {
          newUserObj = [...firstResponse.data];
          newUserObj.map((user, i) => {
            user.photo = secondResponse.data[i].photo;
          });

          props.setUsersList(newUserObj);
        }
      }),
    )
    .catch(error => console.log(error));

  const renderHeader = () => {
    return (
      <View style={styles.header_style}>
        <Text style={styles.textStyle}> User List </Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <ListItem
        key={item.id}
        title={item.name}
        bottomDivider={true}
        subtitle={item.email}
        leftAvatar={{source: {uri: item.photo}}}
        rightIcon={{name: 'call'}}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={props.userData}
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

const mapStateToProps = state => {
  return {
    userData: state.userReducer.userData,
  };
};

const mapDispatchToProps = dispatch => ({
  setUsersList: user => dispatch(setUsersList(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserScreen);
