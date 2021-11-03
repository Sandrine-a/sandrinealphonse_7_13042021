# GROUPOMANIA #

## Informations ##

* Cette app utilise une base de données mySql avec Sequelize.

* Framework: "VueJs 3" avec "vuex".

## Installation ##

### front-end ###

* Dans le terminal:
```bash
cd front-end-groupomania
```
Assuez-vous d'avoir Vue.cli:
```bash
npm install -g @vue/cli
```
Installer le projet Vue:
```bash
npm install
```

Démarrer le front:
```bash
npm run serve
```
* Cela devrait lancer l'interface sur:

`
Local:   http://localhost:8080/ 
Network: http://192.168.1.112:8080/
`

* Pour arrêter le front tapez dans le terminal:
```bash
Ctrl+C
```

### Back-end ###

* Dans le terminal:
```bash
cd back-end
npm install
```

Démarrer le serveur:
Je vous recommande d'avoir "nodemon server" installé.
Taper:
```bash
nodemon server
```
Si nodemon n'est pas installé, taper:
```bash
node server
```

* Cela devrait lancer le serveur sur:
`http://localhost:3000/`

* Pour arrêter le seveur tapez dans le terminal:
```bash
Ctrl+C
```

### Usage ###

* Pour créer un utilisateur admin:

Créez votre utilisateur en utilsant la fonction "signup", puis via mySql:
`UPDATE users SET isAdmin=1 WHERE id=X;`
=> X étant le numéro d'utilateur ciblé.