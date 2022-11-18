package com.bookshop.bookstore.repository;

import com.bookshop.bookstore.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository <Book,Long>{
}
