# RandomMongo

**V1.0.1- Initial push**

Example:
```
var randommongo = require('randommongo');
randommongo.populateRandomMongo(100,{db:'test',coll:'RandomData'});
```

This will populate db: test, collection: RandomData with 100 random documents all with the same schema.

Random documents have 578 fields and are a combination of numeric, date and string formats. There are no embedded docs.