"use client";

import React, { useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { PageContainer } from "@/components/ui/page-container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CategorySelect } from "@/components/ui/global/task/CategorySelect";

const categories = ["Cleaning", "Shopping", "Mount TV", "Plumbing"];

const AddTaskPage = () => {
  const [task, setTask] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (name: string, value: string) => {
    setTask({ ...task, [name]: value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!task.title || !task.price || !task.description || !task.category) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const { data } = await api.post("/api/tasks", {
        ...task,
        price: Number(task.price),
      });

      toast.success("Task added!");
      setTask({
        title: "",
        price: "",
        description: "",
        category: "",
      });
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <PageContainer maxWidth="md">
      <h1 className="text-2xl font-bold mb-6">Add New Task</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Task Title"
          name="title"
          placeholder="Enter task title"
          value={task.title}
          onChange={handleChange}
        />

        <Input
          label="Price"
          name="price"
          type="number"
          placeholder="Enter price"
          value={task.price}
          onChange={handleChange}
        />

        <CategorySelect
          value={task.category}
          onChange={(value) => handleSelectChange("category", value)}
          categories={categories}
        />
        <Textarea
          label="Description"
          name="description"
          placeholder="Describe the task..."
          value={task.description}
          onChange={handleChange}
        />

        <Button type="submit" variant="primary" fullWidth>
          Add Task
        </Button>
      </form>
    </PageContainer>
  );
};

export default AddTaskPage;
