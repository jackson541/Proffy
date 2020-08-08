import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TextInput, Picker } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'
import DateTimePicker from '@react-native-community/datetimepicker';

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import api from '../../services/api'

import styles from './styles'

function TeacherList(){
    const [isFiltersVisible, setIsFiltersVisible] = useState(false)
    const [favorites, setFavorites] = useState<number[]>([])
    const [teachers, setTeachers] = useState([])
    const [showInputTime, setShowInputTime] = useState(false)

    const [subject, setSubject] = useState('Artes')
    const [week_day, setWeekDay] = useState(0)
    const [time, setTime] = useState('00:00')


    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible)
    }

    function loadFavorites() {
        AsyncStorage.getItem('favorites')
            .then(response => {
                if(response){
                    const favoritedTeachers = JSON.parse(response)
                    const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {
                        return teacher.id
                    })

                    setFavorites(favoritedTeachersId)
                }
            })
    }

    async function handleFilterSubmit() {
        loadFavorites()

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        setIsFiltersVisible(false)
        setTeachers(response.data)
    } 

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name='filter' size={20} color="#fff" />
                    </BorderlessButton>
                )}
            >
                { isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label} >Matéria</Text>
                        <View style={styles.inputPicker}>
                            <Picker
                                style={styles.picker}
                                selectedValue={subject}
                                onValueChange={(itemValue) =>
                                    setSubject(itemValue)
                                }
                            >
                                <Picker.Item label='Artes' value={'Artes'} />
                                <Picker.Item label='Biologia' value={'Biologia'} />
                                <Picker.Item label='Ciências' value={'Ciências'} />
                                <Picker.Item label='Educação física' value={'Educação física'} />
                                <Picker.Item label='Física' value={'Física'} />
                                <Picker.Item label='Geografia' value={'Geografia'} />
                                <Picker.Item label='História' value={'História'} />
                                <Picker.Item label='Matemática' value={'Matemática'} />
                                <Picker.Item label='Português' value={'Português'} />
                                <Picker.Item label='Química' value={'Química'} />
                            </Picker>
                        </View>
                        
                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label} >Dia da semana</Text>
                                <View style={styles.inputPicker}>
                                    <Picker
                                        style={styles.picker}
                                        selectedValue={week_day}
                                        onValueChange={(itemValue) =>
                                            setWeekDay(itemValue)
                                        }
                                    >
                                        <Picker.Item label='Domingo' value={0} />
                                        <Picker.Item label='Segunda-feira' value={1} />
                                        <Picker.Item label='Terça-feira' value={2} />
                                        <Picker.Item label='Quarta-feira' value={3} />
                                        <Picker.Item label='Quinta-feira' value={4} />
                                        <Picker.Item label='Sexta-feira' value={5} />
                                        <Picker.Item label='Sábado' value={6} />
                                    </Picker>
                                </View>
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label} >Horário</Text>
                                <RectButton 
                                    style={styles.viewHour}
                                    onPress={() => {setShowInputTime(true)}}
                                >
                                    <Text style={styles.viewHourText} >
                                        {time}
                                    </Text>
                                </RectButton>

                                { showInputTime && (
                                    <DateTimePicker
                                        value={new Date(2020, 10, 20, 0, 0)}
                                        mode={'time'}
                                        display={'clock'}
                                        onChange={(_, selectedTime) => {
                                            if (selectedTime){
                                                const hour = selectedTime.getHours()
                                                const minutes = selectedTime.getMinutes()

                                                setShowInputTime(false)
                                                setTime(`${hour}:${minutes}`)
                                            }
                                        }}
                                        is24Hour
                                    />
                                ) }
                                
                            </View>
                        </View>

                        <RectButton 
                            style={styles.submitButton}
                            onPress={handleFilterSubmit}
                        >
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: Teacher) => (
                    <TeacherItem 
                        key={teacher.id} 
                        teacher={teacher} 
                        favorited={favorites.includes(teacher.id)}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default TeacherList