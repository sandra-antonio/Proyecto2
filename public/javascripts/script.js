document.addEventListener(
  "DOMContentLoaded",
  () => {

    const MADRID = {
      lat: 40.4126135,
      lng: -3.7070219
    };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 5,
      center: MADRID
    });

    if (window.centers) {
      console.log(window.centers);
      window.centers.forEach(center => {
        new google.maps.Marker({
          position: {
            lat: center.coordinates[0],
            lng: center.coordinates[1]
          },
          map: map,
          title: `${center.name} - ${center.description}`
        });
      });
    }else if(window.center){
      console.log(window.center);
      new google.maps.Marker({
        position: {
          lat: window.center.coordinates[0],
          lng: window.center.coordinates[1]
        },
        map: map,
        title: `${window.center.name} - ${window.center.description}`
      });
    }

   // const geolocate = () => {
   //   return new Promise((resolve, reject) => {
   //     // Try to get a geolocation object from the web browser
   //     if (navigator.geolocation) {
   //       // Get current position
   //       // The permissions dialog will popup
   //       navigator.geolocation.getCurrentPosition(
   //         function(position) {
   //           // Create an object to match
   //           // google's Lat-Lng object format
   //           console.log(position);
   //           const myPosition = {
   //             lat: position.coords.latitude,
   //             lng: position.coords.longitude
   //           };
   //           console.log("myPosition: ", myPosition);
   //           resolve(myPosition);
   //         },
   //         () => reject("Error in the geolocation service.")
   //       ); // If something else goes wrong
   //     } else {
   //       reject("Browser does not support geolocation."); // Browser says: Nah! I do not support this.
   //     }
   //   });
   // };
//
   // geolocate().then(position => {
   //   // User granted permission
   //   const myMarker = new google.maps.Marker({
   //     position,
   //     map: map,
   //     title: "I'm here"
   //   });
   //   map.setCenter(position);
   // });
  },
  false
);
