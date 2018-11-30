// on load, ask the document ...
document

    // to select all style tags with the class 'fontswamp'
    .querySelectorAll('style.fontswamp')
    
    // and loop through each of those tags, to ...
    .forEach(obj => 
    
    // select all the other objects that are ...
    document.querySelectorAll(
        
        // designated in 'fontswamp' data-querylists ...
        obj.dataset.querylist
        
        // or ...
        ||
        
        // that have the default 'swamper' class, then ...
        '.swamper'
        
    // loop through all of those items, and ...
    ).forEach(q => 
        
        // add a listener ...
        q.addEventListener(
            
            // for either the specified event ...
            obj.dataset.event
            
            // or ...
            ||
            
            // for, the default, double click, and ...
            'dblclick',
            
            // handle it with an anonymouse function ...
            e => 
            
                // that ...
                (
                    // if control key is needed ...
                    obj.dataset.usectrl == 'true' ?
                    
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
                                    
                                    // either the specified prompt, or ...
                                    obj.dataset.prompt ||
                                    
                                    // this default phrase ...
                                    'enter a font name or url'
                                    
                                // ending the uri, then ...
                                )
                            
                            // close the src value, but ...
                            +');')
                        
                            // replace the protocol ...
                            .replace(
                                
                                // if 'http' appears ...
                                /.*(\(http)/,
                                
/* explaination of the regex 


            /.*(\(http)/

 /   => begins regex boundary
 .   => matches any character
 *   => matches any number of them
 (   => starts capturing the match in var '$1'
 \   => interprets the next char literally
 (   => matches the actual parenthesis character 
 h   => matches the letter 'h'
 t   => matches the letter 't'
 t   => matches the letter 't' again
 p   => matches the letter 'p'
 )   => stops capturing in the var '$1'
 /   => ends the regex boundary

*/

                                
                                // with 'url' instead of 'local' ...
                                'url' +
                                
                                // then re-append the match ...
                                '$1'
                                
                            // and close the replace ...
                            )
                            
                    // close the css selector ...
                    + '}',
                
                // append it to the sheet ...
                obj.sheet.cssRules.length)
                
            // do NOT swallow errors, but ...
            //}catch(T){}
            
        // close the listener, without capturing ...
        //, false)
        )
        
    // close the querylist loop, and ...
    )

// close the fontswamp objects loop    
);