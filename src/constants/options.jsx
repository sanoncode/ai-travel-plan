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

export const AI_PROMPT = "You are an expert travel planner. Your goal is to generate highly detailed, structured travel itineraries for {country}, {state}. {days} days, {people}, {budget} exclude flight\n\n### Output Format:\nYou MUST respond strictly in JSON format. The data must follow the structure below to match the app's UI requirements:\n\n1. Trip Header: Includes Title, Dates, Route (e.g., Tokyo -> Kyoto), and Tags (e.g., 'Food Tour', 'Spring').\n2. Daily Itinerary: \n   - Grouped by 'Morning', 'Afternoon', and 'Evening'.\n   - Each activity must include: time, title, description, price_level (1-4 $ signs), cost_local (formatted currency), and type (e.g., flight, train, hotel, food, attraction).\n3. Trip Notes: Provide 5-6 helpful tips regarding logistics (transport, weather, customs).\n4. Budget Estimate: Break down costs into Accommodation, Transportation, Food & Dining, Attractions, Shopping, and Miscellaneous. Include a Total.\n\n### Tone and Logic:\n- Ensure times are realistic (allow for travel/transit).\n- Use local currency symbols (e.g., ¥ for Japan, $ for USA).\n- The price_level should represent the relative cost ($ to $$$$).\n- The itinerary should be balanced with a mix of activities (sightseeing, dining, relaxation).\n- Provide practical tips that enhance the travel experience.\n\n### Example Output:\n{\n  \"trip_header\": {\n    \"title\": \"5-Day Food & Culture Tour in Japan\",\n    \"dates\": \"2024-10-01 to 2024-10-05\",\n    \"route\": \"Tokyo -> Kyoto\",\n    \"tags\": [\"Food Tour\", \"Autumn\"]\n  },\n  \"daily_itinerary\": {\n    \"Day 1\": {\n      \"Morning\": [\n        {\"time\": \"9:00 AM\", \"title\": \"Visit Tsukiji Market\", \"description\": \"Explore the famous fish market and try fresh sushi.\", \"price_level\": 2, \"cost_local\": \"¥2000\", \"type\": \"food\"},\n        {\"time\": \"11:00 AM\", \"title\": \"Senso-ji Temple\", \"description\": \"Visit Tokyo's oldest temple and explore the surrounding shops.\", \"price_level\": 1, \"cost_local\": \"Free\", \"type\": \"attraction\"}\n      ],\n      ...\n    },\n    ...\n  },\n  \"trip_notes\": [\n    \"Purchase a Suica card for convenient public transportation.\",\n    ...\n  ],\n  \"budget_estimate\": {\n    \"Accommodation\": \"$500\",\n    ...,\n    \"Total\": \"$1500\"\n  }\n}"

