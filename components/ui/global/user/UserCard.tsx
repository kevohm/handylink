import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { User } from "@/types/user";
import { motion } from "framer-motion";

const UserCard = ({ ...user }: Pick<User,  "id" | "about" | "gender" | "rating" | "name">) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center mb-12"
    >
      <Avatar
        src="/placeholder.svg?height=200&width=200"
        alt={user.name}
        size="xl"
        className="mb-4"
      />
      <h1 className="text-sm text-grey mb-1">
        {user.name} • {user.gender}
      </h1>
      <Rating value={user.rating} className="mb-2" />
      <p className="text-gray-600 max-w-md">{user.about}</p>
    </motion.div>
  );
};

export default UserCard;
