/**
* list
* @param  {[type]} content [description]
* @return {[type]}         [description]
*/
import config from "../ziz.config";

export default ( content ) => {
    let arr = content.split( /\n/ );
    let newArr = [];
    if ( !config.useNestingList ) {
        newArr = checkListItem( arr, 0, false );
    } else {
        newArr = checkListItem( arr, 0, true );
    }
    return newArr.join( "\n" );
};

function checkListItem ( arr, indent, nesting ) {
    // test "1. adfsdf".match(reg)
    // => ["1. adfsdf", "1.", "adfsdf"] ( string, type, content )
    const ulStart = "<ul>";
    const ulEnd = "</ul>";
    const olStart = "<ol>";
    const olEnd = "</ol>";

    const isListItem = new RegExp( `(?:^(?:\\t|(?:\\u0020){4}){${ indent }})(?:(?:\\*|\\+|\\-|\\d\\.)(?:\\u0020)+)(.*?)$`, "mi" );
    const hasNestingList = new RegExp( `(?:^(?:\\t|(?:\\u0020){4}){${ indent + 1 }})(?:(\\*|\\+|\\-|\\d\\.)(?:\\u0020)+)(.*?)$`, "mi" );
    const isUnorderedList = new RegExp( `(?:^(?:\\t|(?:\\u0020){4}){${ indent }})(([\\*|\\+|\\-])(\\u0020)+)(.*?)$`, "mi" );
    // const isOrderedList = new RegExp( `(?:^(?:\\t|(?:\\u0020){4}){${ indent }})((^[\\d]\\.)(\\u0020)+)(.*?)$`, "i" );
    const isOrderedList = new RegExp( `(?:^(?:\\t|(?:\\u0020){4}){${ indent }})(([\\d]\\.)(\\u0020)+)(.*?)$`, "mi" );

    // if there is an another list
    if ( hasNestingList.test( arr.join( "\n" ) ) && nesting ) {
        arr = checkListItem( arr, indent + 1, nesting );
    }

    // unordered list
    // let isnestingListStart = true;
    // let length = arr.length;



    // rebuild
    let newArr = [];
    let status = {
        isFirstListItem: true,
        type: undefined,
        itemStr: [],
        unClosedListItem: false,
        startTag: "",
        endTag: ""
    }
    console.log( arr );
    arr.map( ( item, index, arr ) => {
        let lastItem = arr[index - 1];
        let nextItem = arr[index + 1];
        // status.isFirstListItem = false;

        if ( isListItem.test( item ) ) {

            // if this is a list item,
            // it should be encased in the <li> tag
            let li = item.replace( isListItem, ( $0, $1, index, str ) => {
                return "<li>" + $1;
            });

            // if this is the first item of new list,
            // add list start tag
            // console.log( newArr );
            if ( status.isFirstListItem ) {
                if ( isOrderedList.test( item ) ) {
                    status.type = isOrderedList;
                    status.startTag = olStart;
                    status.endTag = olEnd;
                } else {
                    status.type = isUnorderedList;
                    status.startTag = ulStart;
                    status.endTag = ulEnd;
                }

                li = status.startTag + li;
                status.isFirstListItem = false;
            }

            // append the close </li> tag
            if ( isNestingList( nextItem ) ) {
                status.unClosedListItem = true;
            } else {
                li += "</li>";
            }
            // status.itemStr += li;
            status.itemStr.push( li );
            // console.log( li );

            // whether we should append the list close tag </ol> / </ul>
            if ( status.type.test( nextItem ) || isNestingList( nextItem ) ) {
                // TODO:
            } else {
                // console.log( status.itemStr );
                // status.itemStr = status.itemStr + status.endTag;
                status.itemStr.push( status.endTag );
                status.isFirstListItem = true;
            }

        // if this is nesting list && the last item is unclosed
        } else if ( isNestingList( item ) && status.unClosedListItem ) {
            // status.itemStr += item;
            status.itemStr.push( item );
            // whether wo shoulo append the item close tag </li>
            if ( isNestingList( nextItem ) ) {
                // TODO:
            } else {
                // if next item is not another nesting list
                // close the last list item
                // status.itemStr += "</li>";
                status.itemStr.push( "</li>" );
            }
            // whether we should append the list close tag </ol> / </ul>
            if ( status.type.test( nextItem ) || isNestingList( nextItem ) ) {
                // TODO:
            } else {
                // status.itemStr = status.itemStr + status.endTag;
                status.itemStr.push( status.endTag );
                status.isFirstListItem = true;
                status.unClosedListItem = false;    // the list is closed
            }
            // status.isFirstListItem = false;

        // reset status object && push itemStr
        } else {
            if ( status.itemStr.length ) {
                newArr.push( status.itemStr.join( "" ) );
            }

            // reset status
            status.isFirstListItem = true;
            status.type = undefined;
            status.itemStr = [];
            status.unClosedListItem = false;
            status.startTag = "";
            status.endTag = "";
            newArr.push( item );
        }
    });
    return newArr;
}

// whether string is nesting list
function isNestingList ( str ) {
    const isNestingList = /^(?:(?:<ol>|<ul>)?<li>)(.*?)(?:<\/li>(?:<\/ol>|<\/ul>)?)$/mi;      // TODO: fixed this
    return isNestingList.test( str );
}

function isPlainText ( str ) {
    const isPlainText = /^$/mi;
}
