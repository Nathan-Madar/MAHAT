update sirolynia.products
set 
	name = $1::text,
	amount = $2::int,
	selling_price = $3::numeric,
	cost_price = $4::numeric,
	upc = $5::bigint,
	image = $6::text,
	min_amount_before_restock = $7::int,
	is_hidden = $8::boolean,
    display_quantity = $9::int,
	display_price = $10::numeric,
	description = $11::text,
	discount_id = $12::int
where id = $13::int;