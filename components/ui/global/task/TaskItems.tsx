import React from "react";
import { motion } from "framer-motion";
import SingleTask from "./SingleTask";
import { Task } from "@/types/task";
import { Button } from "../../button";
import Link from "next/link";
import { Plus } from "lucide-react";

type Props = {
  tasks: Task[];
};

const TaskItems = ({ tasks }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-12"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-4">What I Do</h2>

        <Link
          href={"/task/add"}
          className="rounded-full p-1 border border-green-light text-green-light hover:bg-green-light hover:text-green-dark"
        >
          {/* <Button variant="outline">Add Task</Button> */}

          <Plus className="w-4 h-4 " />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tasks.map((task, index) => (
          <SingleTask {...task} key={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default TaskItems;
