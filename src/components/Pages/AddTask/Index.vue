<script setup>
import AddEditForm from '@/components/Common/AddEditForm.vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const taskName = ref('')
const taskDescription = ref('')
const taskPriority = ref('Low')
const taskList = ref(JSON.parse(localStorage.getItem('todos')) || [])
const taskDue = ref('')
const taskNotes = ref('')
const taskTags = ref([])

const handleAdd = () => {
    if (taskName.value !== "") {
        const taskInfo = {
            taskName: taskName.value,
            taskDescription: taskDescription.value,
            taskPriority: taskPriority.value,
            isChecked: false,
            id: Date.now(),
            date: new Date().toISOString(),
            taskNotes: taskNotes.value,
            taskDue: new Date(taskDue.value).toISOString(),
            taskTags: taskTags.value
        }
        taskList.value.push(taskInfo)
        localStorage.setItem('todos', JSON.stringify(taskList.value))

        taskName.value = '';
        taskDescription.value = '';
        taskPriority.value = '';
        router.push({ name: 'home' }) // Navigate to the home Task page
    }
}

// To update the state of parent from the child component
const updateTaskField = (field, value) => {
    if (field === 'name') taskName.value = value;
    if (field === 'description') taskDescription.value = value;
    if (field === 'priority') taskPriority.value = value;
    if (field === 'taskDue') taskDue.value = value;
    if (field === 'taskNotes') taskNotes.value = value;
    if (field === 'taskTags') taskTags.value = value;
}

// We use emit event from child if the child is used in multiple parent components
// We cannot use v-model in this case. We use both value and @input instead
</script>

<template>
    <AddEditForm :task-name="taskName" :task-description="taskDescription" :task-priority="taskPriority"
        :task-due="taskDue" :task-notes="taskNotes" @update-task="updateTaskField" @add-task="handleAdd"
        feature="Add" />
</template>

<style lang="scss" scoped></style>