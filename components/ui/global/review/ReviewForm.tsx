"use client"
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Rating } from '@/components/ui/rating'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'

interface Profile {
    name: string
    rating: number
}

const ReviewForm: React.FC<Profile> = ({ name, rating }) => {
    const [reviewText, setReviewText] = useState("")

    return (
        <Card className="p-4 mb-6">
            <div className="flex items-center mb-4">
                <Avatar src="/placeholder.svg?height=50&width=50" alt={name} size="sm" className="mr-2" />
                <div>
                    <div className="font-medium">{name}</div>
                    <Rating value={rating} size="sm" />
                </div>
            </div>

            <Textarea
                placeholder="Would you recommend me?"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="mb-4"
            />

            <Button variant="primary">Publish review</Button>
        </Card>
    )
}

export default ReviewForm