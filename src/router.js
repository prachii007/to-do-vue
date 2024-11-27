// router.js
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './components/Pages/Home/HomeIndex.vue';
import AddTask from './components/Pages/AddTask/AddTaskIndex.vue';
import EditTask from './components/Pages/EditTask/Index.vue'
import NotFound from './components/Pages/NotFound.vue'; // Optional 404 page

// Define routes
const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/add-task', component: AddTask, name: 'add' },
    { path: '/edit/:id', component: EditTask, name: 'edit' },
    { path: '/:pathMatch(.*)*', component: NotFound }, // Catch-all for 404
];

// Create the router instance
const router = createRouter({
    history: createWebHashHistory(), // Using hash mode
    routes,
});

export default router;
