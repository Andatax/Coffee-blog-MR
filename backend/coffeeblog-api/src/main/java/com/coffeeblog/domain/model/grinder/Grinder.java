package com.coffeeblog.domain.model.grinder;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import lombok.*;


import org.springframework.stereotype.Indexed;

@Entity
@Table (name = "grinder")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder


public class Grinder {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    @NotBlank(message = "The grinder must contain a name")
    @Size( max = 40)
    private String name;

    @Column(nullable = false)
    @NotBlank(message = "The grinder must have burr type")
    @Size( max = 3)
    private String burrType;

    @Column(nullable = false)
    @NotBlank(message = "Grinder must have a burr diameter")
    private 
}
