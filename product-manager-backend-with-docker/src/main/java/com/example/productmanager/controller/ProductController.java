package com.example.productmanager.controller;

import com.example.productmanager.model.Product;
import com.example.productmanager.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    
    @Autowired
    private ProductRepository productRepository;
    
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = productRepository.save(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Product existingProduct = productOptional.get();
        existingProduct.setName(updatedProduct.getName());
        Product savedProduct = productRepository.save(existingProduct);
        return new ResponseEntity<>(savedProduct, HttpStatus.OK);
    }
    
    @GetMapping("/{name}")
    public ResponseEntity<List<Product>> getProductByName(@PathVariable String name) {
    	
    	List<Product> products = productRepository.findByNameIgnoreCase(name);
    	if (products.isEmpty()) {
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    	return new ResponseEntity<>(products, HttpStatus.OK);
    	
    }
    
}