db = db.getSiblingDB('PandaSample')

db.createCollection('shoes')
shoeCollection = db.getCollection("shoes")
shoeCollection.remove({})
shoeCollection.insert(
{
	shoeName: "KungPao Shoe",
	shoeDescription: "The shoe that will let you destress.",
	shoeId: "2222",
	shoeSize: 5.5,
	shoeRating: 4.5,
	shoePrice: 39.99,
	storeId: "80299",
	shoeQuantity: 1
}
)
shoeCollection.insert(
{
	shoeName: "Geo shoe",
	shoeDescription: "A shoe that prevents you from getting lost.",
	shoeId: "1",
	shoeSize: 5.5,
	shoeRating: 4.5,
	shoePrice: 39.99,
	storeId: "181818",
	shoeQuantity: 3
}
)
shoeCollection.insert(
{
	shoeName: "Leap Shoe",
	shoeDescription: "A shoe that is easy to jump",
	shoeId: "2",
	shoeSize: 5.5,
	shoeRating: 4.5,
	shoePrice: 39.99,
	storeId: "181819",
	shoeQuantity: 2
}
)
shoeCollection.insert(
{
	shoeName: "Duck Duck Goose",
	shoeDescription: "A shoe that attract ducks and geese",
	shoeId: "3",
	shoeSize: 6,
	shoeRating: 5,
	shoePrice: 49.99,
	storeId: "181818",
	shoeQuantity: 5
}
)

db.createCollection('buyers')
buyerCollection = db.getCollection("buyers")
buyerCollection.remove({})
buyerCollection.insert(
{
	buyerName: "Robert Widjaja",
	buyerId: "1111",
	buyerEmail: "gameislife@outlook.com",
	buyerPassword: "jddsajfafddl111123213",
	subscriptionId: "0",
	shippingAddr: "some random streets some random city some random state 98001",
	orderHistory: [],
	cart: []
}
)

buyerCollection.insert(
{
	buyerName: "Veng Leap Chen",
	buyerId: "1112",
	buyerEmail: "leapwantsdopeshoe@gmail.com.",
	buyerPassword: "jddsajfafddl111123213",
	subscriptionId: "0'",
	shippingAddr: "some random streets some random city some random state 98001",
	orderHistory: [],
	cart: []
}
)

buyerCollection.insert(
	{
		  buyerName: "Juan Gonzalas",
		  buyerId: "1113",
		  buyerEmail: "forthepeople@icloud.com",
		  buyerPassword: "jddsajfafddl111123213",
		  subscriptionId: "0",
		  shippingAddr: "some random streets some random city some random state 98001",
		  orderHistory: [],
			cart: []
	}
	)
	


db.createCollection('sellers')
sellerCollection = db.getCollection("sellers")
sellerCollection.remove({})
sellerCollection.insert(
{
	sellerName: "Canada Goose",
	sellerId: "0",
	sellerEmail: "letsgoose@goose.org",
	sellerPassword: "jddsajfafddl111123213",
	subscriptionId: "3",
	invList: [],
	salesHistory: []

}
)

sellerCollection.insert(
{
	sellerName: "Apple",
	sellerId: "1",
	sellerEmail: "apple@icloud.com",
	sellerPassword: "jddsajfafddl111123213",
	subscriptionId: "3",
	invList: [],
	salesHistory: []

}
)

sellerCollection.insert(
{
	sellerName: "Laurentia",
	sellerId: "2",
	sellerEmail: "lalala@gmail.com",
	sellerPassword: "jddsajfafddl111123213",
	subscriptionId: "3",
	invList: [],
	salesHistory: []

}
)


db.createCollection('storefront')
sellerCollection = db.getCollection("storefront")
sellerCollection.remove({})
sellerCollection.insert(
{
	sellerId: "0",
	storeId: "181818",
	storeName: "Canada Goose",
	storeDescription: "The best place to get your winter gear.",
	invList: ["1", "3"],
	salesHistory: [],
	storePic: "canadaPic.png"
}
)

sellerCollection.insert(
	{
		sellerId: "1",
		storeId: "181819",
		storeName: "Apple Store",
		storeDescription: "edible shoes to keep you running",
		invList: ["2"],
		salesHistory: [],
		storePic: "appleLogo.png"
	}
	)

sellerCollection.insert(
	{
		sellerId: "2",
		storeId: "80299",
		storeName: "Laurentia's Factory",
		storeDescription: "source of all sketchy shoes in the area, guaranteed to be unique!",
		invList: ["2222"],
		salesHistory: [],
		storePic: "lineWork.png"
	}
	)
