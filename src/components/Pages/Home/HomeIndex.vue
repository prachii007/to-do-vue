<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router' // use useRouter to go to new page, not useRoute

const router = useRouter()
const action = ref('All')
const sortOrder = ref('desc')
const priorityOrder = ref(['All'])
const tags = ref([])

const todosFromLS = ref(
  (JSON.parse(localStorage.getItem('todos')) || []).map(task => ({
    ...task,
    date: new Date(task.date),// Convert date strings back to Date objects
    taskDue: new Date(task.taskDue)
  }))
)

const filteredTodos = computed(() => {

  let result = [...todosFromLS.value];

  // Filter by status
  if (action.value === 'Checked') {
    result = result.filter(todo => todo.isDone);
  } else if (action.value === 'Unchecked') {
    result = result.filter(todo => !todo.isDone);
  }

  // Filter by priority
  if (!priorityOrder.value.includes('All') && priorityOrder.value.length > 0) {
    result = result.filter(todo => priorityOrder.value.includes(todo.taskPriority));
  }

  // Filter by tags
  if (tags.value.length > 0) {
    result = result.filter(todo =>
      tags.value.some(tag => todo.taskTags.includes(tag))
    );
  }
  // Sort by date
  result.sort((a, b) =>
    sortOrder.value === 'desc' ? b.date - a.date : a.date - b.date
  );

  return result;
});

console.log('todos', filteredTodos.value)
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

const handleDeleteAll = () => {
  todosFromLS.value = []
  updateLocalStorage()
}

const handlePriorityCheck = (priority) => {
  if (priority === 'All') {
    if (priorityOrder.value.includes('All')) {
      priorityOrder.value = []; // Uncheck all
    } else {
      priorityOrder.value = ['All']; // Select all
    }
  } else {
    const contains = priorityOrder.value.includes(priority);
    if (contains) {
      priorityOrder.value = priorityOrder.value.filter(x => x !== priority);
    } else {
      priorityOrder.value.push(priority);
    }
    // If any specific priority is selected, remove "All"
    priorityOrder.value = priorityOrder.value.filter(x => x !== 'All');
  }
}

const handleTagsCheck = (tag) => {
  const contains = tags.value.includes(tag);
  if (contains) {
    tags.value = tags.value.filter(x => x !== tag);
  } else {
    tags.value.push(tag);
  }
}

console.log(sortOrder.value)
</script>

<template>
  <div class="">
    <h1 class="text-center">Task List</h1>
    <div class="row">
      <div>
        <button @click="handleAdd" class="btn btn-danger">Add Task</button>
        <div class="btn btn-group">
          <button class="btn btn-primary" @click="action = 'All'">Show All</button>
          <button class="btn btn-warning" @click="action = 'Unchecked'">Show Unchecked</button>
          <button class="btn btn-success" @click="action = 'Checked'">Show Checked</button>
        </div>
        <div class="d-flex">
          <div for="sortOrder">Date of creation : </div>
          <div class="d-flex">
            <div class="mx-2 d-flex">
              <label>Latest</label>
              <input type="radio" name="sortOrder" value="desc" class="form-check ms-2" v-model="sortOrder" />
            </div>
            <div class="d-flex">
              <label>Oldest</label>
              <input type="radio" name="sortOrder" value="asc" class="form-check ms-2" v-model="sortOrder" />
            </div>
          </div>
        </div>
        <div class="d-flex">
          <div class="me-4">
            <label for="priorityOrder">Priority</label>
            <div class="d-flex">
              <input type="checkbox" id="High" class="form-check mx-2" @change="handlePriorityCheck('High')"
                :checked="priorityOrder.includes('High')" />
              <label htmlFor="High">High</label>
            </div>
            <div class="d-flex">
              <input type="checkbox" id="Medium" class="form-check mx-2" @change="handlePriorityCheck('Medium')"
                :checked="priorityOrder.includes('Medium')" />
              <label htmlFor="Medium">Medium</label>
            </div>
            <div class="d-flex">
              <input type="checkbox" id="Low" class="form-check mx-2" @change="handlePriorityCheck('Low')"
                :checked="priorityOrder.includes('Low')" />
              <label htmlFor="Low">Low</label>
            </div>
            <div class="d-flex">
              <input type="checkbox" id="All" class="form-check mx-2" @change="handlePriorityCheck('All')"
                :checked="priorityOrder.includes('All')" />
              <label htmlFor="All">All</label>
            </div>
          </div>
          <div>
            <label for="tags">Tags</label>
            <div class="d-flex">
              <input type="checkbox" id="study" class="form-check mx-2" @change="handleTagsCheck('study')"
                :checked="tags.includes('study')" />
              <label htmlFor="study">study</label>
            </div>
            <div class="d-flex">
              <input type="checkbox" id="work" class="form-check mx-2" @change="handleTagsCheck('work')"
                :checked="tags.includes('work')" />
              <label htmlFor="work">work</label>
            </div>
            <div class="d-flex">
              <input type="checkbox" id="shopping" class="form-check mx-2" @change="handleTagsCheck('shopping')"
                :checked="tags.includes('shopping')" />
              <label htmlFor="shopping">shopping</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="d-flex justify-content-center mt-4">
          <h2>{{ action }} Tasks ({{ filteredTodos.length }})</h2>
          <button class="btn btn-danger ms-2" @click="handleDeleteAll">Delete All</button>
        </div>
        <div class="card mb-2" v-for="todo in filteredTodos" :key="todo.id">
          <div class="card-header d-flex justify-content-between">
            <div class="text-success">Created {{ todo.date.toLocaleString() }}</div>
            <div class="text-danger">Due {{ todo.taskDue.toLocaleString() }}</div>
          </div>
          <div class="card-body">
            <div class="d-flex">
              <input type="checkbox" class="form-input me-2" @click="handleCheck(todo)" :checked="todo.isDone" />
              <label>{{ todo.taskName }}</label>
            </div>
            <div>{{ todo.taskDescription }}</div>
            <small class="text-success">Notes: {{ todo.taskNotes }}</small>
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
          <div class="card-footer d-flex justify-content-between">
            <div class="d-flex">
              <div class="align-content-center me-2"> Tags : </div>
              <div v-for="tags in todo.taskTags" :key="tags" class="me-2 btn btn-success btn-small">
                {{ tags }}
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <button class="btn btn-primary me-2" @click="handleEdit(todo)">Edit</button>
              <button class="btn btn-warning" @click="handleDelete(todo)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
