SELECT 
    product_id,
    name,
    amount,
    category,
    subCategory as sub_category,
    price,
    round(price * ((100 - COALESCE(discountPercent, 0)) / 100), 2) as actual_price,
    discountId as discount_id,
    discountPercent as discount_percent,
    discountDescription as discount_description,
    CASE
      WHEN discountPercent IS NULL THEN null
      ELSE discountOrigin
    END as discount_origin,
    image,
    description
FROM (
    SELECT
      ROW_NUMBER() OVER (PARTITION BY name ORDER BY discountPercent desc NULLS LAST) AS row_num,
      a.*
    FROM (
      SELECT 
        p.id as product_id,
        p.name as name, 
        p.amount as amount,
        p.image as image, 
        c.name as category, 
        sc.name as subCategory, 
        p.selling_price as price,
        pd.id as discountId,
        pd.percent as discountPercent,
        pd.name as discountDescription,
        'PRODUCT' as discountOrigin,
        p.description as description
      FROM sirolynia.products p
      JOIN sirolynia.product_categories pc ON p.id = pc.product_id
      JOIN sirolynia.categories sc ON pc.category_id = sc.id
      JOIN sirolynia.categories c ON sc.parent_category_id = c.id
      LEFT JOIN sirolynia.discounts pd ON p.discount_id = pd.id
	    WHERE not p.is_hidden
      UNION ALL
      SELECT 
        p.id as product_id,
        p.name as name, 
        p.amount as amount,
        p.image as image, 
        c.name as category, 
        sc.name as subCategory, 
        p.selling_price as price,
        sd.id as discountId,
        sd.percent as discountPercent,
        sd.name as discountDescription,
        'SUB_CATEGORY' as discountOrigin,
        p.description as description
      FROM sirolynia.products p
      JOIN sirolynia.product_categories pc ON p.id = pc.product_id
      JOIN sirolynia.categories sc ON pc.category_id = sc.id
      JOIN sirolynia.categories c ON sc.parent_category_id = c.id
      LEFT JOIN sirolynia.discounts sd ON sc.discount_id = sd.id
	    WHERE not p.is_hidden
      UNION ALL
      SELECT 
        p.id as product_id,
        p.name as name, 
        p.amount as amount,
        p.image as image, 
        c.name as category, 
        sc.name as subCategory, 
        p.selling_price as price,
        cd.id as discountId,
        cd.percent as discountPercent,
        cd.name as discountDescription,
        'CATEGORY' as discountOrigin,
        p.description as description
      FROM sirolynia.products p
      JOIN sirolynia.product_categories pc ON p.id = pc.product_id
      JOIN sirolynia.categories sc ON pc.category_id = sc.id
      JOIN sirolynia.categories c ON sc.parent_category_id = c.id
      LEFT JOIN sirolynia.discounts cd ON c.discount_id = cd.id
	    WHERE not p.is_hidden
    ) a
) r
WHERE 
	row_num = 1 and
	product_id = $1::int
ORDER BY product_id;