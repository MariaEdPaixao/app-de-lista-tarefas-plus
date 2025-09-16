import { TouchableOpacity,Text,StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggleButton(){
    const {toggleTheme, colors, theme} = useTheme()

    return(
        <TouchableOpacity 
            style={styles.button}
            onPress={toggleTheme}
        >
            <Feather
                name={theme === 'light' ? 'moon' : 'sun'}
                size={24}
                color={colors.text}
            />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        padding: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    text:{
        fontSize:16,
        fontWeight:'bold'
    }
})