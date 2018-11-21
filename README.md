# Image Paginate

This is a simple JS/CSS lib which will animate pagination of the images. The container is responsive and images inside will resize in order to fit the containers width in order to avoid having one image cut at the end.

## Demo

See [demo](https://damjancvetan.github.io/image-paginate/).

## Instructions

* Library will take all the "img" tags within the imagePaginate element regardless of the location.

* Make sure to have a proper width and height set on the images. This is taken as max widht/height when resizing images.

* Include ./lib/* to your code.

## Usage

```html
<div class="image-paginate" id="imagePaginate">
  <div class="loading"><div></div><div></div><div></div></div>
  <div class="wrapper">
   <img src="https://picsum.photos/220/100/?image=37" width="220" height="100" alt="" />
   <img src="https://picsum.photos/220/100/?image=38" width="220" height="100" alt="" />
   <img src="https://picsum.photos/220/100/?image=39" width="220" height="100" alt="" />
   <img src="https://picsum.photos/220/100/?image=30" width="220" height="100" alt="" />
 </div>
</div>
```

```javascript
// imagePaginate.init(elementId, pause, cssAnimationTime);
imagePaginate.init("imagePaginate", 4000, 700);
```

## License
Dual licensed under the MIT or GPL Version 2 licenses :
[http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)
[http://www.opensource.org/licenses/GPL-2.0](http://www.opensource.org/licenses/GPL-2.0)