# RandomMongo

V1.0.1-

Example:<br><br>
var randommongo = require('randommongo');<br>
randommongo.populateRandomMongo(100,{db:'test',coll:'RandomData'});
<p>
This will populate db: test, collection: RandomData with 100 random documents all with the same schema.

Random documents have 578 fields and are a combination of numeric, date and string formats. There are no embedded docs.
</p>
