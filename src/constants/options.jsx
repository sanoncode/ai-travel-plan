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

export const AI_PROMPT ='Act As my personal travel planner and create a {days} day itinerary for {location} , considering i am travelling with {people} people with a {budget} budget, give me a Hotels options list with HotelName, HotelAddress, Price, Hotel image url, geo coordinates, rating, descriptions, create an itinerary with placeName,PlaceDetails, place Image url, Geo coordinates, ticketPricing, rating. on hotel price make sure giving a range price (in USD) in between, and also time travel for each activity or location with each day plan with best time to visit in JSON FORMAT'
