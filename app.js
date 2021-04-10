const video = document.getElementById('video');


Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
    
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);

    const ctx = canvas.getContext("2d");

    document.body.onkeypress = function(e){
      if(e.which == 32){  
        e.preventDefault(); 
        play_pause_video();
     }
   } 

    video.addEventListener('playing', () => {
    
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);
        
        const interval = setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
            const resizedDetections = faceapi.resizeResults(detections, displaySize);

            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            //faceapi.draw.drawDetections(canvas, resizedDetections);
            //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            
            try{
              var x = detections[0].detection.box.x;
              var y = detections[0].detection.box.y;

              var w = detections[0].detection.box.width;
              var h = detections[0].detection.box.height;
              }
            catch(e){
              return; 
            }

            ctx.fillStyle = '#000000 '
            ctx.filter = 'blur(15px)';   
            ctx.fillRect(x - 10, y - 40 , w + 20, h + 40);
            
            //console.log(detections[0].detection.box.x );
    
          }, 100)
       
        })

}



function play_pause_video() {
  if (video.paused) 
  { 
    video.play(); 
  }
 else 
  { 
    video.pause(); 
  }
 }



 /* const imageU = document.getElementById('image');

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start);
  

async function start() {
    
    const container = document.createElement('div');
    container.style.position = 'relative';
    document.body.append(container);
    
    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    
    let image, canvas;

    imageU.addEventListener('change', async () => {
      
        if (image) image.remove();
        if (canvas) canvas.remove();
        
        image = await faceapi.bufferToImage(imageU.files[0]);
        container.append(image);
        
        canvas = faceapi.createCanvasFromMedia(image);
        container.append(canvas);
        
        const displaySize = { width: image.width, height: image.height };
        faceapi.matchDimensions(canvas, displaySize);
        
        const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        
        const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
        
        results.forEach((result, i) => {
            const box = resizedDetections[i].detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
        
            drawBox.draw(canvas);
      })
    })
  }
  

function loadLabeledImages() {
    
    const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark'];
    
    return Promise.all(
      
        labels.map(async label => {
        
        const descriptions = [];
        
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg`);
          
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
          descriptions.push(detections.descriptor);
        }
  
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    )
  }  */ 
  
  


//-----------------------------------------------------------------------------------



  /*   const imageU = document.getElementById('image')

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start);
  

async function start() {
    
    const container = document.createElement('div');
    container.style.position = 'relative';
    document.body.append(container);
    
    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    
    let image, canvas;

    imageU.addEventListener('change', async () => {
      
        if (image) image.remove();
        if (canvas) canvas.remove();
        
        image = await faceapi.bufferToImage(imageU.files[0]);
        container.append(image);
        
        canvas = faceapi.createCanvasFromMedia(image);
        container.append(canvas);
        
        const displaySize = { width: image.width, height: image.height };
        faceapi.matchDimensions(canvas, displaySize);
        
        const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        
        const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
        
        results.forEach((result, i) => {
            const box = resizedDetections[i].detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
        
            drawBox.draw(canvas);
      })
    })
  }
  

function loadLabeledImages() {
    
    const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark'];
    
    return Promise.all(
      
        labels.map(async label => {
        
        const descriptions = [];
        
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg`);
          
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
          descriptions.push(detections.descriptor);
        }
  
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    )
  } 
 */


