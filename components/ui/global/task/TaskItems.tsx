import React from 'react'
import {motion} from "framer-motion"
import { Task } from '@/types/Task'
import SingleTask from './SingleTask'

type Props  = {
    tasks: Task[]
}

const TaskItems = ({tasks}:Props) => {
  return         <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  className="mb-12"
>
  <h2 className="text-xl font-bold mb-4">What I Do</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {tasks.map((task) => (
      <SingleTask {...task} />
    ))}
  </div>
</motion.div>
}

export default TaskItems