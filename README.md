# RandomMongo

**V1.0.4- Initial push**

Example:
```
var randommongo = require('randommongo');
randommongo.populateRandomMongo();

-OR-

var randommongo = require('randommongo');
var count = 1000,
	options = {
		db: 'test',
		coll: 'MyColl',
		url: 'mongodb://127.0.0.1:27017/'
	}

randommongo.populateRandomMongo(count, options);
```

This will populate db: test, collection: RandomData with 100 random documents all with the same schema.

Random documents have 578 fields and are a combination of numeric, date and string formats. There are no embedded docs.