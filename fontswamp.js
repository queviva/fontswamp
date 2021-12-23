////////////////////////////////////////////////////////////
// pizzaface - MCMLXXXVIII                                //
//                                                        //
// single line code that swaps out fonts in a page with   //
// any font name or url                                   //
///////////////////////////////////////////////////////////{
//
// include this script in a tag for default behavior
// <script src="fontswamp.js"></script>
//
// overwrite any defaults by including the ones to change
// in a _well-formated_  json string in a data-parameter
// of the script tag; this example shows the defaults
//
// <script src="fontswamp.js"
//  data-font='{
//      "selector"  : "font",
//      "querylist" : "[data-swamp]",
//      "prompt"    : "enter a font name or url",
//      "event"     : "dblclick",
//      "usectrl"   : "false"
//  }'
// ></script>
//
// also include a style tag with an @font-face rule
// and the data-selector parameter, which by default
// is _data-font_
//
// <style data-font>
// @font-face {
//     font-family : swampFontName;
//     src : local('arial black'):
// }
// </style>
//
// by default, double-clicking on any element with a
// data-swamp parameter in its tag will prompt the user
// to enter a font name or url; any element or class
// that uses the font-family specified in the style tag
// will get changed
//
// the query list in the script tag is the default used
// for all _style_ tags; to change the values for an
// individual style tag, set the data-selector to some
// actual value; the example tag above can be altered
// such that ctrl-clicks on any element with the .swamp
// class name prompts the user with a custome message
//
// <style data-font='{
//     "event" : "click",
//     "usectrl" : true,
//     "querylist" : ".swamp",
//     "prompt" : "Geben Sie einen Schriftartnamen"
// '}>
// @font-face {
//     font-family : swampFontName;
//     src : local('arial black'):
// }
// </style>
//
// include as many style tags with individual @font-face
// rules as necessary, customizing each one
//
/////////////////////////////////////////////////////////}

// create an anonymouse function that ...
((
    // passes in a dataset composed of ...
    dset = Object.assign({},
        
        // the default values for ...
        {
            // the data-selector for the style tags, and ...
            selector: 'font',
            
            // the query list for triggering elements, and ...
            querylist: '[data-swamp]',
            
            // the message displayed in the prompt, and...
            prompt: 'enter a font name or url',
            
            // the event that triggers the prompt, and ...
            event: 'dblclick',
            
            // the option to require the control key ...
            usectrl: false
            
        }
        
        
        // overwritten by ...
        ,
        
        // the jason-parsed values of ...
        JSON.parse(Object.values(
            
            // any data-param in the script tag that was ...
            document.currentScript.dataset
            
        // the first data-parameter ...
        )[0]
        
        || // or else ...
        
        // just an empty object ...
        '{}')
        
    ) // then ...


// when the content is ready ...
) =>  document.addEventListener('DOMContentLoaded', e =>


    // asks the document ...
    document

        // to select all style tags with a data-selector param ...
        .querySelectorAll(
            `style[data-${ dset.selector }]`
        )

        // and loops through each of those tags ...
        .forEach((
            // passing in the element itself ...
            obj,
            
            // the index value ...
            i,
            
            // the nodelist being looped ...
            nodelist,
            
            // and preferences composed of ...
            prefs = Object.assign({},

                // the default preferences from the script dataset ...
                dset

                // overwritten by ...
                ,

                // the jason-parsed values of ...
                JSON.parse(Object.values(

                        // any data-param in the tag that was ...
                        obj.dataset

                        // the first data-parameter ...
                    )[0]

                    || // or else ...

                    // just an empty object ...
                    '{}')

                // then ...
            )

        ) =>

            // selects all the elements that are ...
            document.querySelectorAll(

                // designated in the query list, then ...
                prefs.querylist

                // loops through all of those items, and ...
            ).forEach(q => {
                
                // adds a listener ...
                q.addEventListener(

                    // for the specified event ...
                    prefs.event,

                    // handling it with an anonymouse function ...
                    e =>

                    // that ...
                    (
                        // if control key is needed ...
                        prefs.usectrl === true ?

                        // checks the ctrl-pressed ...
                        e.ctrlKey

                        // otherwise ...
                        :

                        // reverse-falses the ctrl-pressed ...
                        !e.ctrlKey

                    // to return a function that ...
                    ) &&

                    // does NOT try [so errors get thrown] to ...
                    //try{

                    // insert a rule, in to the sheet, that is ...
                    obj.sheet.insertRule(

                        // a css font-face @rule, with ...
                        '@font-face {' +

                        // the family name set to, ...
                        'font-family:' +

                        // the given name [throws if invalid] and ...
                        (obj.sheet.cssRules[0].style.fontFamily) + ';' +

                        // a source set to ...
                        'src:' +

                        // a 'local' uri that ...
                        ('local(' +

                            // asks the user for a font, using ...
                            prompt(

                                // the specified prompt, or ...
                                prefs.prompt

                            // ending the uri, then ...
                            )

                        // closing the src value, but ...
                        +');')

                        // replacing the protocol ...
                        .replace(

                            // if 'http' appears ...
                            /.*(\(https?:\/\/)/i,

                            /* explaination of the regex
        
        
                                        /.*(\(http)/
        
                             /   => begins regex boundary
                             .   => matches any character at all
                             *   => matches any number of them
                             (   => starts capturing the match in var '$1'
                             \   => interprets the next char literally
                             (   => matches the actual parenthesis character
                             h   => matches the letter 'h'
                             t   => matches the letter 't'
                             t   => matches the letter 't' again
                             p   => matches the letter 'p'
                             s   => matches 's' but only ...
                             ?   => zero or one of the previous 's'
                             :   => literally matches a colon
                             \   => interprets the next char literally
                             /   => literally the slansh character
                             \   => interprets the next char literally
                             /   => literally the slansh character again
                             )   => stops capturing in the var '$1'
                             /   => ends the regex boundary
                             i   => ignores upper/lower case in matching
                             
        
                            */


                            // with 'url' instead of 'local' ...
                            'url' +

                            // then re-appends the match ...
                            '$1'

                            // and closes the replace ...
                        )

                        // closes the css selector ...
                        +
                        '}',

                        // appends it to the sheet ...
                        obj.sheet.cssRules.length)

                    // do NOT swallow errors, but ...
                    //}catch(T){}

                    // closes the passive listener ...
                    , { passive: true }
                )

            // closes the querylist loop ...
            })

        // closes the fontswamp objects loop ...
        )

// closes the window onload function, and finally ...
)
    
// calls itself with a semicolon, to prove it is only one line ... period!
)();