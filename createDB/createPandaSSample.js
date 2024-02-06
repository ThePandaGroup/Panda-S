db = db.getSiblingDB('toDoSample')

db.createCollection('shoes')
shoeCollection = db.getCollection("shoes")
shoeCollection.remove({})
shoeCollection.insert(
{
	  shoeName: "KungPao Shoe",
	  shoeDescription: "The shoe that will let you destress.",
	  shoeId: 976-2222,
	  shoeSize: 5.5,
	  shoeRating: 4.5,
	  sellerId: 3599,
	  shoePrice: 39.99
}
)
shoeCollection.insert(
{
	shoeName: "Geo shoe",
	shoeDescription: "A shoe that prevents",
	shoeId: 1,
	shoeSize: 5.5,
	shoeRating: 4.5,
	sellerId: 3599,
	shoePrice: 39.99
}
)
shoeCollection.insert(
{
	shoeName: "Leap Shoe",
	shoeDescription: "A shoe that is easy to jump",
	shoeId: 1,
	shoeSize: 5.5,
	shoeRating: 4.5,
	sellerId: 3599,
	shoePrice: 39.99
}
)

db.createCollection('buyer')
buyerCollection = db.getCollection("buyer")
buyerCollection.remove({})
buyerCollection.insert(
{
	  buyerName: "Robert Widjaja",
	  buyerID: 1111,
	  buyerEmail: "gameislife@outlook.com",
	  buyerPassword: "jddsajfafddl111123213",
	  subscriptionID: 0,
	  shippingAddr: "some random streets some random city some random state 98001",
	  orderHistory: []
}
)
buyerCollection.insert(
{
		buyerName: "Ving Leap Chen",
		buyerID: 1111,
		buyerEmail: "leapwantsdopeshoe@gmail.com.",
		buyerPassword: "jddsajfafddl111123213",
		subscriptionID: 0,
		shippingAddr: "some random streets some random city some random state 98001",
		orderHistory: []
}
)

buyerCollection.insert(
	{
		  buyerName: "Juan Gonzalas",
		  buyerID: 1111,
		  buyerEmail: "forthepeople@icloud.com",
		  buyerPassword: "jddsajfafddl111123213",
		  subscriptionID: 0,
		  shippingAddr: "some random streets some random city some random state 98001",
		  orderHistory: []
	}
	)
	


db.createCollection('seller')
sellerCollection = db.getCollection("seller")
sellerCollection.remove({})
sellerCollection.insert(
{
	sellerName: "Canada Goose",
	sellerID: 1111,
	sellerEmail: "letsgoose@goose.org",
	sellerPassword: "jddsajfafddl111123213",
	subscriptionID: 0,
	storeID: 181818,
	invList: [],
	salesHistory: []

}
)
sellerCollection.insert(
{
	sellerName: "Apple",
	sellerID: 1111,
	sellerEmail: "apple@icloud.com",
	sellerPassword: "jddsajfafddl111123213",
	subscriptionID: 0,
	storeID: 181818,
	invList: [],
	salesHistory: []

}
)
sellerCollection.insert(
{
	sellerName: "Laurentia's factory",
	sellerID: 1111,
	sellerEmail: "carmel@gmail.com",
	sellerPassword: "jddsajfafddl111123213",
	subscriptionID: 0,
	storeID: 181818,
	invList: [],
	salesHistory: []

}
)

