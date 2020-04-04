<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import moment from 'moment'

    interface Todo {
        key: number;
        todo: string;
        date: Date;
        isFinish: boolean;
        isEditable: boolean;
        tasks: Array<Task>;
    }

    interface Task{
        task: string;
        date: Date;
    }

    @Component
    export default class TodosComponent extends Vue {
        @Prop() private todos!: Array<Todo>;
        @Prop() private mantap!: string;
        taskInput: Array<string | undefined> = []
        isLoading = false
        message = 'OK!'

        mounted(): void{
            console.log(this.mantap)
        }

        dateExported(date: string): string{
            return moment(date).format('dddd, DD-MM-YYYY HH:mm:ss')
        }

        addTasks(index: number): void{
            if(this.taskInput[index]){
                this.isLoading = true
                this.$store.dispatch('addTaskTodo',{
                    task: {
                        task: this.taskInput[index],
                        date: new Date()
                    },
                    key: index
                }).then(()=>{
                    this.taskInput[index] = ''
                    this.isLoading = false
                })
            }
        }
    }
</script>

<template>
    <v-app>
        <v-card
            class="mx-auto"
            width="90%"
        >
            <v-list
                v-for="(todo,index) in this.todos" 
                v-bind:key="index"
            >
                <v-list-group
                    value="false"
                >
                    <template v-slot:activator>
                        <v-list-item-title>{{todo.todo}}</v-list-item-title>
                    </template>

                    <template 
                        v-for="(todoTasks,userIndex) in todo.tasks"
                    >
                        <v-list-item-content v-bind:key="userIndex">
                            <v-list-item-title v-text="todoTasks.task" />

                            <v-list-item-content>{{dateExported(todoTasks.date)}}</v-list-item-content>
                        </v-list-item-content>
                    </template>
                    <template>
                        <v-text-field label="Add Users" hide-details="auto" v-model="taskInput[index]" />
                        <v-btn color="success" block class="mt-2" tile @click="addTasks(index)" :disabled="isLoading">
                            {{isLoading ? "LOADING ..." : "ADD USERS"}}
                        </v-btn>
                    </template>
                </v-list-group>
            </v-list>
        </v-card>
    </v-app>
</template>
