# Gossip Girl

<br>

![logo](https://github.com/KokoMoraDesigns/Gossip_Girl/blob/main/static/assets/images/readme/season%2027%20(1).png?raw=true)

<br>

## Project description

Gossip Girl is the modern version of the tv show's Gossip Girl. The tv show, set in New York, is about an anonymous person that publishes in a viral blog about the secret lives of a particular group of friends -and their parents-. That tv show was launched twice, first in 2007, and next in 2021, and each time the anonymous person(s) had different purposes to fulfill with their blog, first, it was a literary personal project, and second, a way of reclaiming power. My project is the third launch (purpose to fulfill: liberating the baddies, because if everybody is talking about everybody, nobody can criminalize one single person for their life). In a high level view, this project is a showcase-blog where people can read about certain topic -in this case, themselves-.

<br>

## Project structure

Home 

Missed me? --> kind of 'about me' page

Newspaper --> where all the news are published (you can filter them by categories: parents, classmates, teachers, or everyone)

Newspaper manager --> this is a hidden route, you can only see it if you are Gossip Girl; from here you can pusblish, edit, and delete the news.

Anonymous mailbox --> kind of 'contact me' page

<br>

## How to install it

### Clone my repository:

``git clone https://github.com/KokoMoraDesigns/Gossip_Girl.git``

``cd Gossip_Girl``

<br>

### Backend configuration

* create and activate the virtual environment

  ``python -m venv venv``
  ``source venv/bin/activate    # Linux/macOS``
  ``venv\Scripts\activate       # Windows``

* install the dependencies

  ``cd Gossip_Girl_backend``
  ``pip install -r requirements.txt``

* execute the server
  
  ``python app.py``

Now you should have the backend running in http://localhost:5005

<br>

### MySQL database

* create Gossip_Girl_Content database

* generate all the tables


    ---
    
    ### Tabla: `users`
    
    | Columna          | Tipo        | Null | Key | Extra          | Descripción                     |
    |-----------------|------------|------|-----|----------------|---------------------------------|
    | users_id        | int        | NO   | PRI | auto_increment | Identificador único del usuario |
    | users_name      | varchar(14)| NO   | UNI |                | Nombre de la persona               |
    | users_password  | varchar(45)| NO   |     |                | Contraseña  |
    | users_email     | varchar(45)| NO   | UNI |                | Correo electrónico único        |
    
    ---
    
    ### Tabla: `news`
    
    | Columna           | Tipo                                  | Null | Key | Extra                       | Descripción                                |
    |------------------|---------------------------------------|------|-----|-----------------------------|--------------------------------------------|
    | news_id           | int                                   | NO   | PRI | auto_increment              | Identificador único de la noticia               |
    | news_title        | varchar(85)                           | NO   |     |                             | Título de la noticia                            |
    | news_content      | text                                  | NO   |     |                             | Contenido de la noticia                          |
    | news_cover_image  | varchar(545)                          | NO   |     |                             | Imagen de la portada                           |
    | news_images       | varchar(545)                          | YES  |     |                             | Imágenes del cuerpo de la noticia (opcional)                   |
    | news_category     | enum('Teachers','Classmates','Parents') | NO  |     |                             | Filtros de la noticia                         |
    | news_users_id     | int                                   | YES  | MUL |                             | Usuario que creó la noticia (FK a `users_id`) |
    | created_at        | timestamp                             | YES  |     | CURRENT_TIMESTAMP           | Fecha de creación                            |
    | updated_at        | datetime                              | YES  |     | on update CURRENT_TIMESTAMP | Fecha de actualización                        |


* configure mysql connection (host, user, password, database...)

<br>

### Frontend configuration

* install the dependencies
  ``npm install``
  
* run it
  ``npm run install``

Now you should have the frontend running in http://localhost:3001



<br>

## How to use it

If you have access to the edition part of the page, you can go to 'newspaper manager', and there you'll find two tools: the newspaper form, and the newspaper archive. 

*Newspaper form:* you can either publish a new news item or update an old one; the title, content, category and cover sections are compulsory, the evidences (images that will be rendered in the body of the news item, as a carousel if there is more than one) are optional. 

![NewspaperForm](https://github.com/KokoMoraDesigns/Gossip_Girl/blob/main/static/assets/images/readme/Captura%20de%20pantalla%202025-09-27%20a%20la(s)%2020.23.28.png?raw=true)

*Newspaper archive:* if you keep scrolling, you'll find an archive with all the news that have already been published; each one of them have a 'modify gossip' and 'bye gossip' for either updating or deleting the record. The updating option will lead you again to the form.

![NewspaperArchive](https://github.com/KokoMoraDesigns/Gossip_Girl/blob/main/static/assets/images/readme/Captura%20de%20pantalla%202025-09-27%20a%20la(s)%2020.23.18.png?raw=true)

Other way of accessing the 'newspaper manager' page: if you are reading the newspaper click on the feather icon that you will found in each news item, this will redirect you to the edition form of that particular news item.

If you don't have edition privileges, you can go to the newspaper, enter into the news you are interested in, and when you finish reading, click on the newspaper icon, this will redirect you again to the newspaper page.

![icons](https://github.com/KokoMoraDesigns/Gossip_Girl/blob/main/static/assets/images/readme/Captura%20de%20pantalla%202025-09-27%20a%20la(s)%2020.23.48.png?raw=true)

<br>

## Used languages

React for the front-end

Flask for the back-end

MySQL for the database

Heroku for the deployment

<br>

## License

MIT license
