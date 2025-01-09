import { createTask, getTask, getAllTask, updateTask, deleteTask } from '../controllers/task.controller.js'
import { Router } from 'express'
import { validateToken } from "../middleware/jwtUtils.js"

const router = Router()

router.post('/createTask', validateToken, createTask)
router.get('/getTask', validateToken, getTask)
router.get('/getAllTask', validateToken, getAllTask)
router.patch('/:id', validateToken, updateTask)
router.delete('/:id', validateToken, deleteTask)

export default router