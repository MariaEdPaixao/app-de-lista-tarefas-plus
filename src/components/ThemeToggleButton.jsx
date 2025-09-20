import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggleButton() {
    const { toggleTheme, colors, theme } = useTheme();

    return (
        <TouchableOpacity 
            style={styles.button}
            onPress={toggleTheme}
        >
            <Text style={[styles.icon, { color: colors.text }]}>
                {theme === 'light' ? '☾' : '☼'}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 5,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 55,
        height: 55,
    },
    icon: {
        fontSize: 26,
    },
});