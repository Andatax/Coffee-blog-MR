package com.coffeeblog.domain.model.user;

public interface IUserRepository {
    User findByEmail(String email);
    User findByUsername(String username);
    void save(User user);
}
