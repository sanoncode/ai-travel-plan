const openAiProvider = async({formData, session}) =>{
    const res = await fetch('/api/ai/generate-trip',{
        method:'POST',
        headers:{
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": 'application/json'
        },
        body:JSON.stringify({formData})
    })

    if(res.error){
        throw new Error("OPEN AI ERROR")
    }

    const data = await res.json()

    return data
}

export default openAiProvider