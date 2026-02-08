import React, { useEffect, useState } from 'react'

const TicketForm = ({dispatch,editingTicket}) => {

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [priority,setPriority] = useState(1)


    const priorityLabels = {
        1 : 'Low',
        2 : 'Medium',
        3 : 'High',
    }

    const clearForm = () => {
        setTitle('')
        setDescription('')
        setPriority('1')
    }


    const handelSubmit = (e) => {
      e.preventDefault()

      const ticketData = {
        id: editingTicket ? editingTicket.id : new Date().toISOString(),
        title,
        description,
        priority,
      }

     dispatch({
        type: editingTicket ? 'UPDATE_TICKET' : 'ADD_TICKET',
        payload: ticketData
     })
      

      clearForm()
    }


    useEffect(() => {

        if(editingTicket){
           setTitle(editingTicket.title)
           setDescription(editingTicket.description),
           setPriority(Number(editingTicket.priority))
        }else{
            clearForm()
        }

    },[editingTicket])


    const handelCancel = () => {

        dispatch({type: 'CLEAR_EDITING_TICKET'})

        clearForm()
    }


  return (
    <form className='ticketForm' onSubmit={handelSubmit}>
      <div>

        <label>Title</label>
        <input 
          className='form-input' 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}/>

        <label>Description</label>
        <textarea
         type='text'
         className='form-input'
         value={description}
         onChange={(e) => setDescription(e.target.value)}/>

         <fieldset className='priority-fieldset'>
            <legend>Priority</legend>

            {
                Object.entries(priorityLabels).map(([value,label]) => (
                    <label key={value} className='priority-label'>
                        <input 
                         type='radio' 
                         className='priority-input'
                         value={value}
                         checked={priority === value}
                         onChange={(e) => setPriority(Number(e.target.value))}/>
                        {label}
                    </label>
                ))
            }
         </fieldset>

         <button type='submit' className='button'>
            Submit
         </button>

         {
            editingTicket && (
                <button className='button' onClick={handelCancel}>
                    Cancel editing
                </button>
            )
         }

      </div>
    </form>
  )
}

export default TicketForm