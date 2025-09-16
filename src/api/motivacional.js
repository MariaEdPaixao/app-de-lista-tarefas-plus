import axios from "axios";

export const getMessageMotivation = async () => {
    try {
        const response = await axios.get("https://zenquotes.io/api/random");

        const message = response.data[0].q; 

        return message;  
    } catch (error) {
        console.error("Erro ao buscar a mensagem de motivação:", error);
        return null; 
    }
};
