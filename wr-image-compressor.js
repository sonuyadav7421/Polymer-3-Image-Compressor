import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './image_compress.js'

/**
 * `wr-image-compressor`
 * Compress image Component
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class WrImageCompressor extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>      
    `;
  }
  static get properties() {
    return {
      srcImage: {
        type: String,
        notify: true,
      },
      inputFile:{
        type:Object,
        notify:true,
        observer:"_compressImage"
      }
    };
  }

  async _compressImage(blob) {
    const size = 50 //image size 50 => 50kb;
    const accuracy = '';
    const type = 'image/jpeg'
    const width = 800;
    const height = 800;
    const scale = ''; //the zoom ratio relative to the original image, range 0-10;
    const orientation = 1; //image rotation direction

    const compress_file = await imageConversion.compressAccurately(blob, {
      size,
      accuracy,
      type,
      width,
      height,
      scale,
      orientation
    });

    var reader = new FileReader();
    reader.readAsDataURL(compress_file);
    reader.onloadend = () => {
      this.set("srcImage",reader.result)
    }
  }
}

window.customElements.define('wr-image-compressor', WrImageCompressor);
