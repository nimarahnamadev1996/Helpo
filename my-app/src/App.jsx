import React, { useReducer } from 'react'
import TicketForm from './components/TicketForm'
import TicketReducer from './reducers/TicketReducer'
import TicketList from './components/TicketList'
import { sortingTicket } from './helpers/SortingTicket'

const App = () => {


  const initialState = {
    tickets: [],
    editingTicket: null,
    sortPreference: 'High to Low'
  }


  const [state,dispatch] = useReducer(TicketReducer,initialState)


  const sortedTicket = sortingTicket(state.tickets, state.sortPreference)

  return (
    <div className='App'>
      <div className='container'>
         <h1>Helpo</h1>

         <TicketForm dispatch={dispatch} editingTicket={state.editingTicket}/>

         {
          state.tickets.length > 0 && 
          <div className='result'>
           <h2>All Tickets</h2>

           <select 
            value={state.sortPreference} 
            onChange={(e) => dispatch({type: 'SET_SORTING', payload: e.target.value})}>
            <option value='High to Low'>High to Low</option>
            <option value='Low to High'>Low to High</option>
           </select>

           <TicketList dispatch={dispatch} tickets={sortedTicket} />
          </div>
         }

      </div>
    </div>
  )
}

export default App