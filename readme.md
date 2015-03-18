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
First user accessing /admin gets admin rights
And have a look at /server/config_example.js and rename it to config.js
## Demo

http://desaparecidos.meteor.com/
or 
Desaparecidosmx.org
## License
MIT
##Thanks
to [bevanhunt](https://github.com/bevanhunt/meteor-leaflet/) for the leaflet examples
## Todo
* Check security and Collection subscription
* publish only the author if its the active user
* Slider -> minor fixes
* router for extra pages
* append informations
* enable to modify own cases
* suggest new informations about exisiting desaparecido -> to admin and author
* export database without author
* Translation