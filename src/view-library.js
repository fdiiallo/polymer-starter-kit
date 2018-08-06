/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class library extends PolymerElement {
   static get template() {
      return html`
      <style include="shared-styles">

        :host {
         display: block;
         position: absolute;
         outline: none;
         -moz-user-select: none;
         -ms-user-select: none;
         -webkit-user-select: none;
         user-select: none;
         cursor: default;
         background-color: #f2f2f2;
        }
  
        li {
            display : inline-block;
          }

         .card:hover {
            box-shadow: 0 17px 50px 0 rgba(0, 0, 0, 0.19), 0 12px 15px 0 rgba(0, 0, 0, 0.24);
            position: relative;
            top: -10px;
        }
        .card {
            z-index: 1000;
            cursor: pointer;
            width: 180px;
            height: 303px;
            background: white;
            padding: 0;
            border-radius: 3px;
            overflow: hidden;
            margin : 15px;
       }
       .image-container {
         width: 180px;
         height: 235px;
         overflow: hidden;
      }
      iron-image {
         display: block;
         height: 240px;
         width: 104%;
         margin: 0 -2%;
         background-color: #f5f5f5;
      }
       .card-content {
         display: block;
         background: white;
         padding: 16px;
      }
      .card-content div {
         display: block;
         font-size: 12px;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis;
      }
      #title {
         font-weight: 700;
         color: #000;
      }
      #authors {
         font-size: 12px;
         opacity: 0.54;
     }
      </style>

      <div>

         <iron-ajax auto url="src/config/data.json" on-response="_handleResponse" handle-as="json"  id="dataLoader"></iron-ajax>

         <ul>
            <template is="dom-repeat" items="{{bookList}}"> 
               <li>
                  <div class="card" id="{{item.isbn}}" on-click="_changeView">
                     <div class="image-container" aria-hidden="false">
                        <iron-image src="{{item.img}}" alt = "book cover" sizing = "cover" id="{{item.isbn}}"></iron-image>
                     </div>
                     <div class="card-content" aria-hidden="false">
                        <div id="title">{{item.title}}
                           <paper-tooltip aria-hidden="true" role="tooltip" >{{item.title}}</paper-tooltip>
                        </div>
                        <div id="authors">{{item.contributors}}   
                           <paper-tooltip aria-hidden="true" role="tooltip" >{{item.contributors}}</paper-tooltip>
                        </div>
                     </div>
                     <slot class="card-content"></slot>
                  </div>
               </li>
            </template>
         </ul>

      </div>

    `;
   }

   static get properties() {
      return {
         bookList: {
            type: Array
         }
      };
   }

   /**
    * handle data load
    * @param {*} event 
    * @param {*} request 
    */
   _handleResponse(event, request) {
      const res = request.response;
      let result = res.data.bookList;
      result.map( (item) => {
         item.img = "https://d1re4mvb3lawey.cloudfront.net/" + item.isbn + "/cover.jpg"
      });
      this.bookList = result;
   }

   /**
    * Display the table of contents with the title
    * @param {} view 
    */
   _changeView(e) {
      this.set('route.path', 'books/' + e.target.id);
    }
   

}



window.customElements.define('view-library', library);
