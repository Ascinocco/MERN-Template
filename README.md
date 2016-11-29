# MERN Template

#### My opinionated structure for a MERN app

##### Coming: Structure, build tools, ideologies, etc

##### Css namespacing
Should use "namespacing" for css, essentially prefixing classes with
what they belong to, to avoid naming conflicts

##### JS namespacing
Going to use the module pattern. Essentially just declare declare the object
as an anonymous function
variables declared outside of the return statement are "privateish"
define the functions and variables you want accessible by the object
outside of the objects file in the return block

Reference: https://javascriptweblog.wordpress.com/2010/12/07/namespacing-in-javascript/
Reference: http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
