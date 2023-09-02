// Modal
const openModal = () => document.getElementById('modal').classList.add('active');

const closeModal = () => document.getElementById('modal').classList.remove('active');

// CRUD
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) || [];

const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));

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

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            titulo: document.getElementById('titulo').value,
            autor: document.getElementById('autor').value,
            editor: document.getElementById('editor').value,
            numeroPaginas: document.getElementById('numeroPaginas').value,
        };

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
            <input type="button" class="button green" id="edit-${index}" value="Editar">
            <input type="button" class="button red" id="delete-${index}" value="Apagar">
        </td>
    `;

    document.querySelector('#tableClient>tbody').appendChild(newRow);

    const editButton = document.getElementById(`edit-${index}`);
    const deleteButton = document.getElementById(`delete-${index}`);

    editButton.addEventListener('click', () => {
        editClient(index);
    });

    deleteButton.addEventListener('click', () => {
        const response = confirm(`Deseja realmente tirar o livro ${client.titulo} da estante?`);
        if (response) {
            deleteClient(index);
            updateTable();
        }
    });
};

const updateTable = () => {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach((client, index) => createRow(client, index));
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
    document.getElementById('form').dataset.id = index; 

    openModal(); 

    document.getElementById('salvar').addEventListener('click', () => {
        const editedClient = {
            titulo: document.getElementById('titulo').value,
            autor: document.getElementById('autor').value,
            editor: document.getElementById('editor').value,
            numeroPaginas: document.getElementById('numeroPaginas').value
        };

        const editedIndex = document.getElementById('form').dataset.id;

        updateClient(editedIndex, editedClient);

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

