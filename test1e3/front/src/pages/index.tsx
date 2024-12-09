import React, { useEffect, useState } from "react"
import { Logo } from "../assets/img"
import * as Styles from "./style"
import { ButtonType } from "../components/buttons/button/interfaces"
import { Background } from "../components/inputs/input/interfaces"
import { JustifyType } from "../components/align/interfaces"
import { CardBase, Input, Text, Button, NavTab } from "../components"
import { Align } from "../components/align/style"
import { Size } from "../components/text"
import {
  loginAction,
  LoginModel,
  userInfoAction,
} from "../service/api/shopper/userService"
import {
  deleteAllCookies,
  deleteCookie,
  getLocalStorage,
  setLocalStorage,
} from "../utils"

// const drivers = [
//   {
//     nome: "João Silva",
//     descricao: "Motorista experiente com 5 anos de atuação.",
//     stars: 4,
//     veiculo: "Toyota Corolla 2020",
//     valor: 150,
//   },
//   {
//     nome: "Maria Oliveira",
//     descricao: "Especialista em viagens longas e seguras.",
//     stars: 5,
//     veiculo: "Honda Civic 2021",
//     valor: 180,
//   },
// ]

// const travelData = [
//   {
//     nomeMotorista: "João da Silva",
//     data: new Date("2024-11-28"),
//     origem: "Rua A, São Paulo, SP",
//     destino: "Rua B, São Paulo, SP",
//     distancia: 10.5, // Em quilômetros
//     tempo: 25, // Em minutos
//     valor: 45.0, // Em reais
//   },
//   {
//     nomeMotorista: "Maria Oliveira",
//     data: new Date("2024-11-27"),
//     origem: "Avenida Paulista, São Paulo, SP",
//     destino: "Praça XV, Rio de Janeiro, RJ",
//     distancia: 430.0, // Em quilômetros
//     tempo: 300, // Em minutos
//     valor: 120.0, // Em reais
//   },
//   {
//     nomeMotorista: "Carlos Mendes",
//     data: new Date("2024-11-26"),
//     origem: "Rodovia dos Bandeirantes, Campinas, SP",
//     destino: "Rua das Flores, Belo Horizonte, MG",
//     distancia: 590.0, // Em quilômetros
//     tempo: 420, // Em minutos
//     valor: 200.0, // Em reais
//   },
//   {
//     nomeMotorista: "Ana Santos",
//     data: new Date("2024-11-25"),
//     origem: "Centro Histórico, Porto Alegre, RS",
//     destino: "Rua do Comércio, Curitiba, PR",
//     distancia: 710.0, // Em quilômetros
//     tempo: 480, // Em minutos
//     valor: 320.0, // Em reais
//   },
// ]

const TASKS_KEY = "tasks"

