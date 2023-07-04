import { Users, Movies } from "../fakeData.js";
import _ from 'lodash';


export const resolvers = {

    Query: {
      users: (parent,args,info) => {
        if (Users) return {users: Users}

        return {message: "Yo there was an error"}
      },
      user: (parent,args) => {
        const id = args.id;
        const user = _.find(Users,{id : Number(id)});
        return user;
      },
      movies: () => Movies,
      movie: (parent,args) => {
        const name = args.name
        const movie = _.find(Movies,{ name });
        return movie;
      }
    },
    Users: {
      faviourtieMovie: (parent) => {
        return _.filter(Movies,function(o) { return o.yearofPublication >= 2000 && o.yearofPublication <= 2010; })
      }
    },
    Mutation: {
      createUser: (parent,args) => {
        const user = args.input
        const lastId = Users[Users.length-1].id
        user.id = lastId + 1
        Users.push(user);
        return user;
      },
      updateUsername : (parent,args) => {
        const { id, newName } = args.input
        let userUpdated;
        Users.forEach((user)=>{
          if(user.id === Number(id)){
            user.username = newName;
            userUpdated = user;
          }
        })
        return userUpdated;
      },
      deleteUser : (parent,args) => {
        const id = args.id
        _.remove(Users,(user) => user.id === Number(id))
      return null;
      }
      
    },

    UsersResult: {

      __resolveType(obj, contextValue, info){
  
        if(obj.users){
  
          return "UsersSuccessResult"
  
        }
        if(obj.message){
          return "UsersErrorResult"
        }
        return null;
      },
     
    },

  };


  export default resolvers;