# Desaparecidos for Meteor
Version 0.1 still in Alpha
# About
Desaparecidos is a Meteor -Mapping-Application to track the cases of missing people in Mexico
## How to install
simply
```
curl https://install.meteor.com/ | sh
git clone https://github.com/moxor/desaparecidos.git
cd desaparecidos
meteor
```
First user accessing /admin gets admin rights or defined in the config
And have a look at /server/config/config_example.js and rename it to config.js
## Demo

http://desaparecidos.meteor.com/
or 
http://www.desaparecidosmx.org
## License
MIT
##Thanks
to [bevanhunt](https://github.com/bevanhunt/meteor-leaflet/) for the leaflet examples
## Todo
* Filters
* dependencies
* what information should be added to one case?
* styling of the desaparecidos-pages
* check user remove function of his own cases
* remove button to table
* rewrite the emailSending notifications to user and admin group
* suggest new informations about exisiting desaparecido -> to admin and author
* Translation