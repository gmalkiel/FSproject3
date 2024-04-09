class UsersDB{

    constructor(){
        this.USERS_KEY = "users";
    }

    getUsers() {
        return getUsersFromLocalStorage();
    }

    getUser(username) {
        const users = getUsersFromLocalStorage();
        return users.find(user => user.UserName === username);
    }

    addUser(newUser){
        const users = getUsersFromLocalStorage();
        users.push(newUser);
        saveUsersToLocalStorage(users);
    }

}

function getUsersFromLocalStorage() {
    const usersJSON = localStorage.getItem(this.USERS_KEY);
    return usersJSON ? JSON.parse(usersJSON) : [];
  }
  
  function saveUsersToLocalStorage(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

export default UsersDB;  