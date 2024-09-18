const apiUrl = "http://localhost:3000/todos";

// Function to create a new to-do
async function createTodo(todo) {
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    });

    if (response.ok) {
        console.log("Todo created successfully");
        fetchTodos();  // Refresh the list after adding
    } else {
        console.error("Error creating todo", response.statusText);
    }
}

// Function to fetch all todos and display them
async function fetchTodos() {
    const response = await fetch(apiUrl);
    const todoListElement = document.getElementById('todoList');
    todoListElement.innerHTML = '';  

    if (response.ok) {
        const todos = await response.json();
        todos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.textContent = `${todo.task} - ${todo.done ? 'Completed' : 'Pending'}`;

            // Create a delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => deleteTodo(todo.id);  // Note: JSON Server uses "id" field

            // Append task and delete button to the list item
            todoItem.appendChild(deleteButton);
            todoListElement.appendChild(todoItem);
        });
    } else {
        console.error("Error fetching todos", response.statusText);
    }
}

// Function to update a specific todo (not used in this example but can be expanded)
async function updateTodo(id, updatedTodo) {
    const updateUrl = `${apiUrl}/${id}`;
    const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTodo)
    });

    if (response.ok) {
        console.log("Todo updated successfully");
        fetchTodos();  // Refresh the list after updating
    } else {
        console.error("Error updating todo", response.statusText);
    }
}

// Function to delete a specific todo
async function deleteTodo(id) {
    const deleteUrl = `${apiUrl}/${id}`;
    const response = await fetch(deleteUrl, {
        method: "DELETE"
    });

    if (response.ok) {
        console.log("Todo deleted successfully");
        fetchTodos();  // Refresh the list after deletion
    } else {
        console.error("Error deleting todo", response.statusText);
    }
}

// Add a new todo from the input field
function addNewTodo() {
    const newTask = document.getElementById('newTask').value;
    if (newTask.trim() !== "") {
        createTodo({ task: newTask, done: false });  // Add the new task
        document.getElementById('newTask').value = "";  // Clear the input field
    }
}

// Fetch todos on page load
fetchTodos();