import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import { Review } from "@/types/review";



const SingleReview = ({ id, name, rating, text }: Review) => {
  return (
    <Card key={id} className="p-4">
      <div className="flex items-center mb-2">
        <Avatar
          src="/placeholder.svg?height=50&width=50"
          alt={name}
          size="sm"
          className="mr-2"
        />
        <div>
          <div className="font-medium">{name}</div>
          <Rating value={rating} size="sm" />
        </div>
      </div>
      <p className="text-gray-700">{text}</p>
    </Card>
  );
};

export default SingleReview
