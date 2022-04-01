package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.dto.OrderResponseDto;
import com.app.pojos.Order;
@Repository
public interface OrderRepository  extends JpaRepository<Order, Integer>{
	@Query(nativeQuery = true ,  value = "select * from order_details where customer_id = ?1" )
	List<Order> getorderdetails(long id);
}
