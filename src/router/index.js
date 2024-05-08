import { createRouter, createWebHistory} from 'vue-router'
import MathData from '../views/MathData.vue'
import StudentData from '../views/StudentData.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/~xkubala/hanba/',
        name: 'MathData',
        component: MathData
      },
      {
        path: '/~xkubala/hanba/student-data/',
        name: 'Student-Marks',
        component: StudentData
      }
    ]
  })
  
  export default router