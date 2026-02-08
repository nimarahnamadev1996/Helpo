import React from 'react'
import TicketItem from './TicketItem'

const TicketList = ({tickets,dispatch}) => {
  return (
    <div className='ticket-list'>
        {
            tickets.map((ticket) => (
                <TicketItem
                 ticket={ticket}
                 dispatch={dispatch}
                 key={ticket.id}/>
            ))
        }
    </div>
  )
}

export default TicketList