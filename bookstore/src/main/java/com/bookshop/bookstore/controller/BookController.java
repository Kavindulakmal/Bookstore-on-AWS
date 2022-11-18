package com.bookshop.bookstore.controller;

import com.bookshop.bookstore.exception.BookNotFoundException;
import com.bookshop.bookstore.model.Book;
import com.bookshop.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    //create book
    @PostMapping("/book")
    Book newBook(@RequestBody Book newBook){
        return bookRepository.save(newBook);
    }

    //read all books
    @GetMapping("/books")
    List<Book> getAllUsers(){
        return bookRepository.findAll();
    }

    //read book by id
    @GetMapping("/book/{id}")
    Book getBookById(@PathVariable Long id){
        return bookRepository.findById(id)
                .orElseThrow(()-> new BookNotFoundException(id));
    }

    @PutMapping("/book/{id}")
    Book updateBook(@RequestBody Book newBook,@PathVariable Long id){
        return bookRepository.findById(id)
                .map(book ->{
                    book.setTitle(newBook.getTitle());
                    book.setAuthor(newBook.getAuthor());
                    book.setCost(newBook.getCost());

                    return bookRepository.save(book);
                }).orElseThrow(()-> new BookNotFoundException(id));
    }

    @DeleteMapping("/book/{id}")
    String deleteBook(@PathVariable Long id){
        if (!bookRepository.existsById(id)){
            throw new BookNotFoundException(id);
        }
        bookRepository.deleteById(id);
        return "Book "+id+" has been deleted.";
    }
}
