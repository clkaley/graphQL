import {ApolloClient,ApolloProvider,useQuery,gql, InMemoryCache, useMutation} from '@apollo/client'
import './App.css';

const client=new ApolloClient({
  uri:"https://sxewr.sse.codesandbox.io",
  cache:new InMemoryCache()
})

const GET_TODOS=gql`{
  todos{
    id
    type
  }
}
`



const ADD_TODO=gql`
  mutation AddTodo($type:String!){
    addTodo(type:$type){
      id
      type
    }
  }
`


const UPDATE_TODO=gql`
  mutation UpdateTodo($id:String!,$type:String!){
    updateTodo(id:$id,type:$type){
      id
      type
    }
}



`




function Todos(){

  const {loading:queryLoading,error:queryError,data}=useQuery(GET_TODOS);
  const [updateTodo,{loading:mutationLoading}]=useMutation(UPDATE_TODO);
  
  if(queryLoading)return <div>Loading</div>
  if(queryError) return <div>Something went wrong</div>
  console.log(data);



  return data.todos.map(({id,type})=>{
    let input;

    return (
      <div key={id}>
        <p>{type}</p>
        <form action="" onSubmit={e=>{
          e.preventDefault();
          if(!input.value.trim()){
            return 
          }
          //parametreleri ekliyorum 
          updateTodo({variables:{id,type:input.value}})
          input.value=""
        }}>
          <input ref={node=>input=node}/>
        <button type='submit'>{mutationLoading ? "submitting" :"Update Todo"}</button>
        </form>
      </div>
    )
  })

}

function AddTodo(){
  let input;
  const [addTodo]=useMutation(ADD_TODO,{

    update(cache,{data:{addTodo}}){
    cache.modify({
      fields:{
        todos(existingTodos=[]){
          const newTodoRef=cache.writeFragment({
            data:addTodo,
            fragment:gql`
              fragment NewTodo on Todo{
                id
                type
              }
            `
          })
          return [...existingTodos,newTodoRef]
        }
      }
    })
  }
});


  return (
    <div >
    
      <form action="" onSubmit={e=>{
        e.preventDefault();
        if(!input.value.trim()){
          return 
        }
        addTodo({variables:{type:input.value}})
        input.value=""
      }}>
        <input ref={node=>input=node}/>
      <button type='submit'> Add Todo</button>
      </form>
    </div>
  )
}

function App() {
  return (
    <ApolloProvider client={client} >
      <div className='App'>
        <h1>useMutation Hook 🚀</h1>
        <AddTodo/>
        <Todos/>
      </div>
    </ApolloProvider >
  );
}

export default App;
