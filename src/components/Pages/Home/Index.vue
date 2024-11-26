<script setup>
import classNames from 'classnames'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router' // use useRouter to go to new page, not useRoute

const router = useRouter()
const action = ref('all')

const todosFromLS = ref(
  (JSON.parse(localStorage.getItem('todos')) || []).map(task => ({
    ...task,
    date: new Date(task.date) // Convert date strings back to Date objects
  }))
)

const filteredTodos = computed(() => {
  switch (action.value) {
    case 'unchecked':
      return todosFromLS.value.filter(todo => !todo.isDone)
    case 'checked':
      return todosFromLS.value.filter(todo => todo.isDone)
    default:
      return todosFromLS.value
  }
})

const updateLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todosFromLS.value))
}

const handleAdd = () => {
  router.push({ name: 'add' }) // Navigate to the Add Task page
}

const handleEdit = (todo) => {
  router.push({ name: 'edit', params: { id: todo.id } }) // Navigate to the Edit Task page
}

const handleCheck = (todo) => {
  todo.isDone = !todo.isDone //the todo here is the same todo object in filteredTodo and todoFromLS because they both share the same references
  updateLocalStorage()
}

const handleDelete = todo => {
  todosFromLS.value = todosFromLS.value.filter(t => t !== todo)
  updateLocalStorage()
}

</script>

<template>
  <div class="">
    <h1 class="text-center">Task List</h1>
    <div class="row">
      <div>
        <btn @click="handleAdd" class="btn btn-danger">Add Task</btn>
        <div class="btn btn-group">
          <button class="btn btn-primary" @click="action = 'all'">Show All</button>
          <button class="btn btn-warning" @click="action = 'unchecked'">Show Unchecked</button>
          <button class="btn btn-success" @click="action = 'checked'">Show Checked</button>
        </div>
        <div>
          <label for="sortOrder">Sort Order</label>
          <select id="sortOrder" class="form-select">
            <option value="asc">Ascending</option>
            <option value="desc">Desceding</option>
          </select>
        </div>
        <div>
          <label for="priorityOrder">Priority Order</label>
          <select id="priorityOrder" class="form-select">
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
      <div>
        <h2>Show</h2>
        <div class="card mb-2" v-for="todo in filteredTodos" :key="todo.id">
          <div class="card-header d-flex justify-content-between">
            <div>Task To Do</div>
            <div>Date {{ todo.date.toLocaleString() }}</div>
          </div>
          <div class="card-body">
            <div class="d-flex">
              <input type="checkbox" class="form-input me-2" @click="handleCheck(todo)" :checked="todo.isDone" />
              <label>{{ todo.taskName }}</label>
            </div>
            <div>{{ todo.taskDescription }}</div>
            <div :class="{
              'text-decoration-line-through text-success': todo.isDone,
              'text-danger': !todo.isDone
            }">
              Status:
              {{ todo.isDone ? "Completed" : "Incomplete" }}
            </div>
            <div :class="{
              'border btn btn-danger': todo.taskPriority === 'High',
              'border btn btn-warning': todo.taskPriority === 'Medium',
              'border btn btn-success': todo.taskPriority === 'Low'
            }">Priority: {{ todo.taskPriority }}</div>
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