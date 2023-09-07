
        // Modal
        const openModal = () => document.getElementById('modal').classList.add('active');
        const closeModal = () => document.getElementById('modal').classList.remove('active');
        
        // CRUD
        const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) || [];
        const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));
        
        const numeroPaginasInput = document.getElementById('numeroPaginas');
        numeroPaginasInput.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, ''); 
        });
        
        // CRUD - Delete
        const deleteClient = (index) => {
            const dbClient = readClient();
            dbClient.splice(index, 1);
            setLocalStorage(dbClient);
        };
        
        // CRUD - Update
        const updateClient = (index, client) => {
            const dbClient = readClient();
            dbClient[index] = client;
            setLocalStorage(dbClient);
        };
        
        // CRUD - Read
        const readClient = () => getLocalStorage();
        
        // CRUD - Create
        const createClient = (client) => {
            const dbClient = getLocalStorage();
            dbClient.push(client);
            setLocalStorage(dbClient);
        };
        
        const isValidFields = () => {
            const titulo = document.getElementById('titulo').value;
            const autor = document.getElementById('autor').value;
            const editor = document.getElementById('editor').value;
            const numeroPaginas = document.getElementById('numeroPaginas').value;
        
            if (titulo.trim() === '' || autor.trim() === '' || editor.trim() === '' || numeroPaginas.trim() === '') {
                alert('Por favor, preencha todos os campos.');
                return false;
            }
        
            return true;
        };
        
        // INTERAÇÕES
        const clearInputFields = () => {
            document.getElementById('titulo').value = '';
            document.getElementById('autor').value = '';
            document.getElementById('editor').value = '';
            document.getElementById('numeroPaginas').value = '';
            document.getElementById('form').dataset.id = '0';
        };

        class idBook {
            constructor(titulo, autor, editor, numeroPaginas) {
                this.titulo = titulo,
                this.autor = autor,
                this.editor = editor,
                this.numeroPaginas = numeroPaginas
            }
        }
        
        const saveClient = () => {
            if (isValidFields()) {
                const client = new idBook(
                    document.getElementById('titulo').value,
                    document.getElementById('autor').value,
                    document.getElementById('editor').value,
                    document.getElementById('numeroPaginas').value
                );
        
                const index = document.getElementById('form').dataset.id;
        
                if (index === '0') {
                    createClient(client);
                } else {
                    updateClient(index, client);
                }
        
                updateTable();
                closeModal();
            }
        };
        
        const clearTable = () => {
            const rows = document.querySelectorAll('#tableClient>tbody>tr');
            rows.forEach((row) => row.remove());
        };
        
        const createRow = (client, index) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${client.titulo}</td>
                <td>${client.autor}</td>
                <td>${client.editor}</td>
                <td>${client.numeroPaginas}</td>
                <td>
                    <button class="edit-button green" data-index="${index}">Editar</button>
                    <button class="delete-button red" data-index="${index}">Excluir</button>
                </td>
            `;
        
            document.querySelector('#tableClient>tbody').appendChild(newRow);
        };
        
        const updateTable = () => {
            const dbClient = readClient();
            clearTable();
            dbClient.forEach((client, index) => createRow(client, index));
        
            const editButtons = document.querySelectorAll('.edit-button');
            editButtons.forEach((button) => {
                button.addEventListener('click', (event) => {
                    const index = event.target.getAttribute('data-index');
                    editClient(index);
                });
            });
        
            const deleteButtons = document.querySelectorAll('.delete-button');
            deleteButtons.forEach((button) => {
                button.addEventListener('click', (event) => {
                    const index = event.target.getAttribute('data-index');
                    deleteClient(index);
                    updateTable(); 
                });
            });
        };
        
        const fillFields = (client) => {
            document.getElementById('titulo').value = client.titulo;
            document.getElementById('autor').value = client.autor;
            document.getElementById('editor').value = client.editor;
            document.getElementById('numeroPaginas').value = client.numeroPaginas;
            document.getElementById('form').dataset.id = client.index;
        };
        
        const editClient = (index) => {
            const dbClient = readClient();
            const client = dbClient[index];
            document.getElementById('titulo').value = client.titulo;
            document.getElementById('autor').value = client.autor;
            document.getElementById('editor').value = client.editor;
            document.getElementById('numeroPaginas').value = client.numeroPaginas;
        
            openModal();
        
            const saveButton = document.getElementById('salvar');
            saveButton.removeEventListener('click', saveClient); 
        
            saveButton.addEventListener('click', () => {
                const editedClient = new idBook(
                    document.getElementById('titulo').value,
                    document.getElementById('autor').value,
                    document.getElementById('editor').value,
                    document.getElementById('numeroPaginas').value
                );
        
                updateClient(index, editedClient);
                updateTable(); 
                closeModal();
            });
        };
        
        // Eventos
        document.getElementById('salvar').addEventListener('click', saveClient);
        document.getElementById('addBook').addEventListener('click', () => {
            clearInputFields();
            openModal();
        });
        
        document.getElementById('modalClose').addEventListener('click', closeModal);
        document.getElementById('cancelar').addEventListener('click', closeModal);
        
        updateTable();
