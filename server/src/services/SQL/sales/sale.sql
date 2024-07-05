insert into sirolynia.sales (
	full_name,
	phone_number,
	email,
	total_price, 
	description, 
	payment_method, 
	sold_online, 
	discount_on_sale_id, 
	country,
	city,
	zip_code,
	address,
	product_received
) values (
	$1::text, 
	$2::text, 
	$3::text, 
	$4::numeric, 
	$5::text, 
	$6::text,
	$7::boolean,
	$8::int,
	$9::text,
	$10::text,
	$11::text,
	$12::text,
	$13::boolean
)
RETURNING id;