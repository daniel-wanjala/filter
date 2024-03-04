const data = [
	{
		id: 1,
		name: "Invicta Men's Pro Driver",
		img: "https://m.media-amazon.com/images/I/71e04Q53xlL.AC_UY879_.jpg",
		price: 74,
		cat: "Dress",
	},
	{
		id: 11,
		name: "Invicta Men's Pro Driver",
		img: "https://m.media-amazon.com/images/I/71e04Q53xlL.AC_UY879_.jpg",
		price: 74,
		cat: "Dress",
	},
	{
		id: 2,
		name: "Timex Men's Expedition Scout",
		img: "https://m.media-amazon.com/images/I/91WvnZ1g40L.AC_UY879_.jpg",
		price: 40,
		cat: "Sport",
	},
	{
		id: 3,
		name: "Breitling Supercoean Heritage",
		img: "https://m.media-amazon.com/images/I/61hGDiWBU8L.AC_UY879_.jpg",
		price: 200,
		cat: "Luxury",
	},
	{
		id: 4,
		name: "Caiso Classic Resin Strap",
		img: "https://m.media-amazon.com/images/I/51Nk5SEBARL.AC_UY879_.jpg",
		price: 16,
		cat: "Sport",
	},
	{
		id: 5,
		name: "Garmin Venu Smartwatch",
		img: "https://m.media-amazon.com/images/I/51kyjYuOZhL.AC_UY879_.jpg",
		price: 74,
		cat: "Casual",
	},
];

const productsContainer = document.querySelector(".products");
const searchInputs = document.querySelector("#search");
const categoryContainer = document.querySelector(".cats");
const priceRange = document.querySelector("#priceRange");
const priceValue = document.querySelector(".priceValue");

const displayProducts = (filteredProducts) => {
	productsContainer.innerHTML = filteredProducts
		.map((product) => {
			return `<div class="product">
						<img
							src="${product.img}"
						/>
						<span class="name">${product.name}</span>
						<span class="priceText">$${product.price}</span>
					</div>`;
		})
		.join("");
};

displayProducts(data);

searchInputs.addEventListener("keyup", (e) => {
	const value = e.target.value.toLowerCase();

	if (value) {
		displayProducts(
			data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
		);
	} else {
		displayProducts(data);
	}
});

const setCategories = () => {
	const allCats = data.map((item) => item.cat);
	const categories = [
		"All",
		...allCats.filter((item, index) => allCats.indexOf(item) === index),
	];

	categoryContainer.innerHTML = categories
		.map((cat) => `<span> ${cat} </span>`)
		.join("");

	categoryContainer.addEventListener("click", (e) => {
		const selectedCat = e.target.textContent.trim();

		selectedCat === "All"
			? displayProducts(data)
			: displayProducts(data.filter((item) => item.cat === selectedCat));
	});
};

const setPrices = () => {
	const priceList = data.map((item) => item.price);
	const minPrice = Math.min(...priceList);
	const maxPrice = Math.max(...priceList);

	priceRange.min = minPrice;
	priceRange.max = maxPrice;
	priceRange.value = maxPrice;
	priceValue.textContent = "$" + maxPrice;

	priceRange.addEventListener("input", (e) => {
		priceValue.textContent = "$" + e.target.value;
		displayProducts(data.filter((item) => item.price <= e.target.value));
	});
};

setCategories();
setPrices();
