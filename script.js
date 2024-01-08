window.onload = function () {
    var canvas = document.getElementById("imageCanvas");
    var ctx = canvas.getContext("2d");
    var imageLoader = document.getElementById("imageLoader");
    var originalImage = null;
  
    imageLoader.addEventListener("change", handleImage, false);
  
    function handleImage(e) {
      var reader = new FileReader();
      reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          originalImage = img;
          applyFilters(); // Apply filters on image load
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  
    var brightnessControl = document.getElementById("brightness");
    var contrastControl = document.getElementById("contrast");
    var opacityControl = document.getElementById("opacity");
    var negativeButton = document.getElementById("negativeFilter");
    var thresholdButton = document.getElementById("thresholdFilter");
    var grayscaleButton = document.getElementById("grayscaleFilter");
    var blackWhiteButton = document.getElementById("blackWhiteFilter");
    var blurButton = document.getElementById("blurFilter");
  
    brightnessControl.addEventListener("input", applyFilters);
    contrastControl.addEventListener("input", applyFilters);
    opacityControl.addEventListener("input", applyFilters);
    thresholdButton.addEventListener("click", applyThreshold);
    negativeButton.addEventListener("click", applyNegative);
    grayscaleButton.addEventListener("click", applyGrayscale);
    blackWhiteButton.addEventListener("click", applyBlackAndWhite);
    blurButton.addEventListener("click", applyBlur);
  
    function applyFilters() {
      if (originalImage) {
        var brightnessValue = brightnessControl.value;
        var contrastValue = contrastControl.value;
        var opacityValue = opacityControl.value;
  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        ctx.globalAlpha = opacityValue / 100;
  
        ctx.filter = `brightness(${100 + parseInt(brightnessValue)}%) contrast(${100 + parseInt(contrastValue)}%)`;
        ctx.drawImage(originalImage, 0, 0);
      }
    }
  
    function applyThreshold() {
      // Implement threshold filter if needed
    }
  
    function applyNegative() {
      // Implement negative filter if needed
    }
  
    function applyGrayscale() {
      if (originalImage) {
        ctx.drawImage(originalImage, 0, 0);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
  
        for (var i = 0; i < data.length; i += 4) {
          var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
  
        ctx.putImageData(imageData, 0, 0);
      }
    }
  
    function applyBlackAndWhite() {
      if (originalImage) {
        ctx.drawImage(originalImage, 0, 0);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
  
        for (var i = 0; i < data.length; i += 4) {
          var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          var color = avg > 127 ? 255 : 0;
          data[i] = color;
          data[i + 1] = color;
          data[i + 2] = color;
        }
  
        ctx.putImageData(imageData, 0, 0);
      }
    }
  
    function applyBlur() {
      if (originalImage) {
        ctx.drawImage(originalImage, 0, 0);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
  
        for (var i = 0; i < data.length; i += 4) {
          var avg =
            (data[i] +
              data[i + 1] +
              data[i + 2] +
              data[i + 4] +
              data[i + 5] +
              data[i + 6] +
              data[i + 8] +
              data[i + 9] +
              data[i + 10]) /
            9;
  
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
  
        ctx.putImageData(imageData, 0, 0);
      }
    }
  };
  