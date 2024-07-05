update sirolynia.discounts
set name = $2::text,
	description = $3::text,
	percent = $4::numeric
where id = $1::int;