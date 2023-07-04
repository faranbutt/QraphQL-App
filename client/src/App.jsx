import { gql, useQuery,useLazyQuery,useMutation } from "@apollo/client";
import { useState } from "react";


function App() {
  const [searchMovie,setSearchMovie] = useState('');
  
  //UserInputStates
  const [name,setName] = useState('');
  const [age,setAge] = useState('');
  const [username,setUsername] = useState('');
  const [nationality,setNationality] = useState('');

   ////


  const getUsers = gql`
    query GetAllUsers {
      users {
        id
        name
        username
        age
        nationality
      }
    }
  `;
  const getMovies = gql`
    query GetAllMovies {
      movies {
        id
        inTheathers
        name
        yearofPublication
      }
    }
  `;

  const getMoviebyName = gql`
    query getMovieByName($name: String!) {
      movie(name: $name){
        id
        name 
        inTheathers
        yearofPublication
      }

    }
  `
  const createUserbyName  = gql `
    mutation MakeUser($input: createUserInput!) {
  createUser(input: $input) {
    age
    name
  }
}
  
  `
  const { loading, error, data, refetch } = useQuery(getUsers);
  const {
    loading: MovieLoading,
    error: MovieError,
    data: MovieData,
  } = useQuery(getMovies);

  const [fetchMovie,{data:MovieSearchData, error:MovieSearchError}] = useLazyQuery(getMoviebyName);
  
  const [createUser, { data:createUserData, error:createUserError }] = useMutation(createUserbyName);
  const CreateUser = () => {
    createUser({
      variables:{
        input:{
          name:name,
          username:username,
          age:Number(age),
          nationality:nationality
        }
      }
    })
    refetch();
  }

  if (loading) return <p>Loading......</p>;

  if (error) return <p>Error: {error.message} </p>;
  if (MovieLoading) return <p>Loading Movies....</p>
  if(MovieError) return <p>Error:{MovieError.message}</p>
  

  return (
    <>
    <div>
      <div>
        <div>
          <input type="text" value={name}  placeholder="Name..." onChange={(event)=>setName(event.target.value)} />
          <input type="text" value={username} placeholder="Username..." onChange={(event)=>setUsername(event.target.value)} />
          <input type="number" value={age} placeholder="Age..." onChange={(event)=>setAge(event.target.value)} />
          <input type="text" value={nationality} placeholder="Nationality..." onChange={(event)=>setNationality(event.target.value.toUpperCase())} />
        </div>
        <button onClick={CreateUser}>Create User</button>
      </div>
      <div><h1>List of Users</h1></div>
      <div>
        {data.users.map((user) => (
          <div key={user.id}>
            <span>
              Name:
              {user.name}
            </span>
            <div>
              Age:
              {user.age}
            </div>
            <div>
              Nationality:
              {user.nationality}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div>
      <h1>List of Movies</h1>
      <div>{MovieData.movies.map((movie)=>(
        <div key={movie.id}>
          <div>Name:<i>{movie.name}</i></div>
          <div>Year of Realease:<i>{movie.yearofPublication}</i></div>
          <div>Comming In Theathers: {movie.inTheathers ? (<b>Go and Watch</b>): (<b>Coming Soon ):</b>)}</div>          
        </div>
      ))}</div>
    </div>
    <div>
      <label htmlFor="">Search Movies</label>
      <input type="text" placeholder="search movies" onChange={(event)=>setSearchMovie(event.target.value)}/>
      <button onClick={()=>{fetchMovie({variables:{name:searchMovie}})}}>Search!</button>
      <div>
        {MovieSearchData && 
        <div>
          <div>
          <h1>Moviename:</h1>
          {MovieSearchData.movie.name}
          </div>
          <div>
            <h1>Release Year:</h1>
            {MovieSearchData.movie.yearofPublication}
          </div>
        </div>}
        {MovieSearchError && <div>No Such Movie!!!!</div>}
      </div>
     
    </div>
    </>
  );
}

export default App;
