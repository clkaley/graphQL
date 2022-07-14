import { gql,useLazyQuery } from '@apollo/client';
import React, { useState } from 'react'




const GET_CHARACTER_LOCATIONS=gql`
query GetCharacterLocations($name:String!){
        characters(filter:{name:$name}){
            results{location{
                        name
                    }
                }
        }
    }

`

function Search() {
    const [name,setName]=useState("");



    const [getLocations,{loading,error,data,called}]=useLazyQuery(GET_CHARACTER_LOCATIONS,{
        variables:{
            name
        }
    })

    console.log({error,data,loading,called});
  return (
    <div>
        <input value={name} onChange={(e)=>setName(e.target.value)} />
        <button onClick={()=>getLocations()}>Search</button>

        {loading && <div>Working Search</div>}
        {error && <div>Something Went Wrong</div>}
        {data && (
            <ul>
                {data.characters.results.map((character,index)=>{
                    return <li key={index}>
                            {character.location.name}
                        </li>
                })}
            </ul>
        )}
    </div>
  )
}

export default Search