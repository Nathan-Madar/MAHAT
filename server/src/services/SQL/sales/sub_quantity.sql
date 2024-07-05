update sirolynia.products
set amount = amount - $1
where id = $2;