export function Access() {
  const [getNavTab, setNavTab] = useState(1)
  const [email, setEmail] = useState("filipe.souza@example.com")
  const [password, setPassword] = useState("password123")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [drivers, setDrivers] = useState<any[]>([])
  const [selectedDriver, setSelectedDriver] = useState<any | null>(null)
  const [userData, setUserData] = useState<{
    nome: string
    idade: string
    data_nasciment: string
  } | null>(null)
  const [tasks, setTasks] = useState<{ nome: string; status_tarefa: string }[]>(
    []
  )
  const [filter, setFilter] = useState<string>("TODAS")

  useEffect(() => {
    const storedTasks = getLocalStorage(TASKS_KEY)
    setTasks(storedTasks || [])
  }, [])

  const handleAddTask = () => {
    const newTask = {
      nome: `Tarefa ${tasks.length + 1}`,
      status_tarefa: "PENDENTE",
    }
    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    setLocalStorage(TASKS_KEY, updatedTasks)
  }

  const handleRemoveTask = (taskName: string) => {
    const updatedTasks = tasks.filter((task) => task.nome !== taskName)
    setTasks(updatedTasks)
    setLocalStorage(TASKS_KEY, updatedTasks)
  }

  const handleMarkAsCompleted = (taskName: string) => {
    const updatedTasks = tasks.map((task) =>
      task.nome === taskName ? { ...task, status_tarefa: "CONCLUIDA" } : task
    )
    setTasks(updatedTasks)
    setLocalStorage(TASKS_KEY, updatedTasks)
  }

  const handleFilterTasks = (status: string) => {
    setFilter(status)
  }

  const filteredTasks =
    filter === "TODAS"
      ? tasks
      : tasks.filter((task) => task.status_tarefa === filter)

  const showError = (message: string) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage("")
    }, 4000) // 4 segundos
  }

  const handleCancel = () => {
    setEmail("")
    setPassword("")
    setErrorMessage("")
    setUserData(null)
  }

  const handleFetchUserData = async () => {
    try {
      const response = await userInfoAction()
      setUserData(response)
    } catch (error) {
      showError("Erro ao buscar os dados do usuário.")
      console.error("Erro ao buscar dados:", error)
    }
  }

  const handleLogin = async () => {
    try {
      const requestData: LoginModel = {
        login: email,
        password: password,
      }
      loginAction(requestData)
      setNavTab(2)
    } catch (error) {
      showError("Erro ao realizar login. Tente novamente.")
      console.error("Error making the API request:", error)
    }
  }

  const handleLogout = async () => {
    try {
      deleteCookie("user_token")
    } catch (error) {
      console.error("Erro ao deletar cookies:", error)
    }
  }

  useEffect(() => {
    const storedDriver = localStorage.getItem("selectedDriver")
    if (storedDriver) {
      setSelectedDriver(JSON.parse(storedDriver))
    } else {
      setSelectedDriver(null)
    }
  }, [drivers])

  useEffect(() => {
    setSelectedDriver(null)
  }, [])

  return (
    <Styles.PageContent>
      <Styles.Left>
        <Styles.BgImage />
      </Styles.Left>
      <Styles.Right>
        <Styles.ImgLogoInline src={Logo} />
        <Styles.Center>
          <Align alignCenter column gap="20px">
            <NavTab
              tabs={["Login", "user info", "Todo"]}
              activeTab={getNavTab}
              onTabClick={setNavTab}
            />

            {getNavTab === 1 && (
              <CardBase>
                <Align gap="30px" column>
                  <Text text="Login (Test 3)" size={Size.L} center />
                  <Input
                    text="Login"
                    background={Background.Secondary}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    text="Senha"
                    background={Background.Secondary}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errorMessage && (
                    <p
                      style={{
                        color: "var(--red-primary)",
                        textAlign: "center",
                        fontWeight: 500,
                      }}
                    >
                      {errorMessage}
                    </p>
                  )}
                  <Align gap="20px" alignCenter justify={JustifyType.Center}>
                    <Button
                      text="Login"
                      type={ButtonType.Primary}
                      onClick={handleLogin}
                    />
                    <Button
                      text="Limpar"
                      type={ButtonType.Secondary}
                      onClick={handleCancel}
                    />

                    <Button
                      text="Logout"
                      type={ButtonType.Secondary}
                      onClick={handleLogout}
                    />
                  </Align>
                </Align>
              </CardBase>
            )}

            {getNavTab === 2 && (
              <CardBase>
                <Align gap="30px" column>
                  <Text
                    text="Dados do meu usuário (Test 3)"
                    size={Size.L}
                    center
                  />
                  {userData ? (
                    <Align column>
                      <Text text={`Nome: ${userData.nome}`} size={Size.M} />
                      <Text text={`Idade: ${userData.idade}`} size={Size.M} />
                      <Text
                        text={`Data de Nascimento: ${userData.data_nasciment}`}
                        size={Size.M}
                      />
                    </Align>
                  ) : (
                    <Text text="Nenhum dado carregado." size={Size.M} center />
                  )}
                  {errorMessage && (
                    <p
                      style={{
                        color: "var(--red-primary)",
                        textAlign: "center",
                        fontWeight: 500,
                      }}
                    >
                      {errorMessage}
                    </p>
                  )}
                  <Align gap="20px" alignCenter justify={JustifyType.Center}>
                    <Button
                      text="Buscar dados"
                      type={ButtonType.Primary}
                      onClick={handleFetchUserData}
                    />
                    <Button
                      text="Limpar"
                      type={ButtonType.Secondary}
                      onClick={handleCancel}
                    />
                  </Align>
                </Align>
              </CardBase>
            )}

            {getNavTab === 3 && (
              <CardBase>
                <Align gap="30px" column>
                  <Text text="Todo (test 1)" size={Size.L} center />
                  <Align column gap="10px">
                    {filteredTasks.map((task, index) => (
                      <Align
                        key={index}
                        justify={JustifyType.Between}
                        style={{
                          backgroundColor: "#f9f9f9",
                          padding: "10px",
                          borderRadius: "5px",
                          width: "100%",
                        }}
                      >
                        <Text text={task.nome} size={Size.M} />
                        <Align gap="5px">
                          {task.status_tarefa === "PENDENTE" && (
                            <Button
                              text="Concluir"
                              type={ButtonType.Primary}
                              onClick={() => handleMarkAsCompleted(task.nome)}
                            />
                          )}
                          <Button
                            text="Remover"
                            type={ButtonType.Secondary}
                            onClick={() => handleRemoveTask(task.nome)}
                          />
                        </Align>
                      </Align>
                    ))}
                  </Align>

                  <Align gap="10px" reponsive>
                    <Button
                      text="Adicionar Tarefa"
                      type={ButtonType.Primary}
                      onClick={handleAddTask}
                    />
                    <Button
                      text="Mostrar Todas"
                      type={ButtonType.Secondary}
                      onClick={() => handleFilterTasks("TODAS")}
                    />
                    <Button
                      text="Concluídas"
                      type={ButtonType.Secondary}
                      onClick={() => handleFilterTasks("CONCLUIDA")}
                    />
                    <Button
                      text="Pendentes"
                      type={ButtonType.Secondary}
                      onClick={() => handleFilterTasks("PENDENTE")}
                    />
                  </Align>
                </Align>
              </CardBase>
            )}
          </Align>
        </Styles.Center>
      </Styles.Right>
    </Styles.PageContent>
  )
}
