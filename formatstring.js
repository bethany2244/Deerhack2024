export function FormatString(string) {
    var stringArray = string.split(' ');
    var result = '';
    for (var word of stringArray) {
        result = result.concat(word.charAt(0).toUpperCase());
        result = result.concat(word.toLowerCase().slice(1));
        result = result.concat(' ');
    }
    return result;
}