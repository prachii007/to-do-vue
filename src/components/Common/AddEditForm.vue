<script setup>
const props = defineProps({
    taskName: String,
    taskDescription: String,
    taskPriority: String,
    feature:String
})
const emit = defineEmits(['update-task', 'add-task']);

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
                    @input="$emit('update-task', 'description', $event.target.value)" />
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
            <button @click="$emit('add-task')" className='btn btn-success submit-button'> Submit</button>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>