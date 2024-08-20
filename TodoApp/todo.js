let todoId = 1; // 아이디 초기값 설정

        // 페이지 로드 시 저장된 투두 리스트 불러오기
        window.onload = function() {
            const storedTodos = JSON.parse(localStorage.getItem('todos'));
            if (storedTodos) {
                storedTodos.forEach(todo => {
                    addTodoToList(todo.text, todo.id);
                    todoId = Math.max(todoId, todo.id + 1); // 최대 아이디 업데이트
                });
            }
        };

        function addTodo() {
            const todoInput = document.getElementById('todoInput');
            const todoText = todoInput.value.trim();

            if (todoText === '') {
                alert('할일을 입력하세요!');
                return;
            }

            addTodoToList(todoText, todoId);

            // localStorage에 추가
            saveTodoToStorage(todoText, todoId);
            todoInput.value = ''; // 입력 필드 초기화
            todoId++; // 아이디 증가
        }

        function addTodoToList(todoText, id) {
            const todoList = document.getElementById('addTodo');
            const li = document.createElement('li');

            // Todo 항목 생성
            li.innerHTML = `
                <div>${id}. ${todoText}</div>
                <button class="deleteBtn" onclick="deleteTodo(${id})">X</button>
            `;
            li.setAttribute('data-id', id); // 데이터 아이디 설정
            todoList.appendChild(li);
        }

        function saveTodoToStorage(todoText, id) {
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos.push({ text: todoText, id: id });
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        function deleteTodo(id) {
            const todoList = document.getElementById('addTodo');
            const items = todoList.getElementsByTagName('li');

            for (let i = 0; i < items.length; i++) {
                if (items[i].getAttribute('data-id') == id) {
                    todoList.removeChild(items[i]);
                    break;
                }
            }

            // localStorage에서 삭제
            removeTodoFromStorage(id);
            updateTodoNumbers(); // 삭제 후 번호 업데이트
        }

        function removeTodoFromStorage(id) {
            let todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos = todos.filter(todo => todo.id !== id);
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        function updateTodoNumbers() {
            const todoList = document.getElementById('addTodo');
            const items = todoList.getElementsByTagName('li');

            for (let i = 0; i < items.length; i++) {
                items[i].children[0].innerHTML = `${i + 1}. ${items[i].children[0].innerHTML.split('. ')[1]}`;
            }
        }