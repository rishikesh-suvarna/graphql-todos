import { gql, useQuery } from "@apollo/client"
import TodoCard from "./components/TodoCard"
import { Todo } from "./types"

const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        name
      }
    }
  }
`

const App = () => {

  const { loading, error, data } = useQuery(query)

  if(loading) return <div>Loading...</div>

  if(error) return <div>Error</div>

  return (
    <section className="py-5 container mx-auto">
      <h2 className="text-4xl mb-4">Todos</h2>
      <div className="grid grid-cols-4 gap-4">
        {
          data.getTodos.map((todo: Todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))
        }
      </div>
    </section>
  )
}

export default App