package com.coffeeblog.domain.model.recipe;

import com.coffeeblog.domain.model.User;
import com.coffeeblog.domain.model.Coffee;
import org.springframework.data.jpa.repository.JpaRepository;


public interface IRecipeRepository extends JpaRepository<Recipe, String> {
    List<Recipe> findByCreatedBy(User user);
    List<Recipe> findByCoffee(Coffee coffee);
}