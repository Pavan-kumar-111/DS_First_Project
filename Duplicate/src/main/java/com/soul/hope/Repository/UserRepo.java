package com.soul.hope.Repository;
import com.soul.hope.Entity.*;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<UserEntity, String>{
    boolean existsByEmail(String email);
}
