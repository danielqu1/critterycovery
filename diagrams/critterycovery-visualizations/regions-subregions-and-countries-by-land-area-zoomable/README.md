# Regions, Subregions, and Countries by Land Area - Zoomable

https://observablehq.com/@sahithi-golkonda/regions-subregions-and-countries-by-land-area-zoomable@412

View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
npx http-server
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@4
npm install https://api.observablehq.com/d/c799cc878aabccf8.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "@sahithi-golkonda/regions-subregions-and-countries-by-land-area-zoomable";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~
