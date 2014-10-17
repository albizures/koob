/*
 * Vibrating Alerts
 *
 * For more information, visit the project's homepage (http://prashant.es/labs/vibrating-notices/)
 *
 * Copyright (c) 2010 Prashant Sugand (prashant.es)
 * Licensed under the MIT license. http://www.opensource.org/licenses/mit-license.php
 */

jQuery.fn.vibrate = function(axis, distance, repetition, duration) {
    
    var i = 0;
    var o = distance / distance;
    
    switch(axis) {
    	case 'x':
    		while(i < repetition) {
    			$(this).animate({right:'-'+distance+'px'}, duration);
    			$(this).animate({right:distance}, duration);
    			i++;
    			if(i == repetition) {
    				$(this).animate({right:o}, duration);
    			}
    		}
    		break;
    	
    	case 'y':
    		while(i < repetition) {
    			$(this).animate({marginTop:'-'+distance+'px'}, duration);
    			$(this).animate({marginTop:distance}, duration);
    			i++;
    		}
    		break;
    }
}