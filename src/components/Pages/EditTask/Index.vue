<script setup>
import AddEditForm from '@/components/Common/AddEditForm.vue'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router' // use useRoute to access params, not useRouter

const route = useRoute() //to access params
const router = useRouter() //to go to a route

const taskList = ref(JSON.parse(localStorage.getItem('todos')) || [])
const taskId = route.params.id // Access the ID from the route params

// Create a computed property for the selected task
const selectedTask = computed(() => {
    return taskList.value.find((task) => task.id == taskId)
})
// To update the state of parent from the child component
const updateTaskField = (field, value) => {
    if (field === 'name') selectedTask.value.taskName = value
    if (field === 'description') selectedTask.value.taskDescription = value
    if (field === 'priority') selectedTask.value.taskPriority = value
}

const handleEdit = () => {
    if (selectedTask.value.taskName !== "") {
        const taskInfo = {
            ...selectedTask.value,
            taskName: selectedTask.value.taskName,
            taskDescription: selectedTask.value.taskDescription,
            taskPriority: selectedTask.value.taskPriority,
        }
        const taskIndex = taskList.value.findIndex((task) => task.id == taskId)
        if (taskIndex !== -1) {
            taskList.value[taskIndex] = taskInfo
            localStorage.setItem('todos', JSON.stringify(taskList.value)) // Save to localStorage
        }
        router.push({ name: 'home' }) // Navigate to the home Task page
    }
}

</script>

<template>
    <AddEditForm v-if="selectedTask !== undefined" :task-name="selectedTask.taskName"
        :task-description="selectedTask.taskDescription" :task-priority="selectedTask.taskPriority" feature="Edit"
        @update-task="updateTaskField" @add-task="handleEdit" />
    <div v-else>Task with id = '{{ route.params.id }}' doesn't exist</div>
</template>

<style lang="scss" scoped></style>