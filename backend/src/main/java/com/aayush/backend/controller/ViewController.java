package com.aayush.backend.controller;

import com.aayush.backend.entities.View;
import com.aayush.backend.service.ViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ViewController {

    @GetMapping("/healthcheck")
    public ResponseEntity healthCheck()
    {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Autowired
    private ViewService viewService;

    @PostMapping("/views")
    public ResponseEntity<Long> createView(@RequestBody View view) {
        try {
            Long viewID = viewService.createView(view).getViewId();
            return new ResponseEntity<>(viewID, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/views/{id}")
    public ResponseEntity<View> getViewById(@PathVariable Long id) {
        try {
            Optional<View> view = viewService.getViewById(id);
            if (view.isPresent()) {
                return new ResponseEntity<>(view.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/views")
    public ResponseEntity<List<View>> getAllViews() {
        try {
            List<View> views = viewService.getAllViews();
            if (views.isEmpty())
            {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(views, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/views/{id}")
    public ResponseEntity<HttpStatus> deleteView(@PathVariable Long id) {
        try {
            viewService.deleteViewById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    }
