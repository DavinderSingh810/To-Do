const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    id:
      {
        type: String,
         required: true,
          unique: true
      },
    text:
     { type: String,
       required: true
     },
  
    isComplete: 
    { type: Boolean,
      default: false 
    },
  
    isImportant:
  
    { type:Boolean,
      default:false
    }
  
  });
  
  const TodoModel = mongoose.model('Todo', todoSchema);
  
  export default TodoModel;