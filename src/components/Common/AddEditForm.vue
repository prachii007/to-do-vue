<script setup>
import { ref} from "vue"

const props = defineProps({
    taskName: String,
    taskDescription: String,
    taskPriority: String,
    feature: String,
    taskNotes: String,
    taskDue: String,
    taskTags: Array
})
const emit = defineEmits(["update-task", "add-task", "update-tags"]); // Add 'update-tags' event
const tags = ref([])

const handleCheck = (tag) => {
    const found = tags.value.includes(tag) // Check if tag is in the array
    if (found) {
        tags.value = tags.value.filter((x) => x !== tag) // Remove tag if already in array
    } else {
        tags.value.push(tag) // Add tag if not in array
    }
    emit("update-task", 'taskTags', tags.value);
}

</script>

<template>
    <div className='text-center mt-5'>
        <h1 className='my-5'> {{ feature }} Task</h1>
        <div className='task-div'>
            <div className='mb-5 row'>
                <label htmlFor='taskName' className='mb-2'>Task Name <span className='text-danger'>*</span></label>
                <input className='form-control' type='text' id='taskName' name='taskName' :value="taskName"
                    @input="$emit('update-task', 'name', $event.target.value)" />
            </div>
            <div className='mb-5 row'>
                <label htmlFor='taskDescription' className='mb-2'>Task Description</label>
                <textarea className='form-control' id='taskDescription' :value='taskDescription' rows={5}
                    placeholder='Write description of your task in detail here..'
                    @input="$emit('update-task', 'description', $event.target.value)"></textarea>
            </div>
            <div className='mb-5 row'>
                <label htmlFor='taskPriority' className='mb-2'>Priority Level</label>
                <select className='form-select' id='taskPriority' :value='taskPriority'
                    @change="$emit('update-task', 'priority', $event.target.value)">
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                </select>
            </div>
            <div>
                <label for="taskDue">Due Date</label>
                <input type="date" class="form-control" id="taskDue" :value="taskDue"
                    @input="$emit('update-task', 'taskDue', $event.target.value)" />
            </div>
            <div>
                <label for="taskNotes">Notes:</label>
                <textarea id="taskNotes" class="form-control" :value="taskNotes"
                    @input="$emit('update-task', 'taskNotes', $event.target.value)"></textarea>
            </div>
            <div>
                <label>Tags</label>
                <div class="d-flex">
                    <input type="checkbox" id="shopping" class="form-check me-2" :checked="tags.includes('shopping')"
                        @change="handleCheck('shopping')" />
                    <label htmlFor="shopping">Shopping</label>
                </div>
                <div class="d-flex">
                    <input type="checkbox" id="study" class="form-check me-2" :checked="tags.includes('study')"
                        @change="handleCheck('study')" />
                    <label htmlFor="study">Study</label>
                </div>
                <div class="d-flex">
                    <input type="checkbox" id="work" class="form-check me-2" :checked="tags.includes('work')"
                        @change="handleCheck('work')" />
                    <label htmlFor="work">Work</label>
                </div>
            </div>
            <button @click="$emit('add-task')" className='btn btn-success submit-button'> Submit</button>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>
