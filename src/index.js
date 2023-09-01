//Modal
const openModal = () => document.getElementById('modal')
    .classList.add('active');

const closeModal = () => {
    clearField()
    document.getElementById('modal').classList.remove('active')
}

// document.gatElementById('cadastrarCliente')
//      .addEventListener('click', openModal)
// document.gatElementById('modalClose')
//      .addEventListener('click', closeModal)

// CRUD
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []

const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

//CRUD - Delete
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

//CRUD - Update
const updateClient = (index, client) => {
    const dbClinet = readClient()
    dbClinet[index] = client
    setLocalStorage(dbClinet)
}

// CRUD - Read
const readClient = () => getLocalStorage()

//CRUD - Creat
const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
} 

const isVilidFields = () => {
    document.getElementById('form').reportValidity()
}

// INTERAÇÕES
const clearField = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => fields.value = "")
}

const saveClient = () => {
    if (isVilidFields()){
        const client = {
            titulo: document.getElementById('titulo').value,
            autor: document.getElementById('autor').value,
            editor: document.getElementById('editor').value,
            numeroPaginas: document.getElementById('numeroPaginas').value,
        }

        const index = document.getElementById('tilulo').dataset.index
        if (index == 'new'){
        createClient(client)
        updateTable()
        closeModal()
        }else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
        

    }
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const creatRow = (client) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td><img src="${livro.foto}"/></td>
        <td>${client.titulo}</td>
        <td>${client.autor}</td>
        <td>${client.editor}</td>
        <td>${client.numeroPaginas}</td>
        <td>
            <input type="button" class="button-green" id="edit-${index}" value="Editar">
            <input type="button" class="button-red" id="delete-${index}" value="Apagar">
        </td>
    `

    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(creatRow)
}

const fillFields = (client) => {
    document.getElementById('titulo').value = client.titulo
    document.getElementById('autor').value = client.autor
    document.getElementById('tradutor').value = client.tradutor
    document.getElementById('numeroEdicao').value = client.numeroEdicao
    document.getElementById('editor').value = client.editor
    document.getElementById('local').value = client.local
    document.getElementById('dataPublicacao').value = client.dataPublicacao
    document.getElementById('numeroPagina').value = client.numeroPaginas
    document.getElementById('titulo').dataset.index = client.index
}

const editClient = () => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editClient(index)
        }else {
            const client = readClient()[index]
            const response = confirm(`Desaja realmente tirar o livro ${client.titulo} da estante?`)
            if (response){
                deleteClient(index)
                updateTable()    
            }
        }
    }
}

updateTable()

document.getElementById('#')
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editClient)

