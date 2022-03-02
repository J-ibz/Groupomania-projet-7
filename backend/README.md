# 1. Base de données

Connectez vous a mysql et créez une base de donnée, nommez-la "groupomania"

# 2. Allez dans backend>config et créer un fichier .env, collez les variables d'environnement plus bas et remplacez avec vos propres informations.

DB_NAME="groupomania"
MYSQL_USERNAME="you_username"
MYSQL_PASSWORD="your_mysql_password"
SECRET_KEY="SECRET_STRING_OF_YOUR_CHOICE"
ADMIN_PASSWORD="123456"
ADMIN_USERNAME="Admin"
ADMIN_FIRSTNAME ="Admin"
ADMIN_LASTNAME="Groupomania"
ADMIN_EMAIL="admin@groupomania.fr"

# 3. Ouvrir le terminal

cd backend

# 4. Installer les dépendances

npm install

puis

npm start
