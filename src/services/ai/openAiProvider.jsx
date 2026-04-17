const openAiProvider = async({formData}) =>{

    const res = await fetch('/api/ai/generate-trip',{
        method:'POST',
        body:JSON.stringify({formData})
    })

    if(res.error){
        throw new Error("OPEN AI ERROR")
    }

    const data = await res.json()

    return {
        parsed: data.parsed,
        raw: data.raw
    }
}

export default openAiProvider