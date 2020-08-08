import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f7"
    },

    teacherList: {
        marginTop: -40
    },

    searchForm: {
        marginBottom: 24
    },

    label: {
        color: "#d4c2ff",
        fontFamily: "Poppins_400Regular"
    },

    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    inputBlock: {
        width: '48%'
    },

    input: {
        height: 54,
        backgroundColor: "#fff",
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 4,
        marginBottom: 16
    },

    inputPicker:{
        height: 54,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        marginTop: 4,
        marginBottom: 16
    },

    picker:{
        width: '100%',
        marginLeft: 8
    },

    viewHour: {
        height: 54,
        backgroundColor: "#fff",
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 4,
        marginBottom: 16
    },

    viewHourText: {
        fontSize: 16
    },

    submitButton: {
        backgroundColor: "#04d361",
        height: 56,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    submitButtonText: {
        color: '#fff',
        fontFamily: 'Archivo_700Bold',
        fontSize: 16,
    }

})

export default styles