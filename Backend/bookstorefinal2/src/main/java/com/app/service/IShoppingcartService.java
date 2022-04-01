package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.app.dto.AddToCartDto;
import com.app.dto.CartDto;
import com.app.dto.CartItemDto;
import com.app.pojos.Cart;
import com.app.pojos.User;

public interface IShoppingcartService {
	public void addProduct(AddToCartDto dto ,User user );
	
	
	public CartDto listcartItems(User user);


	public void deletCartItem(Integer itemId, User user);


	public CartItemDto getCartItemByID(int id);

	public  CartDto removeAllItemsOfUser(User user);
	public String updatecart(int id, int quantity, int pid, User user);
}
