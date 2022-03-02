### 1. Créez la BDD

Connectez vous a mysql et créez une base de donnée, nommez-la "groupomania"

### 2. Créez le .env

Allez dans backend>config et créer un fichier .env, collez les variables d'environnement plus bas et remplacez avec vos propres informations. <br />

DB_NAME="groupomania" <br />
MYSQL_USERNAME="you_username" <br />
MYSQL_PASSWORD="your_mysql_password" <br />
SECRET_KEY="SECRET_STRING_OF_YOUR_CHOICE" <br />
ADMIN_PASSWORD="123456" <br />
ADMIN_USERNAME="Admin" <br />
ADMIN_FIRSTNAME ="Admin" <br />
ADMIN_LASTNAME="Groupomania" <br />
ADMIN_EMAIL="admin@groupomania.fr" <br />

### 3. Connecter le serveur

Ouvrir le terminal <br />
cd backend <br />
npm install <br />
npm start <br />
