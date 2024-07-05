insert into sirolynia.sale_items (
	sale_id, 
	product_id, 
	quantity_sold, 
	selling_price_at_time, 
	discount_id
) values ($1::int, $2::int, $3::int, $4::numeric, $5::int)
RETURNING id;