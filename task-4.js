// переписать предыдущее задание "task-3" но уже в прототипном стиле
'use strict';

(function () {
    function HistoryChat() {}

    function User(name) {
        this.id = +new Date();
        this.name = name;
        this.defaultChat = null;
    }

    HistoryChat.prototype.allChats = [];

    HistoryChat.getAllChats = function () {
        return HistoryChat.allChats;
    };

    HistoryChat.prototype.Chat = function (name) {
        if (!name) {
            throw new Error('Укажите имя чата')
        }

        HistoryChat.allChats.push(this);

        this.name = name;
        this.users = [];
        this.messages = [];
        this.created = (new Date()).getTime();

        this.addUser = function (user) {
            this.users.push(user);
        };

        this.deleteUser = function (user) {
            const index = this.users.indexOf(user);
            if (index !== -1) {
                this.users.splice(index, 1);
            }
        };

        this.sendMessage = function (user, text) {
            if (!this.findUser(user)) {
                throw new Error('Для отправки сообщения необходимо указать отправителя');
            }

            const message = new Message(user, text);
            this.messages.push(message);
            return message;
        };

        this.printMessages = function () {
            let messages = [];
            if (arguments.length === 2) {
                messages = this.messages.slice(arguments[0], arguments[0] + arguments[1]);
            } else if (arguments.length === 1) {
                messages = this.messages.slice(0, arguments[0]);
            } else if (arguments.length === 0) {
                messages = this.messages.slice(0, 10);
            } else if (arguments.length > 2 ) {
                throw new Error('Неверный список аргументов. Метод принимает от 0 до 2 аргументов');
            }
            console.log('История сообщений:');
            messages.forEach(message => {
                console.log(this.formatMessage(message));
            });
        };

        this.readMessages = function (user, count = null) {
            const result = [];
            for (var i = this.messages.length - 1; i >= 0; i--) {
                if (this.messages[i].whoRead.indexOf(user) === -1) {
                    result.push(this.messages[i]);
                    this.messages[i].markRead(user);

                    if (count && result.length === count) {
                        break;
                    }
                }
            }
            return result;
        };

        this.findUser = function(user) {
            for (let i = 0; i < this.users.length; i++) {
                if (user.id === this.users[i].id) {
                    return this.users[i];
                }
            }
            return null;
        };

        this.formatMessage = function(message) {
            return '['+ message.user.name +'] {'+ Boolean(this.findUser(message.user)) +'} [' +
                this.formatDate(message.created) +']: ' + message.text;
        };

        this.formatDate = function(date) {
            return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds();
        }
    };

    function Message(user, text) {
        if(!user || !text) {
            throw new Error('Для создания сообщения необходимо передать пользователя и текст сообщения');
        }

        this.text = text;
        this.created = new Date();
        this.user = user;
        this.whoRead = [user];

        this.markRead = function (user) {
            this.whoRead.push(user);
        }
    }

    User.prototype.setDefaultChat = function (chat) {
        this.defaultChat = chat;
    };
    User.prototype.setDefaultChat = function (chat) {
        this.defaultChat = chat;
    };

    User.prototype.joinToChat = function (chat) {
        const chatToJoin = chat ? chat : this.defaultChat;
        if (!chatToJoin) {
            throw new Error('Не удается подключиться к чату: не передан чат, а также не установлен чат по умолчанию');
        }
        chatToJoin.addUser(this);
    };

    User.prototype.leaveChat = function (chat) {
        const chatToJoin = chat ? chat : this.defaultChat;
        if (!chatToJoin) {
            throw new Error('Не удается подключиться к чату: не передан чат, а также не установлен чат по умолчанию');
        }
        chatToJoin.deleteUser(this);
    };

    User.prototype.sendMessage = function() {
        const chat = arguments.length === 2 ? arguments[0] : this.defaultChat;
        const text = arguments.length === 2 ? arguments[1] : arguments[0];
        chat.sendMessage(this, text);
    };

    User.prototype.readMessages = function() {
        let chat;
        let count;
        if (arguments.length === 2) {
            chat = arguments[0];
            count = arguments[1];
        } else if (arguments.length === 1) {
            if (typeof arguments[0] === 'number') {
                chat = this.defaultChat;
                count = arguments[0];
            } else {
                chat = arguments[0];
                count = 10;
            }
        } else {
            throw new Error('Необходимо передать хотя бы один аргумент');
        }

        return chat.readMessages(this, count);
    };

    if (window.HistoryChat === undefined ) {
        window.HistoryChat = HistoryChat;
    } else {
        throw new Error('Такое имя функции: HistoryChat уже есть');
    }
    if (window.Message === undefined ) {
        window.Message = Message;
    } else {
        throw new Error('Такое имя функции: Message уже есть');
    }

    if (window.User === undefined ) {
        window.User = User;
    } else {
        throw new Error('Такое имя функции: User уже есть');
    }

    Object.defineProperty(window, HistoryChat.name, { configurable: false, writable: false});
    Object.defineProperty(window, Message.name, { configurable: false, writable: false});
    Object.defineProperty(window, User.name, { configurable: false, writable: false});
})();

// кидаем проверку !--------------------
var vasya = new User('vasya');
var petya = new User('petya');

var geekhub = new HistoryChat.Chat('geekhub');
var geekhubjs = new HistoryChat.Chat('geekhubjs');
geekhub.addUser(vasya);
petya.joinToChat(geekhub);

geekhub.sendMessage(vasya, 'vtext1');
geekhub.sendMessage(petya, 'ptext2');
geekhub.sendMessage(vasya, 'vtext3');
geekhub.sendMessage(petya, 'ptext4');
geekhub.sendMessage(petya, 'ptext5');
geekhub.sendMessage(petya, 'ptext6');
geekhub.sendMessage(petya, 'ptext7');
geekhub.sendMessage(vasya, 'vtext8');
geekhub.sendMessage(petya, 'ptext9');
geekhub.sendMessage(petya, 'ptext10');
geekhub.sendMessage(petya, 'ptext11');
geekhub.sendMessage(petya, 'ptext12');
geekhub.sendMessage(petya, 'ptext13');

geekhub.printMessages(5);
geekhub.printMessages();
geekhub.printMessages(5, 5);

console.log('Читаем 2 сообщения: ', geekhub.readMessages(vasya, 2));
console.log('Читаем 3 сообщения: ', geekhub.readMessages(vasya, 3));
console.log('Читаем остальные сообщения: ', geekhub.readMessages(vasya));


vasya.joinToChat(geekhubjs);
var anton = new User('anton');
anton.joinToChat(geekhubjs);
anton.joinToChat(geekhub);
geekhub.deleteUser(anton);
anton.leaveChat(geekhubjs);
petya.sendMessage(geekhub, 'sendsss3');


console.log('Читаем 3 сообщения: ', petya.readMessages(geekhub, 3));
