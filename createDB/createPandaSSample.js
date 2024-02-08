db = db.getSiblingDB('PandaSample')

db.createCollection('shoes')
shoeCollection = db.getCollection("shoes")
shoeCollection.remove({})
shoeCollection.insert(
{
	shoeName: "KungPao Shoe",
	shoeDescription: "The shoe that will let you destress.",
	shoeId: "976-2222",
	shoeSize: 5.5,
	shoeRating: 4.5,
	sellerId: "3599",
	shoePrice: 39.99,
	storeID: "80299"
}
)
shoeCollection.insert(
{
	shoeName: "Geo shoe",
	shoeDescription: "A shoe that prevents",
	shoeId: "1",
	shoeSize: 5.5,
	shoeRating: 4.5,
	sellerId: "3599",
	shoePrice: 39.99,
	storeID: "80299"
}
)
shoeCollection.insert(
{
	shoeName: "Leap Shoe",
	shoeDescription: "A shoe that is easy to jump",
	shoeId: "2",
	shoeSize: 5.5,
	shoeRating: 4.5,
	sellerId: "3599",
	shoePrice: 39.99,
	storeID: "80299"
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
	subscriptionID: "0",
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
	subscriptionID: "0'",
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
		  subscriptionID: "0",
		  shippingAddr: "some random streets some random city some random state 98001",
		  orderHistory: [],
			cart: []
	}
	)
	


db.createCollection('seller')
sellerCollection = db.getCollection("seller")
sellerCollection.remove({})
sellerCollection.insert(
{
	sellerName: "Canada Goose",
	sellerID: "0",
	sellerEmail: "letsgoose@goose.org",
	sellerPassword: "jddsajfafddl111123213",
	subscriptionID: "3",
	storeID: "181818",
	invList: [],
	salesHistory: []

}
)

sellerCollection.insert(
{
	sellerName: "Apple",
	sellerID: "1",
	sellerEmail: "apple@icloud.com",
	sellerPassword: "jddsajfafddl111123213",
	subscriptionID: "3",
	storeID: "181819",
	invList: [],
	salesHistory: []

}
)

sellerCollection.insert(
{
	sellerName: "Laurentia's factory",
	sellerID: "2",
	sellerEmail: "carmel@gmail.com",
	sellerPassword: "jddsajfafddl111123213",
	subscriptionID: "3",
	storeID: "181820",
	invList: [],
	salesHistory: []

}
)


db.createCollection('storefront')
sellerCollection = db.getCollection("storefront")
sellerCollection.remove({})
sellerCollection.insert(
{
	sellerID: "0",
	storeID: "181818",
	invList: [],
	salesHistory: [],
	storePic: "canadaPic.png"
}
)

sellerCollection.insert(
	{
		sellerID: "1",
		storeID: "181819",
		invList: [],
		salesHistory: [],
		storePic: "appleLogo.png"
	}
	)

sellerCollection.insert(
	{
		sellerID: "2",
		storeID: "181820",
		invList: [],
		salesHistory: [],
		storePic: "lineWork.png"
	}
	)
