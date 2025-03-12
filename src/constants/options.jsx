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
        desc: 'Stay conscious of costs',
        icon: '🤑',
    },
    {
        id:2,
        title: 'Moderate',
        desc: 'keep the cost on the average side',
        icon: '💰',
    },
    {
        id:3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '💸',
    },
]

export const AI_PROMPT ="Act As my personal travel planner and create a {days} day itinerary for {location}, considering i am travelling with {people} people,  with a {budget} budget and this is a honeymoon trip, give me a Hotels options list with HotelName, HotelAddress, Price, rating, descriptions, create an itinerary with placeName,PlaceDetails, ticketPricing, rating. on hotel price make sure giving a range price (in USD) in between, and also time travel for each activity or location with each day plan with best time to visit , use the following structure \"{\n\"hotels\": [\n{\n\"hotelName\":\n\"hotelAddress\":\n\"priceRangeUSD\":\n\"rating\":\n\"description\":\n},\n]\n\"itinerary\": [\n{\n\"day\": 1,\n\"title\":\n\"places\": [\n{\n\"placeName\": ,\n\"placeDetails\": ,\n\"ticketPricing\": 6,\n\"rating\": 4.5,\n\"timeTravel\": \"Late afternoon to evening (3:00 PM - 7:00 PM)\",\n\"bestTimeToVisit\": \"Sunset (5:30 PM - 6:30 PM)\"\n},\n]\n},\"},]\n}\""
