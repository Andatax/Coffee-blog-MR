package com.coffeeblog.domain.model.user;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import lombok.*;

import org.springframework.stereotype.Indexed;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Username required")
    @Size(min = 6, max = 30, message = "Username msut be 6-30 characters")
    private String username;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 25, message = "Password must be at least 8 characters long")
    private String password;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Email is required")
    @Size(max = 50, message = "Email is too long")
    private String email;

}
