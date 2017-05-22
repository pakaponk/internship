## Description
This is a Web Application developed by using Laravel and AngularJS as a part of programming test for an internship

## Installation
1.  Install MAMP If you use Mac OS X or XAMPP if you use Window
2.  Open MAMP or XAMPP then start Servers (If you uses XAMPP, you only have to start APACHE and MySQL)
3.  Go to phpmyadmin by browsing to `http://localhost/phpmyadmin` then create a new MySQL Database (If you use Mac OS X, I recommeneds Sequel Pro for managing the database)
4.  Open Terminal, go to the directory where you install MAMP or XAMPP then navigate to `htdocs` folder 
5.  Run `git clone https://github.com/pakaponk/internship.git internship`
6.  Go to `internship` directory then Download Composer by run the following command:
    ```
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    php -r "if (hash_file('SHA384', 'composer-setup.php') === '669656bab3166a7aff8a7506b8cb2d1c292f042046c5a994c43155c0be6190fa0355160742ab2e1c88d40d5be660b410') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
    php composer-setup.php
    php -r "unlink('composer-setup.php');"
    ```
7.  Run `php composer.phar install`
8.  Run `npm install`
9.  Run `cp .env.example .env`
10. Run `php artisan key:generate`
11. Edit `.env` file by edit these lines as following: 
    ```
    DB_DATABASE={THE_DATABASE_NAME} //The name of the database you created at Step 3
    DB_USERNAME={YOUR_USERNAME}
    DB_PASSWORD={YOUR_PASSWORD}
    ```
12. Run `php artisan migrate`

## Running Application
1.  Run `npm start` then you can access the web by browsing to `http://localhost:8888`