package com.coffeeblog.domain.model.recipe;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import lombok.*;

import org.springframework.stereotype.Indexed;

import com.coffeeblog.domain.model.grinder.Grinder;

@Entity
@Table (name = "recipes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    @NotBlank(message = "Recipe must have a name")
    @Size (min = 4, max = 30)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grinder_id", nullable = false)
    @NotNull(message = "Recipe must have a grinder")  
    private Grinder grinder;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grinder_id", nullable = false)
    @NotNull(message = "Recipe must have a grinder")
    private Brewer brewer;

    @Column(name = "brew_time_minutes")
    @Min(1)
    @Max(60)
    private Integer brewTimeMinutes;

    @Column(name = "water_temperature_celsius")
    @Min(75)
    @Max(100)
    private Integer waterTemperatureCelsius;

}
    

