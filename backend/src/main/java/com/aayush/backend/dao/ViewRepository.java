package com.aayush.backend.dao;

import com.aayush.backend.entities.View;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ViewRepository  extends JpaRepository<View, Long> {
}
