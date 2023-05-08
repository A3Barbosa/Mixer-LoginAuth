let blending = document.getElementsByClassName("blend")
var trash = document.getElementsByClassName("fa-trash");

Array.from(blending).forEach(function(element) {
      element.addEventListener('click', function(){ 
        const one = this.parentNode.childNodes[1].innerText
        const two = this.parentNode.childNodes[3].value
        console.log('this is one '+ one)
        console.log('this is two ' + two)
        const colorOne = one.substring(1);// this here take's end's off it ,took # off 
        const colorTwo = two.substring(1);
        const theBlend = [parseInt(colorOne[0] + colorOne[1], 16), parseInt(colorOne[2] + colorOne[3], 16), parseInt(colorOne[4] + colorOne[5], 16)];
        const theBlend2 = [parseInt(colorTwo[0] + colorTwo[1], 16), parseInt(colorTwo[2] + colorTwo[3], 16), parseInt(colorTwo[4] + colorTwo[5], 16)];
        // lines 12-13, we are using pareseINT to turn any letter into number's by grabbing the index of the HEX 
        console.log(one)
        console.log(two)
        console.log(colorOne)
        console.log(colorTwo)
        console.log(theBlend)
        console.log(theBlend2)
        const mixBlend = [ 
          (1 - 0.5) * theBlend[0] + 0.3 * theBlend2[0], /// here we are using #s
          (1 - 0.5) * theBlend[1] + 0.4 * theBlend2[1], 
          (1 - 0.5) * theBlend[2] + 0.5 * theBlend2[2]
        ]

        // turn the array into a hex color (vic)
          function backToHex(number)
        {
            var one = Math.round(number).toString(16);
            if (one.length == 1)
                one = '0' + one;
            return one;
        }
        const Done = '#' + backToHex(mixBlend[0]) + backToHex(mixBlend[1]) + backToHex(mixBlend[2]); // this is to turn it back into hex 

        fetch('mixing', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'firstColor': one,
            'secondColor': two,
             'thirdColor': Done
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
