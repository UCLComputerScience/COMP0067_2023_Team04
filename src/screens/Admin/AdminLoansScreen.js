import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const AdminLoansScreen = (props) => {

  const [text, setText] = useState('');

  const handleTextChange = (newText) => {
    setText(newText);
    props.onSearch(newText);
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        value={text}
        onChangeText={handleTextChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    padding: 10,
  },
});

export default AdminLoansScreen