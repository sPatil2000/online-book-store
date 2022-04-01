package com.app.service;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.dto.CartDto;
import com.app.dto.CartItemDto;
import com.app.dto.OrderDto;
import com.app.dto.OrderResponseDto;
import com.app.pojos.User;

public interface IOrderService {

	OrderResponseDto placeOrderDetails(OrderDto orderdto, User user);
	
	List<OrderResponseDto> getCustomerDetails(long id);
	
	
	
	
	
}
