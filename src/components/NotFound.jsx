import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
const NotFound = ({ text }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image style={styles.img} source={require('../../assets/img/sad.gif')} />
            </View>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgContainer: {
        // width: '100%',
        alignItems: 'center',
        marginBottom: 16,
        borderRadius: 10,
        overflow: 'hidden',
    },
    img: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.8,
    },
    text: {
        fontSize: 24,
        color: '#2C3E50',
        fontWeight: 'bold',
        marginTop: 10,
    },
})


export default NotFound
