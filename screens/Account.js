import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import FooterMenu from '../components/Menus/FooterMenu'
import { AuthContext } from '../context/authContext'
import axios from 'axios'

const Account = () => {
  //global state
  const [state] = useContext(AuthContext)
  const { user, token } = state
  //local state
  const [name, setName] = useState(user?.name)
  const [password, setPassword] = useState(user?.password)
  const [email] = useState(user?.email)
  const [loading, setLoading] = useState(false)

  // handle update user data
  const handleUpdate = async() => {
    try{
      setLoading(true)
      const {data} = await axios.put('/auth/update-user',{
        name, 
        password, 
        email
      },
    )
      setLoading(false)
      let UD = JSON.stringify(data)
      setState({...state, user:UD?.updatedUser})
      alert(data && data.message)
    } catch(error) {
      alert(error.response.data.message)
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: 'center'}}>
          <Image
            source={
              // en el tutorial usa un uri para colocar la imagen de perfil
              require('../assets/userProfile.png')
            }
            style={{height: 200, width: 200, borderRadius: 100}}
          />
        </View>
        <Text style={styles.warningText}>Currently you can only update your name and password</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Name</Text>
          <TextInput 
            value={name} 
            style={styles.inputBox}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput 
            value={email} 
            style={styles.inputBox}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput 
            value={password} 
            style={styles.inputBox}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Role</Text>
          <TextInput 
            value={state?.user.role} 
            style={styles.inputBox}
            editable={false}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.updateBtnText}>
              {loading ? 'Please Wait' : 'Update Profile'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <FooterMenu/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
      justifyContent: 'space-between',
      marginTop: 40
    },
    warningText: {
      color: 'red',
      fontSize: 18,
      textAlign: 'center'
    },
    inputContainer: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputText: {
      fontWeight: 'bold',
      width: 70,
      color: 'gray'
    },
    inputBox: {
      width: 250,
      backgroundColor: '#ffffff',
      marginLeft: 10,
      fontSize: 16,
      paddingLeft: 20,
      borderRadius: 5
    },
    updateBtn:{
      backgroundColor: 'black',
      color: 'white',
      height: 40,
      width: 250,
      borderRadius: 10,
      marginTop: 30,
      alignItems: 'center',
      justifyContent: 'center'
    },
    updateBtnText: {
      color: '#ffffff',
      fontSize: 16
    }
  })

export default Account