import axios from "axios"
import React, { useState, useEffect } from "react"

const list = [
  {
    id: 1,
    name: "user1",
  },
  {
    id: 2,
    name: "user2",
  },
  {
    id: 3,
    name: "user3",
  },
]

interface User {
  id: number
  name: string
}

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE || "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
})

export function UserList(): JSX.Element {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = (await api.get("/users")) as any
        // const response = await fetch("https://api.example.com/users");
        // const data = await response.json();
        // setUsers(list) //teste
        setUsers(response) //teste
      } catch (error) {
        console.error("Erro ao buscar usuários:", error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserList

// Aconselho utilizar axios e a conversao em json na propria chamada da api seguindo princicpios de Clean Arch
// Aconselho separar cada componente em suas devidas camadas
// A parte de renderização está correto o erro supostamente estava na url ou onde chama a api usando o fetch sem especificar um metodo post, get, delete...
