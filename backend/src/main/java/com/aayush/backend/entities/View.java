package com.aayush.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="Views")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class View {

    @Id
    @GeneratedValue
    private Long viewId;

    @Column
    private String name;

    @Column
    private String chartType;

    @Column
    private String country;

    @Column
    private String indicator;

    @Column
    private String startDate;

    @Column
    private String endDate;
}
