import { useState, Utils } from "uu5g05";

const USERS = [
  { id: "123", name: "Kuba" },
  { id: "234", name: "Amálka" },
  { id: "345", name: "Honza" },
  { id: "456", name: "Klára" },
  { id: "567", name: "Petra" },
  { id: "789", name: "Jana" },
  { id: "890", name: "Michal" },
  { id: "901", name: "Denisa" },
  { id: "012", name: "Alice" },
  { id: "111", name: "Vašek" },
  { id: "222", name: "Pavla" },
  { id: "333", name: "Jirka" },
  { id: "555", name: "Andrea" },
  { id: "666", name: "Karel" }  
];

// in pure react
// const UserContext = React.createContext();
// const useUserContext = () => React.useContext(UserContext);
const [UserContext, useUserContext] = Utils.Context.create([]);

function UserProvider({ children }) {
  const userParams = useState(USERS[0]);

  return (
    <UserContext.Provider value={userParams}>
      {children}
    </UserContext.Provider>
  )
}

function UserSelector() {
  const [user, setUser] = useUserContext();

  return (
    <select value={user.id} onChange={(e) => setUser(USERS.find(({id}) => id === e.target.value))}>
      {USERS.map(({ id, name }) => (
        <option key={id} value={id}>{name}</option>
      ))}
    </select>
  )
}

function useUser() {
  return useUserContext()[0];
}

/*
* Usage:
* ------
* <UserProvider>
*   ...
*     <UserSelector />
*   ...
*     <SomeComponent />
* </UserProvider>
*
* function SomeComponent() {
*   const user = useUser();
*   return ...;
* }
* */

export { UserProvider, UserSelector, useUser, USERS };
