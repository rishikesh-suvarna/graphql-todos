/* eslint-disable @typescript-eslint/no-unused-vars */
import { Todo } from "../types"

const TodoCard = ({todo}: {todo: Todo}) => {
    return (
        <div className="border-2 border-red-400 border- p-4 rounded-lg">
            <h2 className="capitalize font-semibold">{todo.title}</h2>
            <p className="font-semibold"><span className="font-light">By: </span>{todo.user.name}</p>
            <p className="font-semibold"><span className="font-light">Status: </span>{todo.completed ? 'Completed' : 'Not completed'}</p>
        </div>
    )
}

export default TodoCard