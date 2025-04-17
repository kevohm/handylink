import { motion } from "framer-motion";
import ReviewForm from "./ReviewForm";
import SingleReview from "./SingleReview";
import { Review } from "@/types/review";

type Props = {
    reviews:Review[]
    name:string
    rating:number
}

const ReviewItems = ({ reviews, name, rating}:Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      <ReviewForm name={name} rating={rating} />
      <div className="grid grid-cols-3 gap-5">
        {reviews.map((review) => (
          <SingleReview {...review} />
        ))}
      </div>
    </motion.div>
  );
};

export default ReviewItems;
