import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FilterScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch items from AsyncStorage when the component mounts
    const fetchData = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('messageData');
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.log('Failed to load items: ', error);
      }
    };

    fetchData();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setModalVisible(false);
  };

  const handleNextPress = () => {
    if (selectedOption && inputValue) {
      // Navigate to MessageTypeScreen with params
      navigation.navigate('MessageType', {
        recipientType: selectedOption,
        recipientValue: inputValue,
      });
    } else {
      // Handle the case where either option or inputValue is missing
      alert('Please select an option and enter a value.');
    }
  };

  const deleteItem = async (index) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              // Remove the item from the state array
              const updatedItems = items.filter((_, i) => i !== index);
              setItems(updatedItems);

              // Update AsyncStorage
              await AsyncStorage.setItem('messageData', JSON.stringify(updatedItems));

              console.log('Item deleted successfully');
            } catch (error) {
              console.log('Failed to delete item: ', error);
            }
          },
        },
      ],
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.recipientType}</Text>
      <Text style={styles.cardValue}>{item.recipientValue}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(index)}
      >
        <Icon name="trash" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

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
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.cardList}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={toggleModal}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Option</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleOptionSelect('Phone')}
            >
              <Text style={styles.modalButtonText}>Phone Number</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleOptionSelect('Email')}
            >
              <Text style={styles.modalButtonText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={toggleModal}
            >
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
    flex: 1,
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
    bottom: 120,
    alignSelf: 'center',
    backgroundColor: '#007bff',
    borderRadius: 50,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
  cardList: {
    marginTop: 20,
    width: '100%',
  },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilterScreen;
