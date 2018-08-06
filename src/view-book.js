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

class viewBook extends PolymerElement {
   
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }
      </style>

      <iron-ajax
         auto
         id="ajax"
         url$="https://bibliotech.education{{route.path}}/index.json"
         handle-as="json"
         on-response="_handleResponse"
        >
      </iron-ajax>
      <div class="card">
        <h1 id="content">Contents</h1>
        <ul>
            <template is="dom-repeat" items="[[contents]]"> 
               <li>
                  {{item.title}}
               </li>
            </template>
         </ul>
      </div>
    `;
  }

  /**
   * getProperties
   */
   static get properties() {
      return {
         contents: {
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
      const res = request.response.toc;
      this.contents = res;
   }
}


window.customElements.define('view-book', viewBook);