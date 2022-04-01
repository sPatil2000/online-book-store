package com.app.service;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.CartDto;
import com.app.dto.CartItemDto;
import com.app.dto.OrderDto;
import com.app.dto.OrderResponseDto;
import com.app.pojos.Cart;
import com.app.pojos.Order;
import com.app.pojos.Product;
import com.app.pojos.User;
import com.app.repository.CartItemRepository;
import com.app.repository.OrderRepository;
@Service
@Transactional
public class OrderService  implements IOrderService{

	@Autowired
	private CartItemRepository cartrepo;
	
	@Autowired
	private OrderRepository orderrepo;
	
	@Autowired
	private IShoppingcartService cartservice;
	
	
	@Autowired
	private ProductService service;
	
	@Override
	public OrderResponseDto  placeOrderDetails(OrderDto orderdto ,User user) {
		List<Cart> list = cartrepo.findByCustomer(user); //get the user ----->cart items
		OrderResponseDto response=new OrderResponseDto();
//		if(list.isEmpty())
//		{
//			//return "Your Cart is Empty...Please add product to cart ";
//			response.setMsg("Your Cart is Empty...Please add product to cart ");
//		return	 response;
//		}
//		else
//		{
			
		
		Order o= new Order(); //order object is created
		o.setCart(list); //set the cart list  to te order
		o.setCustomer(user);
		
		o.setEmail(user.getEmail());
		o.setUsername(orderdto.getName());
		o.setEmail(orderdto.getEmail());
		o.setAddress(orderdto.getAddress());
		o.setMobileNo(orderdto.getMobileno());
		o.setPayType(o.getPayType().valueOf(orderdto.getPaymentmode()));
		o.setTotalprice(orderdto.getPrice());
		o.setState(orderdto.getState());
		o.setCity(orderdto.getCity());
		o.setZipcode(orderdto.getZipcode());
		o.setPlaceorderdate(LocalDate.now());
		orderrepo.save(o); //save the order details
		
		
		response.setAddress(o.getAddress());
		response.setEmail(o.getEmail());
		response.setMobileno(o.getMobileNo());
		response.setPaymentmode(o.getPayType().toString());
		response.setName(o.getUsername());
		response.setPrice(o.getTotalprice());
		response.setCity(o.getCity());
		response.setZipcode(o.getZipcode());
		response.setState(o.getState());
		response.setMsg("Your Order is Placed Sucessfully.....");
		
		//cartservice.removeAllItemsOfUser(user);
			CartDto cartDto = cartservice.listcartItems(user);
		List<CartItemDto> cartItems = cartDto.getCartItems();
	for(CartItemDto c : cartItems)
	{
		int userq=c.getQuantity();
		int pid=c.getProduct().getId();
		service.updateproductQuantity(pid, userq);
	}
	
		//System.out.println(o.toString());
		
		return response;
	}

	@Override
	public List<OrderResponseDto> getCustomerDetails(long id) {
		
	List<Order> list = orderrepo.getorderdetails(id);
	List<OrderResponseDto>  resplist= new ArrayList<OrderResponseDto>(); //list of resp
	for(Order order :list)
	{
		OrderResponseDto response= new OrderResponseDto(); //new object
		response.setAddress(order.getAddress());
		response.setEmail(order.getEmail());
		response.setMobileno(order.getMobileNo());
		response.setPaymentmode(order.getPayType().toString());
		response.setName(order.getUsername());
		response.setPrice(order.getTotalprice());
		response.setCity(order.getCity());
		response.setZipcode(order.getZipcode());
		response.setState(order.getState());
		
		
		LocalDate orderdate=order.getPlaceorderdate();
		LocalDate delivertdate=orderdate.plusDays(7);
		System.out.println(orderdate);
		System.out.println(delivertdate);
		int diff =Period.between(orderdate, delivertdate).getDays();
		System.out.println(diff);
		if(diff==7)
		{
			response.setMsg("Your order will be delivered on " + delivertdate);
		}
		if(diff==6)
		{
			response.setMsg("Your order will be delivered on " + delivertdate);
		}
		if(diff==5)
		{
			response.setMsg("Your order will be delivered on " + delivertdate);
		}
		if(diff==4)
		{
			response.setMsg("Your order will be delivered on " + delivertdate);
		}
		if(diff==3)
		{
			response.setMsg("Your order will be delivered within 3 days ");
		}
		if(diff==2)
		{
			response.setMsg("Your order will be delivered within 2 days");
		}
		if(diff==1)
		{
			response.setMsg("Your order will be delivered tomorrow ");
		}
		if(diff==0)
		{
			response.setMsg("Your order will be delivered today ");
		}
	
		resplist.add(response) ;//add the respoonse
	}
		return resplist;
	}


	

	
}
