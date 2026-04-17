const groqAiProvider = async({formData}) =>{
    const res = await fetch('/api/ai/generate-trip.js',{
        method:'POST',
        body:JSON.stringify({formData})
    })

    if(res.error){
        throw new Error("GROQ AI ERROR")
    }

    const data = await res.json()

    return {
        parsed: data.parsed,
        raw: data.raw
    }
}

export default groqAiProvider