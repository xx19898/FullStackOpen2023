const express = require('express');
const router = express.Router();
const { Todo } = require('../mongo')
const {getAsync,setAsync} = require('../redis/index')
const configs = require('../util/config')
const redis = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  visits++
  let currTodosAmountRedisCache = await getAsync('added_todos')
  console.log({currTodosAmountRedisCache})
  console.log({status:isNaN(currTodosAmountRedisCache)})
  if(isNaN(currTodosAmountRedisCache) || !currTodosAmountRedisCache){
      const currTodos = await Todo.find({})
      await setAsync('added_todos',currTodos.length)
      res.send({
        added_todos:currTodos.length
      });
  }else{
    res.send({
      added_todos:currTodosAmountRedisCache
    });
  }
});

module.exports = router;
