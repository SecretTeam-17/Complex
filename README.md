# Pet-Sitters игра
Геймифицированное обучение и тестирование кандидатов в кэт и дог ситтеры.

<h2 align="center">
<p align="center">

<img src="https://img.shields.io/badge/GO-1.22-79d4fd">
<img src="https://img.shields.io/badge/MongoDB-7.0-023430" >

<img src="https://img.shields.io/badge/React-18.2-61dafb">
<img src="https://img.shields.io/badge/Typescript-5.4-3178c6">
<img src="https://img.shields.io/badge/Phaser-3.80-e24c24">
<img src="https://img.shields.io/badge/Redux-9.1-764abc">

<img src="https://img.shields.io/badge/Docker-26.1-086dd7">
<img src="https://img.shields.io/badge/DockerCompose-2.27-086dd7">

</p>
</h2>

<p align="center">
<img src="preview.jpg" width="%"></p>

### О проекте:
1. Серверная часть написана на языке GO с использование базы данных MongoDB для хранения данных игровой сессии и результатов тестирования игрока.
2. Клиентская часть реализована на фреймворке React с использование библиотеки Phaser для создания 2D игры сразу для декстопной и собильной версии.
3. Все компоненты приложения развернуты в Docker контейнерах для удобства использования.

### Дополнительно:
1. Для удобства разработки были добавлены контейнеры:
    - Portainer - webUI для работы с Docker контенерами
    - Dozzle - мониторинг логов Docker контенеров
    - Mongo Express - webUI для работы с базой Mongo

### Установка:

1. Склонируйте репозиторий

```bash
git clone https://github.com/SecretTeam-17/Complex.git
```

2. Переименовать .env.example в .env
3. Поменять пути к корневой папке с проектом
4. Перейдите в папку с frontend частью (game) и установите зависимости

```bash
npm install
```

5. Запустите Docker compose файл 
```bash
docker compose up --build -d      
```

#### Адреса контейнеров:
0.0.0.0:8081 - frontend<br>
0.0.0.0:8082 - dozzle<br>
0.0.0.0:8083 - backend<br>
0.0.0.0:8083 - mongo express<br>
0.0.0.0:9000 - portainer<br>