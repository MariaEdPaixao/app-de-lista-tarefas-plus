import { createContext, useContext, useState} from "react";
import { Appearance } from "react-native";

const ThemeContext = createContext();

export function useTheme(){
    return useContext(ThemeContext)
}

export function ThemeProvider({children}){
    const colorScheme = Appearance.getColorScheme();
    const [theme, setTheme] = useState(colorScheme || 'light');

    const toggleTheme = ()=>{
        setTheme((value)=>value==='light' ? 'dark':'light')
    }

     const themeColors = {
        light:{
            background: '#FAFAFA',
            text: '#222222',
            button: '#294db1',
            buttonText: '#FFFFFF',
            input: '#FFFFFF',
            inputText: '#333333',
            placeHolderTextColor: '#888888',
        },
        dark:{
            background: '#1A1C1E',
            text: '#E0E0E0',
            button: '#5a7cd8',
            buttonText: '#1A1C1E',
            input: '#2C2F33',
            inputText: '#FFFFFF',
            placeHolderTextColor: '#AAAAAA',
        }
    }

    return(
        <ThemeContext.Provider value={{ theme, toggleTheme, colors: themeColors[theme] }}>
            {children}
        </ThemeContext.Provider>
    )
}