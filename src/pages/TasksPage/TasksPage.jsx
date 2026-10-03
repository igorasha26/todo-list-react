import {TasksProvider} from '@/entities/todo'
import Todo from "@/wdgets/Todo";

const TasksPage = () => {
    return(
        <TasksProvider>
            <Todo />
        </TasksProvider>
    )
}

export default TasksPage