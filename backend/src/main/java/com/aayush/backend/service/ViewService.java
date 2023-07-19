package com.aayush.backend.service;

import com.aayush.backend.dao.ViewRepository;
import com.aayush.backend.entities.View;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ViewService {
    @Autowired
    private ViewRepository viewRepository;

    public View createView(View view)
    {
        return viewRepository.save(view);
    }

    public List<View> getAllViews()
    {
        return viewRepository.findAll();
    }

    public Optional<View> getViewById(Long id)
    {
        return viewRepository.findById(id);
    }

    public void deleteViewById(Long id)
    {
        viewRepository.deleteById(id);
    }

}
