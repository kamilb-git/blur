const video = document.getElementById('video');


Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(startVideo)

async function startVideo() {
    
    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.55);   

    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    
    const ctx = canvas.getContext("2d");

    document.body.onkeypress = function(e){
      if(e.which == 32){  
        e.preventDefault(); 
        play_pause_video();
     }
    } 

    video.addEventListener('playing', () => {
    
        
        
        setInterval(async () => {
            
          //const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
            const resizedDetections = faceapi.resizeResults(detections, displaySize);

            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            //faceapi.draw.drawDetections(canvas, resizedDetections);
            //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

            const results = resizedDetections.map((d) => {
              return faceMatcher.findBestMatch(d.descriptor)
          })
          results.forEach( (result, i) => {
              const box = resizedDetections[i].detection.box
              
              if(result.label == 'zib')
              {
                try{
                  var x = box.x;
                  var y = box.y;
    
                  var w = box.width;
                  var h = box.height;

                  ctx.fillStyle = '#000000';
                  ctx.filter = 'blur(13px)';
                  ctx.fillRect(x - 20, y - 40 , w + 40, h + 50);
                }
                catch(e){
                  return; 
                }
              }
              
          })
    
          }, 100)

          document.body.onkeydown = function(e){
            if (e.keyCode == '37') {
              e.preventDefault();
              video.currentTime -= 2; 
            }
            else if (e.keyCode == '39') {
              e.preventDefault();
              video.currentTime += 2; 
            }
          }
       
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

 
 function loadLabeledImages() {
    
  const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark', 'zib'];
  
  return Promise.all(
    
      labels.map(async label => {
      
      const descriptions = [];
      
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/kamilb-git/blur/master/labeled_images/${label}/${i}.jpg`);
        
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  )
} 
  
  

//-----------------------------------------------------------------------------------



  /*const video = document.getElementById('video');


  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
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
          
          setInterval(async () => {
              const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
              //const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
              
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              
              //faceapi.draw.drawDetections(canvas, resizedDetections);
              //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
              
              try{
                var x = box.x;
                var y = box.y;
  
                var w = box.width;
                var h = box.height;
              }
              catch(e){
                return; 
              }
  
              ctx.fillStyle = '#000000';
              ctx.filter = 'blur(15px)';   
              ctx.fillRect(x - 20, y - 40 , w + 40, h + 40);
              
              //console.log(box.x );
      
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
 */


