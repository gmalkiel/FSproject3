class UsersDB{

    constructor(){
        this.USERS_KEY = "users";
    }

    getUser(username) {
        const users = getUsersFromLocalStorage();
        return users.find(user => user.username === username);
    }

    addUser(newUser){
        const users = getUsersFromLocalStorage();
        users.push(newUser);
        saveUsersToLocalStorage(users);
    }

}

function getUsersFromLocalStorage() {
    const usersJSON = localStorage.getItem(USERS_KEY);
    return usersJSON ? JSON.parse(usersJSON) : [];
  }
  
  function saveUsersToLocalStorage(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

 module.exports = UsersDB;  