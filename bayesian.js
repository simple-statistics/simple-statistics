function bayesian() {
    var c = {};
    // <string> classname, <hash> bands, <string> author
    // bands = {"bandname1": value1, "bandname2": value2}
    // c.train = function(classname, bands, author) {
    //     // we're going to have classname collisions, better use authorname too...
    //     author = author || 'anonymous'; // anomymous default
    //     bandstring = bands; // must validate this as correctly-formatted JSON...
    //     sample = Sample.new({:classname => classname,:bandstring => bandstring,:author => author});
    //     sample.save;
    // };

    // // measures cartesian distance between two band hashes
    // function distance(a,b) {
    //     bands = 0;
    //     // a.each do |band,value|
    //     //   bands += (value.to_i-b[band].to_i)**2 unless b[band].nil?
    //     // end
    //     return bands**0.5;
    // }

    c.add = function(x, tag) {

    };

    return c;
}
