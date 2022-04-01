package com.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Exception.CustomException;
import com.app.dto.AddToCartDto;
import com.app.dto.CartDto;
import com.app.dto.CartItemDto;
import com.app.dto.ProductResponseDto;
import com.app.pojos.Cart;
import com.app.pojos.Product;
import com.app.pojos.User;
import com.app.repository.CartItemRepository;
import com.app.repository.ProductRepository;
//CartDto: items ,totalcost
//cartItremDto : id,quanitity,product
//AddtoCartDto : id,book-id,productid
@Service
@Transactional
public class ShoopingCartService implements IShoppingcartService {

	@Autowired
	private CartItemRepository cartrepo;
	
	@Autowired
	private ProductRepository productrepo;
	
	
	
	
	
	//get all the carts items of user and also display total
	public CartDto listcartItems(User user)
	{
		List<Cart> cartList = cartrepo.findByCustomer(user);
		
		
		cartList.forEach(i -> System.out.println(i));
		List<CartItemDto> cartItems = new ArrayList<>();
		double totalcost=0;
		
		//find the total
		for (Cart cart: cartList) {
	            CartItemDto cartItemDto = new CartItemDto(cart); //id qunatity product----->getprice
	            
	            
	            totalcost  += cartItemDto.getQuantity() * cart.getProduct().getPrice();
	            
	            
	            cartItems.add(cartItemDto);
	        }
		
		System.out.println(totalcost);
		CartDto cartDto = new CartDto();//final object that we have to pass--->FE
        cartDto.setTotalCost(totalcost); //set total price
        cartDto.setCartItems(cartItems); 
        
		return  cartDto;
		
		
		
		
	}
	
	
	
	public void addProduct(AddToCartDto cartdto, User user )
	{
		
		//get the product
		Product product=productrepo.findById(cartdto.getBookId()).get();
		
		Cart cart= new Cart();//create cart object and set the properties
		
		cart.setProduct(product);
		cart.setQuantity(cartdto.getQuantity());
		cart.setCustomer(user);
		
		
		cartrepo.save(cart); //save the data in Cart details
			System.out.println(user.getId() + "------------"+user.getEmail());
	}



	@Override
	public void deletCartItem(Integer itemId, User user) {
		 Optional<Cart> cart = cartrepo.findById(itemId);

		 
		 System.out.println(cart.toString());
		 
		 //check whether cart id is valid or not
	        if (cart.isEmpty()) {
	            throw new CustomException("cart item id is invalid: " + itemId);
	        }

	        Cart cartdetails = cart.get();
System.out.println(cartdetails.getCustomer().getId());
System.out.println(user.getId());

	        if (cartdetails.getCustomer().getId()!= user.getId()) {
	            throw  new CustomException("cart item does not belong to user: " +itemId );
	        
	        }

	        
	        System.out.println(user.toString());
	        cartrepo.deleteById(itemId);

		
	}



	@Override
	public CartItemDto getCartItemByID(int id) {
		CartItemDto cartItemDto= new CartItemDto();
		 Cart cart = cartrepo.findById(id).get();
		 cartItemDto.setId(cart.getId());
		 cartItemDto.setProduct(cart.getProduct());
		 cartItemDto.setQuantity(cart.getQuantity());
		System.out.println(cart.toString());
		return cartItemDto;
	}



	@Override
	public String updatecart(int id, int quantity,int pid ,User user) {
		//get the product
				//Product product=productrepo.findById(cartItemByID.getProduct().getId()).get();
			
			Cart cart = cartrepo.findById(id).get();
			System.out.println(cart.toString());
		//	Product product = productrepo.findById(pid).get();
			int id1 =cart.getProduct().getId();
			System.out.println(id1);
		Product product = productrepo.findById(id1).get();
		System.out.println(product.toString());
	
		
		int pquantity=product.getQuantity();
		
		
		//user selected quan should be less than or equal to product q
		if(quantity <= pquantity)
		{
			cart.setQuantity(quantity);
			cart.setProduct(product);
			cart.setCustomer(user);
			cartrepo.save(cart);
			return "Quantity updated sucessfully !!";
		}
		else
		{
			return "Quantity should be less than " + pquantity;
		}
				
				//System.out.println(cart.toString());
				 //save the data in Cart details
					//System.out.println(user.getId() + "------------"+user.getEmail());
		}

	
	
		public CartDto removeAllItemsOfUser(User user)
		{
			List<Cart> cartList = cartrepo.findByCustomer(user);
			cartList.forEach(i->System.out.println(i.getProduct()));
			   Cart c= new Cart();
			
			List<CartItemDto> cartItems = new ArrayList<>();
			  CartDto cartDto = new CartDto();
			for (Cart cart: cartList) {
	            CartItemDto cartItemDto = new CartItemDto(cart); 
	          
	          cartItems.add(cartItemDto);
	          
	          cartrepo.deleteById(cart.getId());
	       
			}
			
			
			cartDto.setCartItems(cartItems);
			return cartDto;
		}


}
