import { memo, useContext } from "react"
import { TodoItem, TasksContext } from "@/entities/todo"

const TodoList = (props) => {
    const {styles} = props

    const {
        tasks,
        filteredTask,
    } = useContext(TasksContext)

    const hasTasks = tasks.length > 0

    const isEmptyFilteredTasks = filteredTask?.length === 0

    if(!hasTasks) {
        return (<div className={styles.emptyMessage}>Задач пока нет <br/>Добавьте вашу задачу</div>)
    } 

    if(hasTasks && isEmptyFilteredTasks) {
        return (<div className={styles.emptyMessage}>Задача не найдена</div>)

    }
    
    return (
        <ul className={styles.list}>
      { (filteredTask ?? tasks).map((task) => (
        <TodoItem 
            className = {styles.item}
            key = {task.id}
            {...task}
        />
      ))}
        
      </ul>
    )
}

export default memo(TodoList)