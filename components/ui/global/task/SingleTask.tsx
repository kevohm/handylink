import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Task } from "@/types/task";
type Props = Task
const SingleTask = ({ ...task }:Props) => {
  return (
    <Card key={task.id} className="p-4">
      <div className="mb-2 text-sm text-gray-500">
        {task.category} • ${task.price} per task
      </div>
      <p className="mb-4">{task.description}</p>
      <Button variant="primary" fullWidth>
        Book Now
      </Button>
    </Card>
  );
};

export default SingleTask;
