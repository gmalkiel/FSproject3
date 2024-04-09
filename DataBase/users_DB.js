//Database for saving users
class UsersDB{

    constructor(){
    }

    //get all users
    getUsers() {
        return getUsersFromLocalStorage();
    }

    //get user by name
    getUser(username) {
        const users = getUsersFromLocalStorage();
        return users.find(user => user.UserName === username);
    }

    //post new user
    addUser(newUser){
        const users = getUsersFromLocalStorage();
        users.push(newUser);
        saveUsersToLocalStorage(users);
    }

}

function getUsersFromLocalStorage() {
    const usersJSON = localStorage.getItem("USERS");
    return usersJSON ? JSON.parse(usersJSON) : [];
  }
  
  function saveUsersToLocalStorage(users) {
    localStorage.setItem("USERS", JSON.stringify(users));
  }

export default UsersDB;  