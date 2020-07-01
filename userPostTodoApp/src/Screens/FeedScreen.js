import React, {useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Platform,
  TextInput,
  Keyboard,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {setPostsList, deletePostsList, createPostsList} from '../actions';
import axios from 'axios';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

function FeedScreen(props) {
  const [textInputValue, setTextInputValue] = useState('');
  let newPostObj = [];
  axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      newPostObj = [...response.data];
      newPostObj.map(post => {
        return props.userData.map(user => {
          if (post.userId === user.id) {
            post.name = user.name;
            post.photo = user.photo;
          }
          return post;
        });
      });
      props.setPostsList(response.data);
    })
    .catch(error => error);

  const getRandom = value => {
    return 1 + Math.floor(Math.random() * value);
  };

  const createPost = value => {
    const newPost = {
      body: value,
      title: value,
      userId: getRandom(10),
    };
    axios
      .post('https://jsonplaceholder.typicode.com/posts', newPost)
      .then(function(response) {
        setTextInputValue('');
        props.createPostsList(response.data);
      });
  };

  const renderHeader = () => {
    return (
      <View style={styles.header_style}>
        <TextInput
          placeholder="Create a Post"
          keyboardType={'default'}
          onBlur={Keyboard.dismiss}
          value={textInputValue}
          onChangeText={text => {
            setTextInputValue(text);
          }}
        />
        <Icon
          name={Platform.OS === 'ios' ? 'ios-send' : 'md-send'}
          size={20}
          style={styles.iconStyle}
          onPress={() => {
            if (textInputValue !== '') {
              createPost(textInputValue);
            }
          }}
        />
      </View>
    );
  };

  const deletePost = id => {
    props.deletePostsList(id);
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  };

  const renderItem = ({item}) => {
    return (
      <ListItem
        key={item.id}
        title={item.name}
        bottomDivider={true}
        subtitle={item.body}
        leftAvatar={{source: {uri: item.photo}}}
        rightIcon={{name: 'delete', onPress: () => deletePost(item.id)}}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={props.postsData}
        keyExtractor={item => item.id.toString()}
        renderItem={item => renderItem(item)}
        ListHeaderComponent={renderHeader}
        extraData={props.postsData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header_style: {
    flexDirection: 'row',
    width: '100%',
    height: 45,
    backgroundColor: '#37cbba',
  },
  textStyle: {
    textAlign: 'right',
    color: '#fff',
    fontSize: 18,
    padding: 7,
  },
  iconStyle: {
    marginLeft: 'auto',
    paddingTop: 10,
    paddingRight: 10,
  },
});

const mapStateToProps = state => {
  return {
    userData: state.userReducer.userData,
    postsData: state.postsReducer.postsData,
  };
};

const mapDispatchToProps = dispatch => ({
  setPostsList: post => dispatch(setPostsList(post)),
  deletePostsList: post => dispatch(deletePostsList(post)),
  createPostsList: post => dispatch(createPostsList(post)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedScreen);
