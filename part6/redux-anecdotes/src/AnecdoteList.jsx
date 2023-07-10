import { useDispatch, useSelector } from "react-redux"
import { setAnecdotes} from "./slices/anecdoteSlice"
import { QueryClient, useMutation, useQuery } from "react-query"
import {  NotificationContext, fetchAnecdotesApiCall, voteAnecdoteApiCall } from "./App"
import { queryClient } from "."
import { useContext } from "react"


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const [notificationState,notificationDispatch] = useContext(NotificationContext)

    const mutation = useMutation(voteAnecdoteApiCall,{
      onSuccess: (data,anecdote) => {
        queryClient.invalidateQueries('anecdotes')
        notificationDispatch({type:'SUCCESS',payload:{message:`Voted for ${anecdote.content}`}})
    }})

    const {data:anecdotes,error,isLoading,isFetched} = useQuery('anecdotes',fetchAnecdotesApiCall,{
      onSuccess: (data) => dispatch(setAnecdotes(data))
    })

    const filterString = useSelector(state => state.filter.filter)
    
    function filterAnecdotes(anecdote){
      if(filterString.trim().length === 0) return true
      else return anecdote.content.includes(filterString)
    }

    return(
        <>
        {isFetched ? 
        anecdotes.filter(filterAnecdotes).sort(function(a,b){return a.votes - b.votes}).map(anecdote =>
            <div key={anecdote.id} style={{marginTop:'2em',marginBottom:'1em'}}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => mutation.mutate(anecdote)}>vote</button>
              </div>
            </div>
        )
        : 
        null
      }
        </>
    )
}

export default AnecdoteList