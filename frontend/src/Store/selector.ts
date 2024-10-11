import { selector } from "recoil";
import { todoListFilterState, todolistState } from "./atom";

export const filterTodoselector= selector({

key :'FilterTodoList',
get :({get}) => {
    const filter = get(todoListFilterState);
    const list = get(todolistState);

    switch (filter){
      case 'Important' :
        return list.filter((item)=>item.isImportant)
      case 'Completed':
        return list.filter((item)=> item.isComplete);

      case 'Not Completed':
        return list.filter((item)=> !item.isComplete);
        
      default :  
        return list;
    }
}

})

