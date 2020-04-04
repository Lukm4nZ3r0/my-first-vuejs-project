import Vue from 'vue'
import Vuex, { Commit } from 'vuex'
import router from '../router/index'

Vue.use(Vuex)

type Todo = {
  key: number;
  todo: string;
  date: Date;
  isFinish: boolean;
  isEditable: boolean;
  tasks: Array<Task>;
}

type Task = {
  key: number;
  task: string;
  isEditable: boolean;
  date: Date;
}

interface State{
  isLoading: boolean;
  isLogin: boolean;
  loginName: string | null;
  todos: Array<Todo>;
}

interface SetTodosParam{
  commit: Commit;
  state: State;
}

interface TodoWithKey{
  todo: Todo;
  key: number;
}

interface TaskWithKey{
  task: Task;
  key: number;
}

const initialTodos: Array<Todo> = [
  {
    key:0,
    todo:'List hari ini',
    date:new Date("Sun Feb 23 2020 12:15:20 GMT+0700 (Western Indonesia Time)"),
    isFinish: false,
    isEditable: false,
    tasks: [
      {
        key:0,
        task:"Nyuci Piring",
        isEditable: false,
        date:new Date("Sun Feb 23 2020 12:15:20 GMT+0700 (Western Indonesia Time)")
      },
      {
        key:1,
        task:"Ngepel",
        isEditable: false,
        date:new Date("Sun Feb 23 2020 12:15:20 GMT+0700 (Western Indonesia Time)")
      },
    ]
  },
  {
    key:1,
    todo:'List hari esok',
    date:new Date("Sun Feb 23 2020 12:15:20 GMT+0700 (Western Indonesia Time)"),
    isFinish: false,
    isEditable: false,
    tasks: [
      {
        key:0,
        task:"Makan",
        isEditable: false,
        date:new Date("Sun Feb 23 2020 12:15:20 GMT+0700 (Western Indonesia Time)")
      },
      {
        key:1,
        task:"Minum",
        isEditable: false,
        date:new Date("Sun Feb 23 2020 12:15:20 GMT+0700 (Western Indonesia Time)")
      },
    ]
  },
  {
    key:2,
    todo:'lusa ..',
    date:new Date("Sun Feb 23 2020 12:15:20 GMT+0700 (Western Indonesia Time)"),
    isFinish: false,
    isEditable: false,
    tasks: []
  }
]

const initialState: State = {
  isLoading:false,
  isLogin:false,
  loginName: null,
  todos: initialTodos
}

export default new Vuex.Store({
  state: initialState,
  mutations: {
    ADD_NEW_TODO: (state: State, newTodo: Todo): void => {
      state.todos = [...state.todos, newTodo]
    },
    EDIT_TODO: (state: State, todoWithKey: TodoWithKey): void => {
      const newTodos: Array<Todo> = state.todos.slice();
      console.log('todoWithKey.todo',todoWithKey.todo)
      newTodos.map((todo: Todo)=>{
        if(todo.key === todoWithKey.key){
          todo = todoWithKey.todo;
          console.log('setTodo',todo)
        }
      })
      console.log('newTodos',newTodos)
      state.todos = newTodos;
    },
    ADD_TASK_TODO: (state: State, taskWithKey: TaskWithKey): void => {
      const newTodos: Array<Todo> = state.todos.slice();
      newTodos[taskWithKey.key].tasks = [...newTodos[taskWithKey.key].tasks, {
        ...taskWithKey.task,
        key: newTodos[taskWithKey.key].tasks.length,
        isEditable: false
      }]
      console.log('newTodos',newTodos)
      state.todos = newTodos;
    },
    DELETE_TODO: (state: State, indexTodo: number): void => {
      const newTodos: Array<Todo> = state.todos.slice();
      newTodos.filter((todo: Todo, index: number)=> index !== indexTodo )
      state.todos = newTodos;
    },
    LOGIN: (state: State, loginName: string): void => {
      state.loginName = loginName;
    },
    LOGOUT: (state: State): void => {
      state.loginName = null;
    }
  },
  actions: {
    addNewTodo: ({commit, state}: SetTodosParam, newTodo: Todo): void =>{
      state.isLoading = true;
      setTimeout(()=>{
        commit('ADD_NEW_TODO', newTodo);
        state.isLoading = false;
      },1000)
    },
    editTodo: ({commit, state}: SetTodosParam, todoWithKey: TodoWithKey): void =>{
      state.isLoading = true;
      new Promise((resolve)=>{
        setTimeout(()=>{
          commit('EDIT_TODO', todoWithKey)
          state.isLoading = false;
          resolve();
        },1000)
      })
    },
    addTaskTodo: ({commit, state}: SetTodosParam, taskWithKey: TaskWithKey): void =>{
      state.isLoading = true;
      new Promise((resolve)=>{
        setTimeout(()=>{
          resolve(commit('ADD_TASK_TODO', taskWithKey));
          state.isLoading = false;
        },1000)
      })
    },
    deleteTodo: ({commit, state}: SetTodosParam, indexTodo: number): void =>{
      state.isLoading = true;
      setTimeout(()=>{
        commit('DELETE_TODO', indexTodo);
        state.isLoading = false;
      },1000)
    },
    login: ({commit,state}: SetTodosParam, loginName: string): void =>{
      state.isLoading = true;
      setTimeout(()=>{
        commit('LOGIN', loginName);
        state.isLogin = true;
        state.isLoading = false;
        router.push({ 
          name: 'Todos', 
        })
      },1000)
    },
    logout: ({commit,state}: SetTodosParam): void =>{
      state.isLoading = true;
      setTimeout(()=>{
        commit('LOGOUT');
        state.isLogin = false;
        state.isLoading = false;
      },1000)
    },
  },
  modules: {
  },
  getters:{
    isLoading:(state: State) => state.isLoading,
    isLogin:(state: State) => state.isLogin,
    loginName: (state: State) => state.loginName,
    todos: (state: State) => state.todos,
    taskTodos: (state: State) => (key: number) => state.todos.find((item)=>item.key === key)
  },
})
