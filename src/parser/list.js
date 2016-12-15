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

    const isNestingList = /^(?:(?:<ol>|<ul>)?<li>)(.*?)(?:<\/li>(?:<\/ol>|<\/ul>)?)$/;      // TODO: fixed this
    const isListItem = new RegExp( `(?:^(?:\\t|(?:\\u0020){4}){${ indent }})(?:(?:\\*|\\+|\\-|\\d\\.)(?:\\u0020)+)(.*?)$`, "mi" );
    const hasNestingList = new RegExp( `(?:^(?:\\t|(?:\\u0020){4}){${ indent + 1 }})(?:(\\*|\\+|\\-|\\d\\.)(?:\\u0020)+)(.*?)$`, "mi" );
    const isUnorderedList = new RegExp( `(?:^(?:\\t|(?:\\u0020){4}){${ indent }})(([\\*|\\+|\\-])(\\u0020)+)(.*?)$`, "i" );
    const isOrderedList = new RegExp( `(?:^(?:\\t|(?:\\u0020){4}){${ indent }})((^[\\d]\\.)(\\u0020)+)(.*?)$`, "i" );

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
        itemStr: "",
        unClosedListItem: false,
        startTag: "",
        endTag: ""
    }
    console.log( arr );
    // let isFirstListItem = true;
    // let type = undefined;
    // let itemStr = "";
    // let unClosedListItem = false;
    arr.map( ( item, index, arr ) => {
        let lastItem = arr[index - 1];
        let nextItem = arr[index + 1];
        if ( isListItem.test( item ) ) {

            // if this is a list item,
            // it should be encased by <li> tag
            let li = item.replace( isListItem, ( $0, $1, index, str ) => {
                return "<li>" + $1;
            });

            // if this is the first item of new list,
            // add list start tag
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
            }

            // append the close </li> tag
            if ( isNestingList.test( nextItem ) ) {
                status.unClosedListItem = true;
            } else {
                li += "</li>";
            }
            status.itemStr += li;
            console.log( li );

            // whether we should append the list close tag </ol> / </ul>
            if ( status.type.test( nextItem ) ) {
                // TODO:
            } else {
                // console.log( status.itemStr );
                status.itemStr = status.itemStr + status.endTag;
                // console.log( status.itemStr );

                // status.unClosedListItem = false;    // the list is closed
            }
            // status.itemStr += li;
            status.isFirstListItem = false;

        // if this is nesting list && the last item is unclosed
        } else if ( isNestingList.test( item ) && status.unClosedListItem ) {
            status.itemStr += item;
            // whether wo shoulo append the item close tag </li>
            if ( isNestingList.test( nextItem ) ) {
                // TODO:
            } else {
                // if next item is not another nesting list
                // close the last list item
                status.itemStr += "</li>"
            }
            // whether we should append the list close tag </ol> / </ul>
            if ( status.type.test( nextItem ) ) {
                // TODO:
            } else {
                status.itemStr = status.itemStr + status.endTag;
                status.unClosedListItem = false;    // the list is closed
            }
            status.isFirstListItem = false;

        // reset status object && push itemStr
        } else {
            if ( status.itemStr ) {
                newArr.push( status.itemStr );
            }

            // reset status
            status.isFirstListItem = true;
            status.type = undefined;
            status.itemStr = "";
            status.unClosedListItem = false;
            status.startTag = "";
            status.endTag = "";
            newArr.push( item );
        }
    });


    // // nesting list
    // let newArr = arr.map( ( item, index, arr ) => {
    //     let lastIsOListitem = false;
    //     let lastIsUListitem = false;
    //     let last = arr[index - 1];
    //     let next = arr[index + 1];
    //     if ( last ) {
    //         if ( isUnorderedList.test( last ) ) lastIsUListitem = true;
    //         if ( isOrderedList.test( last ) ) lastIsOListitem = true;
    //     }
    //     if ( isnestingList.test( item ) ) {
    //         if ( isnestingListStart && ( lastIsOListitem || lastIsUListitem ) ) {
    //             item = "<li>" + item;
    //             isnestingListStart = false;
    //         }
    //         if ( next === undefined || !isnestingList.test( next ) ) {
    //             item = item + "</li>";
    //             isnestingListStart = true;
    //         }
    //         console.log( "nest==========>,next:%s,isnestingList:%s",next,isnestingList.test( next ) );
    //
    //     }
    //     return item;
    // });
    // console.log( newArr )
    //
    //
    //
    //
    //
    // newArr = newArr.map( ( item, index, arr ) => {
    //     let last = arr[index - 1];
    //     let next = arr[index + 1];
    //     if ( isUnorderedList.test( item ) || isnestingList.test( item ) ) {
    //         item = item.replace( isUnorderedList, ( $0, $1, $2, $3, $4, index, str ) => {
    //             return "<li>" + $4 + "</li>";
    //         });
    //         if ( isFirstListItem ) {
    //             item = ulStart + item;
    //         }
    //         if ( index === ( length - 1 ) || ( !isUnorderedList.test( next ) && !isnestingList.test( next ) ) ) {
    //             item = item + ulEnd;
    //         }
    //         isFirstListItem = false;
    //     } else {
    //         isFirstListItem = true;
    //     }
    //     return item;
    // });
    //
    // // ordered list
    // isFirstListItem = false;
    // newArr = newArr.map( ( item, index, arr ) => {
    //     let last = arr[index - 1];
    //     let next = arr[index + 1];
    //     if ( isOrderedList.test( item ) ) {
    //         item = item.replace( isOrderedList, ( $0, $1, $2, $3, $4, index, str ) => {
    //             return "<li>" + $4 + "</li>";
    //         });
    //         if ( !isFirstListItem ) {
    //             item = olStart + item;
    //         }
    //         if ( !arr[index + 1] || ( !isOrderedList.test( next ) && !isnestingList.test( next ) ) ) {
    //             item = item + olEnd;
    //         }
    //         isFirstListItem = false;
    //     } else {
    //         if ( isnestingList.test( item ) ) {
    //
    //         }
    //         isFirstListItem = true;
    //     }
    //
    //     return item;
    // });
    //
    // console.log( newArr )

    return newArr;
}


// isUnorderedList = (^(\t|(\u0020){4})*)((?:[\*|\+|\-])(?:\u0020)+)(.*?)$
//
//
//
// * asdfasdfasdfa是
// + asdfasdfasdfa2
// - asdfasdfasdfa1
//
// 1. 23123
// 2. 23123
//     * asdfasdfasdfa是
//     + asdfasdfasdfa2
// 		1. 23123
// 		3. 23123
//     - asdfasdfasdfa1
// 3. 23123
//
//
// (^(\t|(\u0020){4})*)((?:[\*\+\-])(?:\u0020)+)(.*?)$ // 匹配无序列表，
// 
