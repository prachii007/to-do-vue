<script setup>
import classNames from 'classnames'
import { ref } from 'vue'
import { useRouter } from 'vue-router' // use useRouter to go to new page, not useRoute

const router = useRouter()
const todos = ref(JSON.parse(localStorage.getItem('todos')) || [])

const handleAdd = () => {
  router.push({ name: 'add' }) // Navigate to the Add Task page
}

const handleEdit = (todo) => {
  router.push({ name: 'edit', params: { id: todo.id } });
}

const handleDelete = (todo) => {
  const data = todos.value.filter(x => x.id !== todo.id)
  todos.value = data
  localStorage.setItem('todos', JSON.stringify(data))
}

const handleCheck = (todo) => {
  const index = todos.value.indexOf(todo)
  todos.value[index].isDone = !todos.value[index].isDone
}

</script>

<template>
  <div class="">
    <h1 class="text-center">Task List</h1>
    <div class="row">
      <div>
        <btn @click="handleAdd" class="btn btn-danger" href="#/add-task">Add Task</btn>
        <div class="btn btn-group">
          <button class="btn btn-primary">Show All</button>
          <button class="btn btn-warning">Show Unchecked</button>
          <button class="btn btn-success">Show Checked</button>
        </div>
        <div>
          <label> Sort Order </label>
          <select class="form-select">
            <option value="asc">Ascending</option>
            <option value="desc">Desceding</option>
          </select>
        </div>
        <div>
          <div>Priority Order</div>
          <select class="form-select">
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
      <div>
        <h2>Show</h2>
        <div class="card mb-2" v-for="todo in todos" :key="todo.id">
          <div class="card-header d-flex justify-content-between">
            <div>Task To Do</div>
            <div>Date {{ todo.id }}</div>
          </div>
          <div class="card-body">
            <div class="d-flex">
              <input type="checkbox" class="form-input me-2" @click="handleCheck(todo)" :checked="todo.isDone" />
              <label>{{ todo.taskName }}</label>
            </div>
            <div>{{ todo.taskDescription }}</div>
            <div :class="classNames({
              'text-decoration-line-through text-success': todo.isDone,
              'text-danger': !todo.isDone
            })">
              Status:
              {{ todo.isDone ? "Completed" : "Incomplete" }}
            </div>
            <div :class="classNames({
              'border btn btn-danger': todo.taskPriority === 'High',
              'border btn btn-warning': todo.taskPriority === 'Medium',
              'border btn btn-success': todo.taskPriority === 'Low'
            })">Priority: {{ todo.taskPriority }}</div>
          </div>
          <div class="card-footer d-flex justify-content-end">
            <button class="btn btn-primary me-2" @click="handleEdit(todo)">Edit</button>
            <button class="btn btn-warning" @click="handleDelete(todo)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>