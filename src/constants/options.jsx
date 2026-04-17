export const SelectTravelerList = [
    {
        id:1,
        title: 'Just me',
        desc: 'A solo traveler in exploration',
        icon: '🎽',
        people: '1'
    },
    {
        id:2,
        title: 'A couple',
        desc: 'two traveler looking for fun',
        icon: '🍻',
        people: '2'
    },
    {
        id:3,
        title: 'Family',
        desc: 'A group of lovely family',
        icon: '🏠',
        people: '3 to 5 people'
    },
    {
        id:4,
        title: 'Friends',
        desc: 'A bunch of thrill seeks',
        icon: '👥',
        people: '6 to 8 people'
    },
]

export const SelectBudgetOptions = [
    {
        id:1,
        title: 'Cheap',
        desc: 'Stay conscious of costs (budget-friendly options)',
        icon: '🤑',
    },
    {
        id:2,
        title: 'Moderate',
        desc: 'keep the cost on the average side ( a mix of budget and splurge options)',
        icon: '💰',
    },
    {
        id:3,
        title: 'Luxury',
        desc: 'Dont worry about cost (high-end options)',
        icon: '💸',
    },
]

export const AI_PROMPT = 'You are a professional tour guide and travel planner. Your job is to create a detailed, realistic, and well-balanced travel itinerary based on user inputs.\n\nYou will receive the following inputs:\n- Country\n- State/City\n- Number of days\n- Number of people\n- Budget (excluding flight costs)\n\nINSTRUCTIONS:\n\nCreate a travel plan that is:\n- Realistic in timing (include travel/transit time)\n- Balanced (mix of sightseeing, food, relaxation, shopping, and unique experiences)\n- Budget-aware (fit within the given budget)\n- Tailored to the destination (use local experiences, culture, and food)\n\nOUTPUT FORMAT (STRICT JSON ONLY — NO EXTRA TEXT):\n\n{\n "trip_header": {\n "title": "string",\n "dates": "YYYY-MM-DD to YYYY-MM-DD",\n "route": "City A -> City B",\n "tags": ["tag1", "tag2"]\n },\n "daily_itinerary": {\n "Day 1: <Day Title>": {\n "Morning": [\n {\n "time": "HH:MM AM/PM",\n "title": "string",\n "description": "string",\n "price_level": 1,\n "cost_local": "currency",\n "type": "attraction|food|hotel|transport|shopping|experience"\n }\n ],\n "Afternoon": [],\n "Evening": []\n }\n },\n "trip_notes": [\n "string"\n ],\n "budget_estimate": {\n "Accommodation": "currency",\n "Transportation": "currency",\n "Food & Dining": "currency",\n "Attractions": "currency",\n "Shopping": "currency",\n "Miscellaneous": "currency",\n "Total": "currency"\n }\n}\n\nRULES:\n\n1. Use LOCAL currency format (e.g., ¥, $, €, Rp).\n2. price_level must be:\n - 1 = $\n - 2 = $$\n - 3 = $$$\n - 4 = $$$$\n3. Each day MUST include:\n - Morning\n - Afternoon\n - Evening\n4. Each day MUST have a unique and meaningful title.\n5. Ensure time flow is logical (no unrealistic travel).\n6. Include transportation activities when moving between areas.\n7. Include at least:\n - 1 food experience per day\n - 2–4 activities per time block if possible\n8. Budget estimate MUST roughly match the trip scale and duration.\n9. Trip notes must include 5–6 useful and practical tips (transport, weather, etiquette, etc.).\n10. DO NOT include any explanation outside JSON.\n\nINPUT FORMAT:\n\nCountry: <country>\nCity: <city or multiple cities>\nDays: <number>\nPeople: <number>\nBudget: <amount>'

export const USER_PROMPT = 'Country: {country}\nCity: {city}\nDays: {days}\nPeople: {people}\nBudget: {budget}';