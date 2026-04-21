const openAiProvider = async({formData, session}) =>{
    const res = await fetch('/api/ai/generate-trip',{
        method:'POST',
        headers:{
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": 'application/json'
        },
        body:JSON.stringify({formData})
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error(data.error || "UNKOWN ERROR")
    }
    return data
}

export default openAiProvider