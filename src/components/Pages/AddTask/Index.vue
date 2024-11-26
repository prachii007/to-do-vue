<script setup>
import AddEditForm from '@/components/Common/AddEditForm.vue';
import { ref } from 'vue'

const taskName = ref('')
const taskDescription = ref('')
const taskPriority = ref('Low')
const taskList = ref(JSON.parse(localStorage.getItem('todos')) || [])

const handleAdd = () => {
    if (taskName.value !== "") {
        const taskInfo = {
            task: taskName.value,
            description: taskDescription.value,
            priority: taskPriority.value,
            isChecked: false,
            id: Date.now(),
            date: new Date().toISOString(),
        }
        taskList.value.push(taskInfo)
        localStorage.setItem('todos', JSON.stringify(taskList.value))

        taskName.value = '';
        taskDescription.value = '';
        taskPriority.value = '';
    }
}

// To update the state of parent from the child component
const updateTaskField = (field, value) => {
    if (field === 'name') taskName.value = value;
    if (field === 'description') taskDescription.value = value;
    if (field === 'priority') taskPriority.value = value;
}

// We use emit event from child if the child is used in multiple parent components
// We cannot use v-model in this case. We use both value and @input instead
</script>

<template>
    <AddEditForm 
    :task-name="taskName"
    :task-description="taskDescription"
    :task-priority="taskPriority"
    @update-task="updateTaskField"
    @add-task="handleAdd"
    feature="Add"/>
</template>

<style lang="scss" scoped></style>