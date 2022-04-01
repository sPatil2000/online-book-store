package com.app.dto;

import com.app.pojos.Product;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductQuantityDto {
	private int pid;
	private int quantity;

}
