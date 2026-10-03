import { useEffect, useState } from "react"
import tasksAPI from "@/shared/api/tasks/index.js"
import styles from "./TaskPage.module.scss"

const TaskPage = (props) => {
    const { params } = props
    const taskId = params.id

    const [task, setTask] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        tasksAPI.getById(taskId)
            .then((taskData) => {
                setTask(taskData)
                setHasError(false)
            })
            .catch(() => {
                setHasError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    if(isLoading) {
        return <div className={styles.state}>Загрузка</div>   
    }

    if(hasError) {
        return <div className={styles.state}>Задача не найдена</div>
    }

    return(
        <div className={styles.page}>
            <h1 className={styles.title}>{task.title}</h1>
           <p className={styles.status}> {task.isDone ? 'Задача выполнена' : 'Задача не выполнена'}</p>
        </div>
    )
}

export default TaskPage