/**
 * @author Jerome Carter <jeromecarter0722@gmail.com>
 * @copyright Copyright (c) 2017, Jerome Carter
 */

import { Injectable } from "@angular/core";
import { Content } from "ionic-angular";

@Injectable()
export class FullScreen {

  /**
   * @var {boolean} m_Initialized Variable whose value is persistant throughout all instances of FullScreen. The main function is toprevent duplicate initializations of FullScreen class.
   */
  private static m_Initialized : boolean;

  /**
   * @var {any} Reference to document
   */
  private m_Document: any;

  /**
   * @var {Content} Reference to content component
   */
  private m_Content: Content;

  /**
   * @var {boolean} Is FullScreen mode activated or not
   */
  private m_IsFullScreen: boolean;

  /**
   * Each String[] in m_Elements should contain 3 Strings:
   *  Class name of HTML element to be hidden;
   *  CSS display attribute value to be set when FullScreen mode is activated;
   *  CSS display attribute value to be set when FullScreen mode is deactivated
   *
   * @var {String[][]} Array of String arrays denoting element class and visibility 
   */
  private m_Elements: String[][];

  /**
   * Initializes FullScreen class
   *
   * @param {any}        a_Document Reference to document
   * @param {Content}    a_Content  Reference to content component
   * @param {String[][]} a_Elements Array of String arrays denoting element classes and their visibility
   *
   * @return {void}
   */
  init(a_Document: any, a_Content: Content, a_Elements: String[][]) : void {
    if (!FullScreen.m_Initialized) {    /* Is this the only initialized instance of FullScreen */
      FullScreen.m_Initialized = true;  /* If so, make sure that no other instances can be initialized */
      this.m_IsFullScreen = false;      /* By default, FullScreen mode should be disabled */
      /* Store a_Document, a_Content, and a_Elements for later use */
      this.m_Document = a_Document;
      this.m_Content = a_Content;
      this.m_Elements = a_Elements;
    } else {
      console.error("Failed to initialize FullScreen (Fullscreen.init(document: any)): FullScreen has already been initialized elsewhere!");
    }
  }

  /**
   * @return {boolean} Is fullscreen mode activated
   */
  get() : boolean {
    if (FullScreen.m_Initialized) { /* Is this instance initialized */
      return this.m_IsFullScreen;   /* Return state of FullScreen mode; true = activated, false = deactivated */
    } else {
      console.error("Failed to get FullScreen state (FullScreen.getState()): Fullscreen must be initialized before you can get its state!");
    }
  }

  /**
   * Sets display attribute of elements to disabled state. This means that they're no longer visible.
   * Also sets state(m_IsFullScreen) to true because the elements are no longer visible
   *
   * @return {void}
   */
  activate() : void {
    if (FullScreen.m_Initialized) {                                                        /* Is this instance initialized */
      for (var i = 0; i < this.m_Elements.length; i++) {
        let selectedElement = this.m_Document.querySelector(this.m_Elements[i][0]);        /* Find element based on class */
        selectedElement.style.display = this.m_Elements[i][1];                             /* Set the element's (element[0]) CSS display attribute to value of disabled state (element[1]) */
      }
      this.m_IsFullScreen = true;
      this.m_Content.resize();                                                             /* Make sure that content pane completely fits within view */
    } else {
      console.error("Failed to activate FullScreen mode (FullScreen.activate()): Fullscreen must be initialized before you can activate it!");
    }
  }

  /**
   * Sets display attribute of elements to enabled state. This means that they're now visible.
   * Also sets state(m_IsFullScreen) to false because the elements are now visible
   *
   * @return {void}
   */
  deactivate() : void {
    if (FullScreen.m_Initialized) {                                                 /* Is this instance initialized */
      for (var i = 0; i < this.m_Elements.length; i++) {
        let selectedElement = this.m_Document.querySelector(this.m_Elements[i][0]); /* Find element based on class */
        selectedElement.style.display = this.m_Elements[i][2];                      /* Set the element's (element[0]) CSS display attribute to value of enabled state (element[2]) */
      }
      this.m_IsFullScreen = false;
      this.m_Content.resize();                                                      /* Make sure that the content area completely fits within view */
    } else {
      console.error("Failed to deactivate FullScreen mode (FullScreen.deactivate()): Fullscreen must be initialized before you can deactivate it!");
    }
  }

  /**
   * Activates ordeactivates FullScreen mode based on desired state
   *
   * @param {boolean} a_State Desired state of FullScreen mode
   *
   * @return {void}
   */
  set(a_State: boolean) : void {
    a_State ? this.activate() : this.deactivate();  /* If a_State is true, activate FullScreen mode; however, if it's false, deactivate Fullscreen mode */
  }

  /**
   * If FullScreen mode is activated, deactivate it.
   * If FullScreen mode is deactivated, activate it.
   *
   * @return {void}
   */
  toggle() : void {
    this.m_IsFullScreen ? this.deactivate() : this.activate();  /* If FullScreen mode is activated, deactivate it; however, if it's deactivated, activate it */
  }
}