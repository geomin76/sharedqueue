package sharedqueue.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sharedqueue.Entity.SharedQueue;

@Repository
public interface SharedQueueRepository extends JpaRepository<SharedQueue, Integer> {
    SharedQueue findByCode(String code);
}
