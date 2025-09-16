import React,{createContext,useContext,useState} from "react";
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
            background:'#FFF',
            text:'#000',
            button:'#007bffff',
            buttonText:'#fff',
            input:'#f0f0f0',
            inputText:'#000',
            placeHolderTextColor:'#555'
        },
        dark:{
            background:'#121212',
            text:'#fff',
            button:'#3fd92bff',
            buttonText:'#000',
            input:'#333',
            inputText:'#fff',
            placeHolderTextColor:'#aaa'
        }
    }

    return(
        <ThemeContext.Provider value={{ theme, toggleTheme, colors: themeColors[theme] }}>
            {children}
        </ThemeContext.Provider>
    )
}