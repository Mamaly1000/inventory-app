export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }
  static saveCategory(selectedcategory) {
    const savedCategories = Storage.getAllCategories();
    const existedItem = savedCategories.find(
      (c) => c.id === selectedcategory.id
    );
    if (existedItem) {
      existedItem.title = selectedcategory.title;
      existedItem.description = selectedcategory.description;
    } else {
      selectedcategory.id = new Date().getTime();
      selectedcategory.createdAt = new Date().toISOString();
      savedCategories.push(selectedcategory);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }
  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

    return savedProducts.sort((a, b) => {
      if (sort === "newest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "oldest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
  }
  static saveProducts(selectedproduct) {
    const savedProducts = Storage.getAllProducts();
    const existedItem = savedProducts.find((c) => c.id === selectedproduct.id);
    if (existedItem) {
      existedItem.title = selectedproduct.title;
      existedItem.quantity = selectedproduct.quantity;
      existedItem.category = selectedproduct.category;
    } else {
      selectedproduct.id = new Date().getTime();
      selectedproduct.createdAt = new Date().toISOString();
      savedProducts.push(selectedproduct);
    }
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }
}
