var imagePaginate = {};

(function(){

  this.el = null;
  this.images = [];
  this.wrapper = null;
  this.imageWidth = Number.MAX_SAFE_INTEGER;
  this.scaledImageWidth = Number.MAX_SAFE_INTEGER;;
  this.position = 0;
  this.timeout = 3000;
  this.animationTime = 700; // This should match CSS animation time
  this.numberOfImages = 0;
  this.timeOutAnimate = null;
  this.imagesToLoad = 0;
  var _this = this;

  this.init = function(elementId, pause, cssAnimationTime){
    this.timeout = pause;
    this.animationTime = cssAnimationTime;

    window.onload = function(){
      _this.el = document.getElementById(elementId);

      if(!_this.el){
        console.error("Missing element with ID: " + elementId);
      } else {
        _this.el.classList.add('image-paginate');
        _this.loadImages();
      }
    }
  }

  this.loadImages = function(){

    var images = this.el.getElementsByTagName('img');
    this.numberOfImages = images.length;

    for(var i = 0; i < images.length; i++){
      var img = images[i];
      var image = new Image(parseInt(img.getAttribute('width')), parseInt(img.getAttribute('height')));
      this.imagesToLoad++;

      image.onload = function(){
        _this.imagesToLoad--;
        if(_this.imagesToLoad == 0){
          _this.paginate();
        }
      }

      image.onerror = function() {
        console.error("Error loading image: " + this.src);
      }

      image.src = img.getAttribute('src');
      this.images.push(image);
      this.imageWidth = Math.min(this.imageWidth, img.getAttribute('width')); // set image width by the smallest image
    }
  }

  this.paginate = function(){

    // Shuffle images
    this.images = this.shuffle(this.images);

    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }

    var c = document.createDocumentFragment();
    for(var i = 0; i < this.images.length; i++){
      c.appendChild(this.images[i]);
    }

    // Clone the images to have them ready for possible resize of window
    var maxImagesOnScreen = Math.ceil(screen.width / this.imageWidth);
    var neededImages = maxImagesOnScreen * 2;

    for(var j = 0; j < Math.ceil(neededImages / this.images.length); j++){
      for(var i = 0; i < this.images.length; i++){
        var clone = this.images[i].cloneNode(true);
        c.appendChild(clone);
      }
    }

    this.wrapper = document.createElement("div");
    this.wrapper.classList.add('wrapper');
    this.wrapper.appendChild(c);
    this.el.appendChild(this.wrapper);

    this.wrapper.classList.add('transition');
    this.layout();

    // Make the wrapper visible
    this.wrapper.style.visibility = 'visible';
  }

  this.layout = function(){
    var elWidth = this.el.offsetWidth;

    var imagePerScreen = Math.ceil(elWidth / this.imageWidth);
    var scale = elWidth / (imagePerScreen * this.imageWidth);

    this.scaledImageWidth = this.imageWidth * scale;
    var newHeight = 0;

    var domImages = this.wrapper.getElementsByTagName('img');
    for(i = 0; i < domImages.length; i++){
      domImages[i].style.width = this.scaledImageWidth + 'px';
      var height = Math.round(domImages[i].getAttribute('height') * scale);
      domImages[i].style.height = height + 'px';
      newHeight = Math.max(newHeight, height);
    }

    this.wrapper.style.width = this.scaledImageWidth * domImages.length + 'px';
    this.wrapper.style.height = newHeight + 'px';
    this.el.style.height = newHeight + 'px'; // Update parent

    var newPosition = Math.floor(this.position / this.scaledImageWidth) * this.scaledImageWidth;

    this.position = newPosition;
    this.wrapper.style.transform = 'translateX(' + this.position + 'px)';

    // Clear animate timeout if exists
    if(this.timeOutAnimate){
      clearTimeout(this.timeOutAnimate);
    }

    this.animate();
  }

  this.animate = function(){
    
    this.timeOutAnimate = setTimeout(function(){ 
      var newPosition = _this.position - _this.el.offsetWidth;
      _this.wrapper.style.transform = 'translateX(' + newPosition + 'px)';
      _this.position = newPosition;
      var __this = _this;
      setTimeout(function(){
        __this.checkPosition();
      }, _this.animationTime + 100);
     }, this.timeout);
  }

  this.checkPosition = function(){

    if( this.position <= (this.numberOfImages * this.scaledImageWidth) * -1 ){

      var a = this.position + (this.numberOfImages * this.scaledImageWidth);

      var newPosition = a;
      this.position = newPosition;
      this.wrapper.classList.remove('transition');
      this.wrapper.style.transform = 'translateX(' + this.position + 'px)';

      setTimeout(function(){
        _this.wrapper.classList.add('transition');
      }, 200);
    }

    this.animate();
  }

  window.onresize = function(){
    _this.onResize();
  }

  this.onResize = function(){
    clearTimeout(this.timeOutAnimate);
    this.layout();
  }

  this.shuffle = function (a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

}).apply(imagePaginate);