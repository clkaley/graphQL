/* eslint-disable no-unused-expressions */
import React from 'react'
import { Link } from 'react-router-dom';
import { useCharacters } from '../hooks/useCharacters'
import './CharacterList.css'




function CharactersList() {

  const {error,loading,data}=useCharacters();

    if(loading)return <div>Characters are loading...</div>

    if(error)return <div>Something went wrong...</div>

  return (
    <div className='CharacterList'>
        {data.characters.results.map((character,id)=>{
            return ( 
            <div key={id}>
                <Link to={`/${character.id}`} >
                  <img  alt="character" src={character.image}/>
                  <h2 >{character.name}</h2>
                </Link>
            </div>
            )
        })}
    </div>
  )
}

export default CharactersList