# Echo Server

## Запросы и ответы

### GET

#### Ответ без ошибки

    GET http://localhost:<port>/<path>

возвращает `<path>` в формате plain text. Параметры запроса в URL игнорируются. Полезно
для тестирования доступности сервера.

Примеры:

`GET http://localhost:9009/abc/def/xyz` возвращает `/abc/def/xyz`

`GET http://localhost:9009/foo?bar=1` возвращает `/foo`

#### Ответ с ошибкой

    GET http://localhost:<port>/error/<errno>

возвращает ошибку с кодом `<errno>`. Полезно для тестирования обработки ошибок.

## Node

### Подготовка

Перед первым запуском следует скачать требуемые модули node командой

    $ npm install

### Запуск

Команды

    $ node index.js
    
или

    $ npm start
    
запускают сервер в текущей операционной системе.

## Docker

### Постройка image

Команда

    $ docker build . -t echoserv

строит докеровский image с именем `echoserv`.

### Запуск контейнера

    $ docker run -d -p 9009:9201 --name echoserv1 echoserv

запускает image в первый раз, при этом создается контейнер с именем echoserv1. Сервер будет принимать запросы на порт 9009.

    $ docker start echoserv1
    
запускает контейнер `echoserv1`, который был создан предыдущей командой.
