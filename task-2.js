/* Задача 2:
Пока что задание с плохим описанием, позже опишу детальнее, зато вы уже можете начинать
 думать :wink:
Есть некая строка содержащая джаваскрипт код (хотя можете использовать любое содержимое).
Мне нужна возможность проверить все ли скобки и кавычки закрыты правильно.
Ну и на всякий случай вот список скобок и кавычек: (, ), [, ], {, }, ', ', ", ",
ну и не забудьте обратные кавычки. (edited)

буде класно, якщо в результаті помилки буде сказано, чого саме не вистачає

*/
function validateBracket(code) {
    var open = [];
    for (let i = 0; i < code.length; i++) {
        if (code[i] === '{' || code[i] === '[' || code[i] === '('
            || code[i] === '"' && open.indexOf('"') == -1 || code[i] === "'" && open.indexOf("'") == -1) {
            open.push(code[i]); continue;
        }

        if (code[i] === ']' && open[open.length - 1] !== '[') {
            console.error('Неправильно закрытая "[" в позиции ' + i);
            break;
        } else if (code[i] === '}' && open[open.length - 1] !== '{') {
            console.error('Неправильно закрытая "{" в позиции ' + i);
            break;
        } else if (code[i] === ')' && open[open.length - 1] !== '(') {
            console.error('Неправильно закрытая "(" в позиции ' + i);
            break;
        } else if (code[i] === '"' && open[open.length - 1] !== '"') {
            console.error('Неправильно закрытая " в позиции ' + i);
            break;
        } else if (code[i] === "'" && open[open.length - 1] !== "'") {
            console.error('Неправильно закрытая \' в позиции ' + i);
            break;
        } else if (code[i] === ']' || code[i] === '}' || code[i] === ')'
            || code[i] === '"' || code[i] === "'") {
            open.splice(-1, 1);
        }
    }

    if (open.length !== 0 ) {
        console.error('тут просто ***, ошыбка!')
    } else {
        console.log('тут просто АГОНЬ!')
    }

    return code;
}
