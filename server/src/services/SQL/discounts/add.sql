insert into sirolynia.discounts
(
	name,
	description,
	percent
) values
(
	$1::text,
	$2::text,
	$3::numeric
)
returning id;