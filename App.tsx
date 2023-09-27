import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import BouncyCheckbox from "react-native-bouncy-checkbox";

// Form validation
import * as Yup from 'yup'
import { Formik } from 'formik';
// YOUTUBE:
const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4, 'Should be min of 4 characters')
  .max(16, 'Should be max of 16 characters')
  .required('Length is required')
  
})
export default function App() {

  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setupperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars
    }
    if (lowerCase) {
      characterList += lowerCaseChars
    }
    if (numbers) {
      characterList += digitChars
    }
    if (symbols) {
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList, passwordLength )

    setPassword(passwordResult)
    setIsPassGenerated(true)
    
  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
    console.log("hitesh");
    
  }

  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setupperCase(false)
    setNumbers(false)
    setSymbols(false)
    
    
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
       initialValues={{ passwordLength: '' }}
       validationSchema={PasswordSchema}
       onSubmit={ values => {
        console.log(values);
        generatePasswordString(+values.passwordLength) 
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>
                {errors.passwordLength}
              </Text>
            )}
            
          </View>
          <TextInput
            style={styles.inputStyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder="Ex. 8"
            keyboardType='numeric'
            />
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include lowercase</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={lowerCase}
          onPress={() => setLowerCase(!lowerCase)}
          fillColor="#29AB87"
          />
         </View>
         <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase letters</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setupperCase(!upperCase)}
                    fillColor="#FED85D"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#C9A0DC"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#FC80A5"
                  />
                </View>
         <View style={styles.formActions}>
          <TouchableOpacity
          disabled={!isValid}
          style={styles.primaryBtn}
          onPress={handleSubmit}
          >
            <Text style={styles.primaryBtnTxt}>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.secondryBtn}
          onPress={ () => {
            handleReset();
            resetPasswordState()
          }}
          >
            <Text style={styles.secondaryBtnTxt}>Reset</Text>
          </TouchableOpacity>
         </View>
         </>
       )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  appContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fafafa'
  },
  formContainer: {
  width: '90%',
  backgroundColor: '#fff',
  borderRadius: 5,
  padding: 15,
  marginVertical: 10,
  shadowColor: '#000',
  shadowOffset: {
  width: 0,
  height: 3,
  },
  shadowOpacity: 0.29,
  shadowRadius: 4.65,
  elevation: 7,
  },
  title: {
  fontSize: 22,
  fontWeight: 'bold',
  marginBottom: 15,
  textAlign: 'center'
  },
  inputWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 5
  },
  heading: {
  fontSize: 16,
  fontWeight: '600',
  flex: 1,
  marginRight: 5
  },
  inputColumn: {
  width: 120,
  flexDirection: 'row',
  justifyContent: 'space-between'
  },
  inputStyle: {
  backgroundColor: '#f5f5f5',
  paddingVertical: 8,
  paddingHorizontal: 15,
  borderRadius: 5,
  flex: 1,
  fontSize: 16
  },
  errorText: {
  fontSize: 14,
  color: 'red'
  },
  formActions: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 10
  },
  primaryBtn: {
  backgroundColor: '#009688',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 5,
  flex: 1,
  marginRight: 10
  },
  primaryBtnTxt: {
  color: '#fff',
  fontWeight: '600',
  textAlign: 'center'
  },
  secondryBtn: {
  backgroundColor: '#ddd',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 5,
  flex: 1,
  marginLeft: 10
  },
  secondaryBtnTxt: {
  color: '#333',
  fontWeight: '600',
  textAlign: 'center'
  },
  card: {
  backgroundColor: '#fff',
  borderRadius: 5,
  padding: 10,
  marginVertical: 10
  },
  cardElevated: {
  shadowColor: '#000',
  width: '90%',
  shadowOffset: {
  width: 0,
  height: 3,
  },
  shadowOpacity: 0.29,
  shadowRadius: 4.65,
  elevation: 7,
  },
  subTitle: {
  fontSize: 18,
  fontWeight: '600'
  },
  description: {
  fontSize: 14,
  fontWeight: '400',
  color: '#999',
  marginVertical: 5
  },
  password: {
  fontSize: 22,
  fontWeight: 'bold'
  },
  generatedPassword: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 12,
        color:'#000'
      },
  });
  
  
  
  
  
  