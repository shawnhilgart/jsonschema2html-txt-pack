jsonschema2html-txt-pack
========================

A Pack for jsonschema2html that outputs a textual representation of a forms structure.

### Example

In the following example we use the jsonschema2html-handlebars-pack to render out a handlebars template string.

```
var Schema2Html = require('jsonschema2html');
var handlebarsPack = require('jsonschema2html-txt-pack')
var schema = {
    "id":"sample",
    "type":"object",
    "properties":{
        "author":{
            "type":"string"
        },
        "bookTitle":{
            "type":"string"
        },
        "libraries":{
            "type":"array",
            "items":{
                "type":"object",
                "properties":{
                    "name":{
                        "type":"string"
                    },
                    "address":{
                        "type":"string"
                    },
                    "zip":{
                        "type":"integer"
                    }
                }
            }
        }
    }

}

var parser = new Schema2Html(schema, null, {pack:handlebarsPack});
parser.buildForm(function(err, html) {
    console.log(html);
});

```

### Outputs

```
formOpen
-startGroup:sample
--textfield:author=undefined
--textfield:bookTitle=undefined
--groupArrayOpen:libraries-group-many
---groupItemOpen:libraries[0]
----startGroup:libraries-0
-----textfield:libraries[0][name]=undefined
-----textfield:libraries[0][address]=undefined
-----textfield:libraries[0][zip]=undefined
----endGroup:libraries-0
---groupItemClose:libraries[0]
-endGroup:sample
formClose

```


