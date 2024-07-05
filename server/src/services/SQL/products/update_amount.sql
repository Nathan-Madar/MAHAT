update sirolynia.products
set amount = $2::int
where id = $1::int;