const {Router} = require('express')
const listController = require('../controller/listsController')
const {authorizationMiddlewareAll} = require('../middleware/authorizationMiddleware')

const router = Router();

//HTTP Method

//Post Book
router.post('/', authorizationMiddlewareAll, listController.createList)

//Get Book
router.get('/', authorizationMiddlewareAll, listController.getAllList)

//Put Book
router.put('/:id', authorizationMiddlewareAll, listController.updateList)

//Delete Book
router.delete('/:id', authorizationMiddlewareAll, listController.deleteList)

module.exports = router;