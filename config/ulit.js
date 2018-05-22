function mergeObjs(def, obj) {
    if (!obj) {
        return def;
    } else if (!def) {
        return obj;
    }

    for (var i in obj) {
        // if its an object
        if (obj[i] != null && obj[i].constructor == Object)
        {
            def[i] = mergeObjs(def[i], obj[i]);
        }
        // if its an array, simple values need to be joined. Object values need to be remerged.
        else if(obj[i] != null && (obj[i] instanceof Array) && obj[i].length > 0)
        {
            // test to see if the first element is an object or not so we know the type of array we're dealing with.
            if(obj[i][0].constructor == Object)
            {
                var newobjs = [];
                // create an index of all the existing object IDs for quick access. There is no way to know how many items will be in the arrays.
                var objids = {}
                for(var x= 0, l= def[i].length ; x < l; x++ )
                {
                    objids[def[i][x].id] = x;
                }

                // now walk through the objects in the new array
                // if the ID exists, then merge the objects.
                // if the ID does not exist, push to the end of the def array
                for(var x= 0, l= obj[i].length; x < l; x++)
                {
                    var newobj = obj[i][x];
                    if(objids[newobj.id] !== undefined)
                    {
                        def[i][x] = mergeObjs(def[i][x],newobj);
                    }
                    else {
                        newobjs.push(newobj);
                    }
                }

                for(var x= 0, l = newobjs.length; x<l; x++) {
                    def[i].push(newobjs[x]);
                }
            }
            else {
                for(var x=0; x < obj[i].length; x++)
                {
                    var idxObj = obj[i][x];
                    if(def[i].indexOf(idxObj) === -1) {
                        def[i].push(idxObj);
                    }
                }
            }
        }
        else
        {
            def[i] = obj[i];
        }
    }
    return def;}
    module.exports = {
        mergeObjs,
    }