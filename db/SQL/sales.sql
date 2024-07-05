truncate table sirolynia.sales cascade;

select * from sirolynia.sales;

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
	'Nathan',
	'0586663901',
	'madarnatan@gmail.com',
	100, 
	'ONLINE - Blast from the Past', 
	'CREDIT', 
	true, 
	null,
	'Israel',
	'Jerusalem',
	'9626004',
	'Ben Tzvi 39',
	false
)
RETURNING id;

truncate table sirolynia.sale_items;

select * from sirolynia.sale_items;

insert into sirolynia.sale_items (
	sale_id, 
	product_id, 
	quantity_sold, 
	selling_price_at_time, 
	discount_id
) values (1, 2, 1, 10, null);