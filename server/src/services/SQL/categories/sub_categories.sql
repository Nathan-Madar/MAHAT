select id, name, parent_category_id
from sirolynia.categories
where parent_category_id is not null;