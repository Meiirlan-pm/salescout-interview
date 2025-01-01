// Implement a function which takes an array of Product and returns unique products sorted by price

type Product = {
    name: string;
    price: number;
};
 
function filterAndSortProducts(products: Product[]): Product[] {
    // Фильтрация уникальных продуктов по имени
    const uniqueProducts = Array.from(
        new Map(products.map(product => [product.name, product])).values()
    );

    // Сортировка по цене
    return uniqueProducts.sort((a, b) => a.price - b.price);
    return [] 
}

module.exports = { filterAndSortProducts }