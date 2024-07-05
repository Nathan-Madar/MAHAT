insert into sirolynia.products (
	name, 
	amount, 
	selling_price, 
	cost_price,
	upc,
	image,
	min_amount_before_restock,
	is_hidden,
	display_quantity,
	display_price,
	description,
	discount_id
) values (
	$1::text,
	$2::int,
	$3::numeric,
	$4::numeric,
	$5::bigint,
    $6::text,
	$7::int,
	$8::boolean,
	$9::int,
	$10::numeric,
    $11::text,
    $12::int
)
RETURNING id;