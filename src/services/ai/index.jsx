
import openAiProvider from "./openAiProvider";
import groqAiProvider from "./groqAiProvider"

const PROVIDER = import.meta.env.AI_PROVIDER || 'openai'

const generateAI = async(payload) => {
    switch(PROVIDER) {
        case 'openai':
        return openAiProvider(payload);

        case 'groq':
        return groqAiProvider(payload)
        
        default:
            throw new Error('undefined provider')
    }
}

export default generateAI