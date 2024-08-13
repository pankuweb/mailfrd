import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const FilterScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setModalVisible(false);
  };

  const handleNextPress = () => {
    // Navigate to MessageTypeScreen
    navigation.navigate('MessageType');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Where to Send</Text>
      <Text style={styles.description}>
        Enter phone number or email to transfer the message.
      </Text>

      {selectedOption && (
        <TextInput
          style={styles.input}
          placeholder={
            selectedOption === 'Phone' ? 'Enter Phone Number' : 'Enter Email'
          }
          keyboardType={
            selectedOption === 'Phone' ? 'phone-pad' : 'email-address'
          }
          value={inputValue}
          onChangeText={setInputValue}
        />
      )}

      <TouchableOpacity style={styles.floatingButton} onPress={toggleModal}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Option</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleOptionSelect('Phone')}>
              <Text style={styles.modalButtonText}>Phone Number</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleOptionSelect('Email')}>
              <Text style={styles.modalButtonText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={toggleModal}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    flex: 1, // Ensure the container takes up the full screen height
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  floatingButton: {
    position: 'absolute',
    top: 200,
    alignSelf: 'center',
    backgroundColor: '#007bff',
    borderRadius: 50,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalCloseButton: {
    padding: 10,
    backgroundColor: '#6c757d',
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FilterScreen;
