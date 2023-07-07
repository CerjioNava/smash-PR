const getCaraboboTournaments = 
`query TournamentsCarabobo(
  $perPage: Int, 
  $page: Int, 
  $state: String!, 
  $cCode: String!, 
  $videogameId: ID!,	
	$afterDate:Timestamp!,
	$beforeDate: Timestamp) 
  {
  tournaments(
    query: {
      perPage: $perPage, 
      page: $page, 
      filter: {
        countryCode: $cCode, 
        addrState: $state, 
        videogameIds: [$videogameId]
        beforeDate: $beforeDate
        afterDate:$afterDate
      }
    }
  ) {
    nodes {
      name
      addrState
      numAttendees
      startAt
      events(limit: 1, filter: {videogameId: [$videogameId], type: 1}) {
        slug
        type
        standings(query: {}) {
          nodes {
            placement
            player {
              gamerTag
            }
          }
        }
      }
    }
  }
}`;

module.exports = { getCaraboboTournaments };
