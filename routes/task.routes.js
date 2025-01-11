import { createTask, getTask, getAllTask, updateTask, deleteTask } from '../controllers/task.controller.js'
import { Router } from 'express'
import { validateToken, isTokenBlacklisted } from "../middleware/jwtUtils.js"

const router = Router()

router.post('/createTask', validateToken, isTokenBlacklisted, createTask)
router.get('/getTask', validateToken, isTokenBlacklisted, getTask)
router.get('/getAllTask', validateToken, isTokenBlacklisted, getAllTask)
router.patch('/:id', validateToken, isTokenBlacklisted, updateTask)
router.delete('/:id', validateToken, isTokenBlacklisted, deleteTask)

export default router