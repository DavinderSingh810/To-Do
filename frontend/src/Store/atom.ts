import { atom } from 'recoil';


export interface TodoItem {
  id: string;       
  text: string;     
  isComplete: boolean; 
  isImportant: boolean;
}

export const todolistState = atom<TodoItem[]>({
  key: 'todolistState',
  default: [],
});


export const todoListFilterState = atom<string>({
  key: 'TodoListFilter',
  default: 'All',
});
