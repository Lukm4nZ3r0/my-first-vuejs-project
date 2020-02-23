import Vue from 'vue'
import Vuex, { Commit } from 'vuex'

Vue.use(Vuex)

interface Todo {
  key: number;
  todo: string;
  date: Date;
  isFinish: boolean;
  doingByUsers: Array<User>;
}

interface User{
  name: string;
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

const initialTodos: Array<Todo> = [
  {
    key:0,
    todo:'My First Todo',
    date:new Date("Sun Feb 23 2020 12:15:20 GMT+0700 (Western Indonesia Time)"),
    isFinish: false,
    doingByUsers: [
      {
        name:"Asep",
        date:new Date("Sun Feb 23 2020 12:15:20 GMT+0700 (Western Indonesia Time)")
      },
      {
        name:"Hakim",
        date:new Date("Sun Feb 23 2020 12:15:20 GMT+0700 (Western Indonesia Time)")
      },
    ]
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
      newTodos.map((todo: Todo)=>{
        if(todo.key === todoWithKey.key){
          todo = todoWithKey.todo;
        }
      })
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
      setTimeout(()=>{
        commit('EDIT_TODO', todoWithKey);
        state.isLoading = false;
      },1000)
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
  }
})
