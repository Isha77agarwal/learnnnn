class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        //create tr element
        const row = document.createElement('tr');
        //Insert coloumns
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete fa fa-remove"></a></td>`;

        list.appendChild(row);
    }

    //function showAlert
    showAlert(message, className) {
        //Create div
        const div = document.createElement('div');
        //Add Class
        div.className = `alert ${className}`;
        //Add text
        div.appendChild(document.createTextNode(message));
        //Get Parent
        const container = document.querySelector('.container');
        //Get form
        const form = document.querySelector('#book-form');
        //Insert alert
        container.insertBefore(div, form);

        //Timeout after 3 sec
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    clearFields() {
        title.value = ''; 
        author.value = '';
        isbn.value = '';
    }

    deleteBook(target) {
        if(target.className === 'delete fa fa-remove') 
            target.parentElement.parentElement.remove();
    }
}

//Local Storage Class
class localStore {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null)
            books = [];
        else 
            books = JSON.parse(localStorage.getItem('books'));

            return books;
    }
    
    static displayBooks() {
        const books = localStore.getBooks();
        
        //display books
        books.forEach(function(book) {
            const ui = new UI();
            //Add book to UI
            ui.addBookToList(book);
        })
    }

    static addBook(book) {
        const books = localStore.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = localStore.getBooks();

        books.forEach(function(book, index) {
            if(book.isbn === isbn)
                books.splice(index, 1);
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', localStore.displayBooks);

document.querySelector('#book-form').addEventListener('submit', function(e){
    //get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
    //Instantiate Book
    const book = new Book(title, author, isbn);
    //Instantiate UI
    const ui = new UI();
    //Validate
    if(title === '' || author === '' || isbn === '') {
        //Error Alert
        ui.showAlert('Please fill all fields', 'error');
    } else {
        ui.addBookToList(book);
        //Store book to local storage
        localStore.addBook(book);
        //Show Success
        ui.showAlert('Book Added!!', 'success');
        //Clear all fields
        ui.clearFields();    
    }
    
    e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click', function(e){
    const ui = new UI();
    //Delete Book
    ui.deleteBook(e.target);
    //Delete book from local storage
    localStore.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert('Book Removed!', 'success');
    e.preventDefault();
})