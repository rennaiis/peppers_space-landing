#### Создание сервисного аккаунта:
Для работы с гугл-таблицами надо создать сервисный аккаунт и предоставить
ему доступ к таблице. [инструкция](https://docs.google.com/document/d/1rtwimIwH4i1FrPxarxImn5Y47pp6FNSE4LrM3_N8MhI/edit)


#### Формат ключей:
* `name` - примитивное значение {"name": "value"}
* `[name]` - массив {"name": []}
* `{name}foo` / `name.foo` - объект {"name": {"foo": ""}}
* `$name` - изображение. Файл по указанной ссылке скачается и будет сохранен в локальной папке. 
    В json передастся информация об изображении:  
    `{"name": {src: "", width: 1920, height: 1080}}` src - ссылка на локально сохраненный файл,
    width и height - размеры изображения

Если в строке есть непустая ячейка с примитивным значением, то создается новый элемент массива

#### Пример:

##### Таблица

| name | [pic]$src |  [pic]description | 
|------|---------|---|
|name1 | http://google.com/1 | 1 |
| | http://google.com/2 | 1 |
| | http://google.com/3 | 1 |
|name2 | http://google.com/4 | 1 |
| | http://google.com/5 | 1 |

##### Результат
```json
[
    {
        "name": "name1",
        "pic": [
            {
                "src": {
                    "src": "00001.jpg",
                    "width": 1920,
                    "height": 1080
                },
                "description": "1"
            },
            {
                "src": {
                    "src": "00002.jpg",
                    "width": 1920,
                    "height": 1080
                },
                "description": "1"
            },
            {
                "src": {
                    "src": "00003.jpg",
                    "width": 1920,
                    "height": 1080
                },
                "description": "1"
            }
        ]
    },
    {
        "name": "name2",
        "pic": [
            {
                "src": {
                    "src": "00004.jpg",
                    "width": 1920,
                    "height": 1080
                },
                "description": "1"
            },
            {
                "src": {
                    "src": "00005.jpg",
                    "width": 1920,
                    "height": 1080
                },
                "description": "1"
            }
        ]
    }
]
```
